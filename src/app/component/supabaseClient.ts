// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wdfbndhnsksisjxseqbb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkZmJuZGhuc2tzaXNqeHNlcWJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxMzkyNDEsImV4cCI6MjA1MTcxNTI0MX0.owh9IYMx8Q2kM5WmHPyGCdUIVt5mdMCXCHZZK6vFY2U';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase