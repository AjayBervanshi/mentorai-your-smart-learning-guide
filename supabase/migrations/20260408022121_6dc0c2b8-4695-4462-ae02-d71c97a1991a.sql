
-- Cache table for AI-generated content
CREATE TABLE public.topic_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_title TEXT NOT NULL,
  skill_name TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'lesson',
  lesson_content JSONB,
  quiz_questions JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(topic_title, skill_name, content_type)
);

ALTER TABLE public.topic_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read cached content"
  ON public.topic_content FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert cached content"
  ON public.topic_content FOR INSERT TO authenticated WITH CHECK (true);

-- Add last_active_date for streak tracking
ALTER TABLE public.user_learning_profiles
  ADD COLUMN IF NOT EXISTS last_active_date DATE;
