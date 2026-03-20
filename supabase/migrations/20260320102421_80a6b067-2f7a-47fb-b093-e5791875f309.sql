
CREATE TABLE public.saved_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  poi_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, poi_id)
);

ALTER TABLE public.saved_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved stories"
  ON public.saved_stories FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved stories"
  ON public.saved_stories FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved stories"
  ON public.saved_stories FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
