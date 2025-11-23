'use server';

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { signupServerSchema } from "@/lib/validation/auth";

export async function signup(formdata: FormData) {
    const raw = {
        name: String(formdata.get("name") || ""),
        email: String(formdata.get("email") || ""),
        password: String(formdata.get("password") || ""),
        company: String(formdata.get("company") || "")
    }

    const parsed = signupServerSchema.safeParse(raw);
    if (!parsed.success) {
    const first = parsed.error.issues?.[0]?.message || "Invalid input";
    return redirect(`/signup?error=${encodeURIComponent(first)}`);
  }

    const { name, email, password, company} = parsed.data;
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        console.error("Sign up error", error.message);
        redirect(`/signup?error=${encodeURIComponent('Sign up error ' + error.message)}`);

        // implement a better error handling later
    }

    if (user) {
        const { error: profileError } = await supabase
        .from('profiles')
        .insert([
            {
                id: user.id,
                name: name,
                company: company
            }
        ])

        if (profileError) {
            console.error("Profile Saving Error", profileError.message);
            redirect(`/signup?error=${encodeURIComponent('Sign up error ' + profileError.message)}`);
        }
    }

    return redirect(`/signup?message=${encodeURIComponent("Check email for confirmation")}`);
}

export async function login(formdata: FormData) {
    const email = formdata.get("email") as string
    const password = formdata.get("password") as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email, 
        password
    })

    if (error) {
        console.error("Sign up error", error.message);
        redirect(`/Login?error=${encodeURIComponent('Login error ' + error.message)}`);

        // implement a better error handling later
    }

    return redirect('/')
}