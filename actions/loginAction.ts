// app/login/actions.ts
"use server";


import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {getUserByUsernameAndPassword, storeToken} from "@/lib/db";

export async function loginAction(formData: FormData) {
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    if (!username || !password) {
        throw new Error("Missing credentials");
    }

    const user = await  getUserByUsernameAndPassword(username, password);


    if (!user) {
        throw new Error("Invalid credentials");
    }
    const token = "asdlkjasd";

    const storedToken = await storeToken(user.id, token);

    // example: simple session cookie
    (await cookies()).set("token_auth_1", storedToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
    });

    redirect("/");
}
