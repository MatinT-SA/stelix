import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ibgdtgbvhnopgcedszes.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliZ2R0Z2J2aG5vcGdjZWRzemVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNDIzNjUsImV4cCI6MjA1NzYxODM2NX0.3Nb5mmCKyC2BdSKvrsfCWqhuGcAMAlp9pyTtPjP7JqE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
