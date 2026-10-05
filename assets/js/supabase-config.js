// SFAKTOR GAMES - SUPABASE AYARLARI
// Burada yalnızca public / publishable key kullanılır.
// Secret key veya service_role key ASLA tarayıcıya koyulmaz.

const SUPABASE_URL = "https://wcgflxqyhrwanvkcyaxh.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ZSPMU0j2t-Khpqs78MTIcA_U_lVJPRg";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
