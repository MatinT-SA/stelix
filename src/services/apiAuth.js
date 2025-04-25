import supabase, { supabaseUrl } from "./supabase";

export async function signup({ email, password, fullName }) {
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  const user = await getCurrentUser();

  // 🚫 Block updates for the demo account
  if (user?.email === "test@gmail.com") {
    throw new Error("Demo user cannot update credentials.");
  }

  let updateUser;
  if (password) updateUser = { password };
  if (fullName) updateUser = { data: { fullName } };

  const { error, data } = await supabase.auth.updateUser(updateUser);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: ErrorStorage } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (ErrorStorage) throw new Error(ErrorStorage.message);

  const { error: error2, data: updatedUser } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
