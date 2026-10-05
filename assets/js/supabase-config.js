// SUPABASE AYARLARI
// Supabase > Project Settings > API ekranındaki değerleri buraya yaz.
//
// ÖNEMLİ: Buraya SADECE public anon key yazılır.
// service_role key ASLA tarayıcıya koyulmaz.

const SUPABASE_URL = "BURAYA_SUPABASE_PROJECT_URL";
const SUPABASE_ANON_KEY = "BURAYA_SUPABASE_ANON_KEY";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
