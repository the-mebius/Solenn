import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) || 'https://indbpuvsnwjxoouqebsv.supabase.co';
const supabaseKey = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) || 'sb_publishable_F0phpmfxjM_WM5o43cpumg_XCLnxkny';

export const supabase = createClient(supabaseUrl, supabaseKey);
