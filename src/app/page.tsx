import Link from "next/link";

import { EventManager } from "~/app/_components/event-manager";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.event.getAll.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">

            <div className="flex flex-col items-center justify-center gap-4">
              {session ? (
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-green-400 mb-2">
                    Hello, {session.user?.name || session.user?.email}! 👋
                  </h2>
                  <p className="text-lg text-white/80">
                    You are successfully logged in!
                  </p>
                  <p className="text-sm text-white/60 mt-1">
                    User ID: {session.user?.id}
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                    Welcome! Please sign in to continue 🔐
                  </h2>
                  <p className="text-lg text-white/80">
                    You are not logged in
                  </p>
                </div>
              )}
              
              <Link
                href={session ? "/api/auth/signout" : "/login"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
              
              {!session && (
                <Link
                  href="/signup"
                  className="rounded-full bg-blue-600 px-8 py-2 font-semibold no-underline transition hover:bg-blue-500"
                >
                  Create Account
                </Link>
              )}
            </div>
          </div>

          {session?.user && <EventManager />}
        </div>
      </main>
    </HydrateClient>
  );
}
