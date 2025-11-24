import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { User } from "@supabase/supabase-js";

export async function getAuthenticatedUser(): Promise<User> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/Login");
  }

  return user;
}
