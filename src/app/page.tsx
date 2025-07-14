import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8 shadow-2xl">
              <span className="text-4xl">✊</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
                Unite
              </span>
              <span className="text-white"> & </span>
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Organize
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              The most powerful platform to organize peaceful protests, unite communities, 
              and create lasting change through collective action.
            </p>
          </div>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-purple-800/50 to-pink-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-3xl">📢</span>
                </div>
                <h3 className="text-2xl font-bold text-purple-200 mb-4">Organize Protests</h3>
                <p className="text-gray-300 leading-relaxed">
                  Create and manage peaceful protests with powerful planning tools, event coordination, and community building features.
                </p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-emerald-800/50 to-teal-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="text-2xl font-bold text-emerald-200 mb-4">Invite & Share</h3>
                <p className="text-gray-300 leading-relaxed">
                  Easily invite people and share your events across all social media platforms to amplify your voice and grow your movement.
                </p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-blue-800/50 to-indigo-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-3xl">⚖️</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-200 mb-4">Legal Aid Support</h3>
                <p className="text-gray-300 leading-relaxed">
                  Access comprehensive legal resources, crowdsourced legal aid, and know your rights when participating in peaceful demonstrations.
                </p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              href="/know-your-rights"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:from-amber-400 hover:to-orange-400 shadow-2xl hover:shadow-amber-500/50 transform hover:-translate-y-1 hover:scale-105"
            >
              <span className="text-2xl">⚖️</span>
              Know Your Rights
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="/organize"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:from-purple-400 hover:to-pink-400 shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-1 hover:scale-105"
            >
              <span className="text-2xl">📢</span>
              Organize a Protest
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </Link>
          </div>
          
          {/* User Status Section */}
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-800 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/40 hover:border-slate-500/50 transition-all duration-300">
                <div className="text-center mb-6">
                  <p className="text-2xl font-semibold text-emerald-400 mb-2">
                    {hello ? hello.greeting : "Loading tRPC query..."}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-6">
                  {session ? (
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-4 shadow-xl">
                        <span className="text-2xl">👋</span>
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-3">
                        Welcome back, {session.user?.name || session.user?.email}!
                      </h2>
                      <p className="text-xl text-gray-300 mb-2">
                        Ready to make a difference? Start organizing or join an existing movement.
                      </p>
                      <p className="text-sm text-gray-500 bg-slate-800/50 px-3 py-1 rounded-full inline-block">
                        User ID: {session.user?.id}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4 shadow-xl">
                        <span className="text-2xl">🔐</span>
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-3">
                        Join the Movement
                      </h2>
                      <p className="text-xl text-gray-300">
                        Sign in to start organizing and making your voice heard
                      </p>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={session ? "/api/auth/signout" : "/login"}
                      className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <span className="text-lg">{session ? "👋" : "🔑"}</span>
                      {session ? "Sign out" : "Sign in"}
                    </Link>
                    
                    {!session && (
                      <Link
                        href="/signup"
                        className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <span className="text-lg">✨</span>
                        Create Account
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {session?.user && (
            <div className="mt-16 max-w-4xl mx-auto">
              <LatestPost />
            </div>
          )}
        </div>
      </main>
    </HydrateClient>
  );
}
