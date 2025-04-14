import supabase from "./supabase";

export async function getGuests() {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded");
  }

  return data;
}
