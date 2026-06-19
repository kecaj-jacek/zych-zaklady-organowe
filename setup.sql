-- KROK 1: Tworzenie tabeli projektów
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  venue_name text NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  year_built integer NOT NULL,
  voices_count integer NOT NULL,
  manuals text NOT NULL,
  action_type text,
  status text NOT NULL,
  main_image text,
  gallery_images text[] DEFAULT '{}',
  long_description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- KROK 2: Ustawienie zabezpieczeń (Row Level Security) dla tabeli
-- Dla celów deweloperskich pozwalamy na pełny dostęp (odczyt/zapis)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Zezwól na wszystko anonimowo" 
ON public.projects 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- KROK 3: Tworzenie publicznego koszyka (Bucket) na zdjęcia
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- KROK 4: Zabezpieczenia koszyka na zdjęcia
-- Pozwalamy na publiczny odczyt, wgrywanie i usuwanie plików
CREATE POLICY "Public Access" 
ON storage.objects FOR ALL 
USING ( bucket_id = 'project-images' );
