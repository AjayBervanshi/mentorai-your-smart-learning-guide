

# MentorAI — Complete Fix Plan

## Summary

Fix all critical issues: auto-normalize skill names (e.g. "pyhon" → "Python", "devops" → "DevOps"), replace fake quiz/lesson content with AI-generated content, add roadmap navigation, fix profile creation, add password reset, add "Add Skill" button, fix streaks, and improve interview/project screens.

---

## 1. Skill Name Normalization

**Problem**: If user types "pyhon" or "devops", it gets stored exactly as typed.

**Fix**: Add a `normalizeSkillName()` function in `skillTemplates.ts` that:
- Fuzzy-matches input against `KNOWN_SKILL_CATEGORIES` (Levenshtein distance ≤ 2)
- Returns the properly formatted name (e.g. "pyhon" → "Python", "devops" → "DevOps", "reactjs" → "React")
- Falls back to title-casing if no match found but passes validation
- Tighten `isValidSkill()` to only accept inputs that match a known skill (exact or fuzzy)

**Apply in**: `Onboarding.tsx` `addSkill()` — normalize before storing. Also show the corrected name to the user (e.g. toast: "Added as Python").

---

## 2. AI-Powered Lessons & Quizzes (Edge Function)

**Problem**: Lessons show fake placeholder content. Quizzes are 3 identical generic questions for every topic.

**Fix**: Create an edge function `generate-content` that uses Lovable AI (`google/gemini-2.5-flash`) to generate:
- **Lesson content**: Real explanation, examples, key takeaways for the specific topic+skill
- **Quiz questions**: 5 skill-specific questions with correct answers, hints, and explanations

Cache results in a new `topic_content` table so content is generated only once per topic.

**Database migration**:
```sql
CREATE TABLE public.topic_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_title TEXT NOT NULL,
  skill_name TEXT NOT NULL,
  lesson_content JSONB,
  quiz_questions JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(topic_title, skill_name)
);
ALTER TABLE public.topic_content ENABLE ROW LEVEL SECURITY;
-- Allow all authenticated users to read (shared cache)
CREATE POLICY "Authenticated read" ON public.topic_content FOR SELECT TO authenticated USING (true);
CREATE POLICY "Service insert" ON public.topic_content FOR INSERT TO authenticated WITH CHECK (true);
```

**Edge function** (`supabase/functions/generate-content/index.ts`): Accepts `{skill, topic, subtopics}`, calls Lovable AI, returns lesson + quiz JSON, inserts into cache.

**LearningScreen.tsx**: On topic load, check `topic_content` cache first. If miss, call edge function. Show loading state while generating. Display real content.

---

## 3. Roadmap View in Learn Screen

**Problem**: Users are auto-loaded into the current topic with no way to browse or navigate the full path.

**Fix**: Change `LearningScreen.tsx` to show a **topic roadmap** by default — a scrollable list of all topics with status indicators (locked/current/completed/weak). User taps a topic to enter lesson mode. Completed topics show score. Weak topics are highlighted for review.

---

## 4. Fix Profile Auto-Creation

**Problem**: The trigger on `auth.users` was blocked by Supabase. New users may not get a `profiles` row.

**Fix**: In `Auth.tsx`, after successful signup, insert into `profiles` table directly in the success handler. Remove reliance on the blocked trigger.

---

## 5. Password Reset Flow

**Fix**: 
- Add "Forgot password?" link to `Auth.tsx`
- Create `src/pages/ResetPassword.tsx` for the password update form
- Add `/reset-password` route in `App.tsx`
- Use `supabase.auth.resetPasswordForEmail()` and `supabase.auth.updateUser()`

---

## 6. Add More Skills After Onboarding

**Fix**: Add an "Add Skill" button on the Dashboard. Opens a modal/sheet with the same skill input + validation from onboarding. Inserts new skill + topics into the database.

**Context change**: Add `addSkill(name, level)` method to `LearningContext.tsx`.

---

## 7. Fix Streak Tracking

**Fix**: Add `last_active_date DATE` column to `user_learning_profiles`. On each quiz completion:
- If `last_active_date` is yesterday → increment streak
- If `last_active_date` is today → no change
- Otherwise → reset streak to 1
- Update `last_active_date` to today

---

## 8. Skill-Specific Interview Questions

**Fix**: Replace the 4 hardcoded generic questions in `InterviewScreen.tsx` with AI-generated questions via the same `generate-content` edge function (add an `interview` content type). Cache per skill.

---

## 9. Skill-Aware Projects

**Fix**: In `ProjectsScreen.tsx`, replace generic project templates with skill-category-aware projects. For coding skills → coding projects. For design skills → design projects. For marketing → marketing projects. Use a mapping object in `skillTemplates.ts`.

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/data/skillTemplates.ts` | Add `normalizeSkillName()`, tighten `isValidSkill()`, add project mappings |
| `src/components/Onboarding.tsx` | Use `normalizeSkillName()` before adding skills |
| `src/components/LearningScreen.tsx` | Add roadmap view, integrate AI content loading |
| `src/components/InterviewScreen.tsx` | AI-generated skill-specific questions |
| `src/components/ProjectsScreen.tsx` | Skill-aware project suggestions |
| `src/components/Dashboard.tsx` | Add "Add Skill" button |
| `src/context/LearningContext.tsx` | Add `addSkill()`, streak logic |
| `src/pages/Auth.tsx` | Insert profile on signup, add forgot password link |
| `src/pages/ResetPassword.tsx` | Create — password reset page |
| `src/App.tsx` | Add `/reset-password` route |
| `supabase/functions/generate-content/index.ts` | Edge function for AI lesson/quiz/interview generation |
| Database migration | Add `topic_content` table, `last_active_date` column |

