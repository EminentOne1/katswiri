import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl || "https://yrxeldgvagliebeoksiu.supabase.co",
  supabaseKey ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyeGVsZGd2YWdsaWViZW9rc2l1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzczODAyNSwiZXhwIjoyMDU5MzE0MDI1fQ.9qa_zEHRjUZN5YVocxPdV6nNp-7bIaPaMAEE5-PNCTs"
);
