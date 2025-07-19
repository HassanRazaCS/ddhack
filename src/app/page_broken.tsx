import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { PageHeader } from "~/app/_components/page-header";
import { UserStatusHeader, AuthButtons } from "~/app/_components/user-status";
import { ScrollReveal } from "~/app/_components/scroll-reveal";
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
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 text-slate-900 relative overflow-hidden font-sans">
        <ScrollReveal />
        
        {/* Professional Side Lamps - ULTRA BRIGHT */}
        <div className="lamp-light lamp-left-side animate-lamp-glow-professional"></div>
        <div className="lamp-light lamp-right-side animate-lamp-glow-professional" style={{animationDelay: '1s'}}></div>
        
        {/* Premium Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-60 animate-pulse delay-1000"></div>
        </div>
        
        {/* Professional Navigation */}
        <nav className="relative z-20 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-lg">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">Legal Connect</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-slate-700 hover:text-indigo-600 font-medium transition-colors">Problems</a>
              <a href="#" className="text-slate-700 hover:text-indigo-600 font-medium transition-colors">Solutions</a>
              <a href="#" className="text-slate-700 hover:text-indigo-600 font-medium transition-colors">How it works</a>
            </div>
            <div className="flex space-x-4">
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-lg">
                Docs
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all font-medium shadow-lg">
                Launch demo
              </button>
            </div>
          </div>
        </nav>
        
        <div className="relative z-10 container mx-auto px-6 py-20">
          {/* Hero Section - Ultra Professional */}
          <div className="text-center mb-32 scroll-reveal max-w-6xl mx-auto">
            <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-8 leading-tight">
              Legal Aid Provisioning<br />
              <span className="text-6xl md:text-7xl">Made Simple With The<br />Intelligent Layer</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Leverage AI to manage legal cases across multiple jurisdictions for<br />
              pro bono opportunities and get maximum justice outcomes
            </p>
            
            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                href="/get-started"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-500 hover:from-indigo-500 hover:to-purple-500 shadow-2xl hover:shadow-indigo-500/50 transform hover:-translate-y-3 hover:scale-110"
              >
                Get Started Today
              </Link>
              <Link
                href="/learn-more"
                className="group relative inline-flex items-center gap-3 bg-white text-slate-800 px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-500 hover:bg-slate-50 shadow-2xl border border-slate-200"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Statistics Section */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 text-white rounded-3xl p-16 mb-32 relative overflow-hidden scroll-reveal shadow-2xl">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Transforming Legal Access Globally
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
              <div className="group hover:scale-110 transition-all duration-500">
                <div className="text-6xl font-bold text-indigo-400 mb-4">2.5M+</div>
                <div className="text-slate-300 text-xl">Cases Resolved</div>
              </div>
              <div className="group hover:scale-110 transition-all duration-500">
                <div className="text-6xl font-bold text-purple-400 mb-4">850+</div>
                <div className="text-slate-300 text-xl">Verified Lawyers</div>
              </div>
              <div className="group hover:scale-110 transition-all duration-500">
                <div className="text-6xl font-bold text-blue-400 mb-4">98.7%</div>
                <div className="text-slate-300 text-xl">Success Rate</div>
              </div>
              <div className="group hover:scale-110 transition-all duration-500">
                <div className="text-6xl font-bold text-emerald-400 mb-4">45</div>
                <div className="text-slate-300 text-xl">Countries</div>
              </div>
            </div>
          </div>
          
          {/* User Status Section */}
          {session?.user && (
            <div className="max-w-4xl mx-auto scroll-reveal">
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-12 border border-slate-200/50 shadow-xl">
                <div className="text-center mb-8">
                  <p className="text-3xl font-semibold text-slate-800 mb-4">
                    {hello ? hello.greeting : "Loading platform..."}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-8">
                  <UserStatusHeader session={session} />
                  <AuthButtons session={session} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </HydrateClient>
  );
}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-700 transition-colors font-display">Need Legal Help?</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Submit your case and get connected with verified lawyers who offer pro bono services. Get the legal assistance you deserve.
                </p>
                <Link 
                  href="/signup?type=seeker" 
                  className="magnetic-btn inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 group-hover:scale-105 relative overflow-hidden"
                >
                  <div className="absolute inset-0 animate-shimmer"></div>
                  Submit a Case
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
            
            {/* Lawyers Card */}
            <div className="group relative scroll-reveal">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 rounded-2xl blur-xl group-hover:blur-2xl group-hover:from-emerald-500/20 group-hover:to-emerald-600/20 transition-all duration-500"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 hover:border-emerald-300 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 transform hover:-translate-y-3 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:shadow-emerald-500/30 transition-all duration-300 group-hover:rotate-6">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">⚖️</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-emerald-700 transition-colors font-display">Legal Professional?</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Join our verified network of lawyers providing pro bono services. Make a difference in your community while building your practice.
                </p>
                <Link 
                  href="/signup?type=lawyer" 
                  className="magnetic-btn inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-1 group-hover:scale-105 relative overflow-hidden"
                >
                  <div className="absolute inset-0 animate-shimmer"></div>
                  Join as Lawyer
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
            
            {/* How it Works Card */}
            <div className="group relative scroll-reveal">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-slate-600/10 rounded-2xl blur-xl group-hover:blur-2xl group-hover:from-slate-500/20 group-hover:to-slate-600/20 transition-all duration-500"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 hover:border-slate-300 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-500/20 transform hover:-translate-y-3 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:shadow-slate-500/30 transition-all duration-300 group-hover:rotate-6">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">📋</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-slate-700 transition-colors font-display">How It Works</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Simple 3-step process: Submit your case, get matched with qualified lawyers, and receive the legal help you need.
                </p>
                <Link 
                  href="/how-it-works" 
                  className="magnetic-btn inline-flex items-center gap-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-slate-700 hover:to-slate-800 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/30 transform hover:-translate-y-1 group-hover:scale-105 relative overflow-hidden"
                >
                  <div className="absolute inset-0 animate-shimmer"></div>
                  Learn More
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Statistics Section with parallax effect */}
          <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white rounded-3xl p-12 mb-16 relative overflow-hidden scroll-reveal transform hover:scale-[1.02] transition-all duration-700">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-emerald-500 to-amber-500 animate-gradient-x"></div>
              <div className="absolute bottom-0 right-0 w-full h-2 bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-500 animate-gradient-x-reverse"></div>
            </div>
            
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent font-display glow-text">
              Making Justice Accessible
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="group hover:scale-110 transition-all duration-500">
                <div className="text-5xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors font-display">500+</div>
                <div className="text-slate-300 group-hover:text-white transition-colors">Cases Resolved</div>
              </div>
              <div className="group hover:scale-110 transition-all duration-500 delay-100">
                <div className="text-5xl font-bold text-emerald-400 mb-2 group-hover:text-emerald-300 transition-colors font-display">150+</div>
                <div className="text-slate-300 group-hover:text-white transition-colors">Verified Lawyers</div>
              </div>
              <div className="group hover:scale-110 transition-all duration-500 delay-200">
                <div className="text-5xl font-bold text-amber-400 mb-2 group-hover:text-amber-300 transition-colors font-display">95%</div>
                <div className="text-slate-300 group-hover:text-white transition-colors">Success Rate</div>
              </div>
            </div>
          </div>
          
          {/* CTA Section with magnetic hover effect */}
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-blue-700 to-slate-800 bg-clip-text text-transparent font-display">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Join thousands of people who have found the legal help they needed through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/know-your-rights"
                className="magnetic-btn group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-500 hover:from-amber-500 hover:to-orange-500 shadow-xl hover:shadow-2xl hover:shadow-amber-500/50 transform hover:-translate-y-2 hover:scale-110 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="text-2xl group-hover:rotate-12 transition-transform duration-300 relative z-10">📚</span>
                <span className="relative z-10">Know Your Rights</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              </Link>
              <Link
                href="/signup"
                className="magnetic-btn group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-500 hover:from-blue-500 hover:to-indigo-500 shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-2 hover:scale-110 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="text-2xl group-hover:rotate-12 transition-transform duration-300 relative z-10">�</span>
                <span className="relative z-10">Get Started Today</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              </Link>
            </div>
          </div>
          
          {/* User Status Section */}
          <div className="max-w-4xl mx-auto scroll-reveal">
            <div className="relative group">
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 hover:border-slate-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="text-center mb-6">
                  <p className="text-2xl font-semibold text-slate-700 mb-2 font-display">
                    {hello ? hello.greeting : "Loading tRPC query..."}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-6">
                  <UserStatusHeader session={session} />
                  
                  {session?.user && (
                    <p className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full inline-block">
                      User ID: {session.user.id}
                    </p>
                  )}
                  
                  <AuthButtons session={session} />
                </div>
              </div>
            </div>
          </div>

          {session?.user && (
            <div className="mt-16 max-w-4xl mx-auto scroll-reveal">
              <LatestPost />
            </div>
          )}
        </div>
      </main>
    </HydrateClient>
  );
}
