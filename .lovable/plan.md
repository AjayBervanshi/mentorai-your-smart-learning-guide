

# MentorAI — Authentication, Persistence & Learning Flow Fix

## Overview

Three major improvements: (1) Add Google + email/password authentication, (2) persist all learning data to the database, (3) fix the learning flow so it validates skill inputs and follows a proper roadmap-first approach.

**Note on GitHub sync**: Lovable does not support syncing repos from GitHub into the app. That's a separate service outside this platform.

---

## 1. Authentication (Google + Email/Password)

### Database tables (migration)

```sql
-- Profiles table (auto-created on signup)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### UI changes
- Create `src/pages/Auth.tsx` — login/signup form with email+password and "Sign in with Google" button
- Use `lovable.auth.signInWithOAuth("google", ...)` for Google sign-in (Lovable Cloud managed)
- Use `supabase.auth.signInWithPassword()` / `supabase.auth.signUp()` for email auth
- Add route `/auth` in `App.tsx`
- Create `src/hooks/useAuth.ts` — wraps `supabase.auth.onAuthStateChange` + `getSession`, exposes `user`, `isReady`, `signOut`
- Gate `Index.tsx` behind auth — redirect to `/auth` if not logged in

---

## 2. Data Persistence

### Database tables (migration)

```sql
-- User learning data
CREATE TABLE public.user_learning_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  goal TEXT NOT NULL,
  daily_time INTEGER NOT NULL,
  streak INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  joined_date TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

CREATE TABLE public.user_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level TEXT NOT NULL,
  progress INTEGER DEFAULT 0,
  current_topic_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.user_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID NOT NULL REFERENCES public.user_skills(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  level TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  score INTEGER,
  sort_order INTEGER DEFAULT 0
);

-- RLS on all tables: user can only access own rows
ALTER TABLE public.user_learning_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_topics ENABLE ROW LEVEL SECURITY;

-- Policies for each table (SELECT, INSERT, UPDATE, DELETE) using auth.uid() = user_id
```

### Code changes
- Rewrite `LearningContext.tsx` to load/save from database instead of in-memory state
- On `completeOnboarding`: INSERT into `user_learning_profiles`, `user_skills`, `user_topics`
- On `updateSkillProgress`: UPDATE the relevant `user_topics` row + recalculate skill progress
- On app load: SELECT all user data and hydrate context
- Use React Query for data fetching with `enabled: isReady && !!user`

---

## 3. Fix Learning Flow

### Problem
- Typing "hi" as a skill creates a nonsensical learning path about "hi"
- Quiz questions are completely generic (same template for every topic)
- No input validation

### Fixes
- **Input validation**: Add a curated list of recognized skill categories (programming languages, design, marketing, etc.) and fuzzy-match user input. Show a warning/suggestion if input doesn't match known skills.
- **Better topic generation**: Create skill-specific topic sets for common skills (Python, JavaScript, UI Design, etc.) with meaningful descriptions, not just `"Introduction to {skillName}"`
- **Better quiz questions**: Generate skill-specific questions per topic instead of the current generic template that just string-interpolates the topic name
- **Roadmap-first flow**: After onboarding, show the full learning roadmap on the Learn tab before starting lessons. User clicks a topic to begin, rather than auto-starting

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/pages/Auth.tsx` | Create — login/signup page |
| `src/hooks/useAuth.ts` | Create — auth state hook |
| `src/App.tsx` | Modify — add `/auth` route, auth guard |
| `src/pages/Index.tsx` | Modify — check auth before showing app |
| `src/context/LearningContext.tsx` | Rewrite — database-backed state |
| `src/components/LearningScreen.tsx` | Modify — roadmap view + better quizzes |
| `src/components/Onboarding.tsx` | Modify — input validation for skills |
| `src/data/skillTemplates.ts` | Create — curated skill topics & quizzes |
| Database migration | Create tables + RLS policies + trigger |

