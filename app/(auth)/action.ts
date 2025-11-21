'use server';

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";

export async function signup(formdata: FormData) {
    const name = formdata.get('name') as string;
    const email = formdata.get('email') as string;
    const password = formdata.get('password') as string;
    const company = formdata.get('company') as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
        email,
        password
    })

    if (error) {
        console.error("Sign up error", error.message);

        // implement a better error handling later
    }

    return redirect("/signup?message=Check email to confirm account");
}