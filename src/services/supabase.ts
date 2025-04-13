import { createClient } from "@supabase/supabase-js";
import { DatabaseType } from "../types/SupabaseType";

export const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY;

// Criando cliente tipado do Supabase
const supabase = createClient<DatabaseType>(supabaseUrl, supabaseKey);

export default supabase;
