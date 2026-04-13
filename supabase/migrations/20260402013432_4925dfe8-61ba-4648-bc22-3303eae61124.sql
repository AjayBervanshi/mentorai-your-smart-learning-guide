
-- Profiles table
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

-- User learning profiles
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
ALTER TABLE public.user_learning_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own learning profile" ON public.user_learning_profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own learning profile" ON public.user_learning_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own learning profile" ON public.user_learning_profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own learning profile" ON public.user_learning_profiles FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- User skills
CREATE TABLE public.user_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level TEXT NOT NULL,
  progress INTEGER DEFAULT 0,
  current_topic_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own skills" ON public.user_skills FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own skills" ON public.user_skills FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own skills" ON public.user_skills FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own skills" ON public.user_skills FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- User topics
CREATE TABLE public.user_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID NOT NULL REFERENCES public.user_skills(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  level TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  score INTEGER,
  sort_order INTEGER DEFAULT 0,
  subtopics TEXT[] DEFAULT ARRAY['Concept', 'Examples', 'Practice', 'Quiz']
);
ALTER TABLE public.user_topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own topics" ON public.user_topics FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own topics" ON public.user_topics FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own topics" ON public.user_topics FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own topics" ON public.user_topics FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;
