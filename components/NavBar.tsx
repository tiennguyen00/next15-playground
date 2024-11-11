import React from "react";
import Link from "next/link";
import { signIn, signOut, auth } from "@/app/auth";

const NavBar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <img src="/logo.png" alt="" />
        </Link>
        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href={"/startup/create"}>
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">Log out</button>
              </form>
              <Link href={`/user/${session.user.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Signin with GitHub</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
