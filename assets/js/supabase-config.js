// SUPABASE AYARLARI
// Buraya SADECE public / publishable key yazılır.
// Secret key veya service_role key ASLA tarayıcıya koyulmaz.

const SUPABASE_URL = "https://wcgflxqyhrwanvkcyaxh.supabase.co";
const SUPABASE_ANON_KEY = "BURAYA_SUPABASE_PUBLISHABLE_KEY";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
