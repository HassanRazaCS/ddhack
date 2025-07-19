import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { PageHeader } from "~/app/_components/page-header";
import { UserStatusHeader, AuthButtons } from "~/app/_components/user-status";
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
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-800 relative overflow-hidden">
        {/* Animated floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-100 to-emerald-100 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-slate-100 to-blue-100 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl animate-bounce delay-500"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-emerald-200/30 rounded-full blur-2xl animate-bounce delay-1500"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-amber-200/30 rounded-full blur-xl animate-ping delay-2000"></div>
          
          {/* Floating legal icons */}
          <div className="absolute top-20 left-10 text-4xl text-blue-300/20 animate-float">⚖️</div>
          <div className="absolute top-60 right-20 text-3xl text-emerald-300/20 animate-float-delayed">📋</div>
          <div className="absolute bottom-40 left-20 text-2xl text-amber-300/20 animate-float-slow">🤝</div>
          <div className="absolute bottom-20 right-40 text-3xl text-slate-300/20 animate-float-delayed">📚</div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Hero Section with scroll reveal */}
          <div className="text-center mb-20 opacity-0 animate-fade-in-up">
            <PageHeader
              icon="⚖️"
              title="Legal Aid Connect"
              subtitle="Connecting individuals in need of legal assistance with qualified lawyers willing to provide pro bono services. Access justice, regardless of your financial situation."
              variant="primary"
              size="lg"
            />
          </div>
          
          {/* Feature Cards with staggered animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Aid Seekers Card */}
            <div className="group relative opacity-0 animate-fade-in-up delay-200">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-2xl blur-xl group-hover:blur-2xl group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all duration-500"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 hover:border-blue-300 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-3 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:rotate-6">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🤝</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-blue-700 transition-colors">Need Legal Help?</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Submit your case and get connected with verified lawyers who offer pro bono services. Get the legal assistance you deserve.
                </p>
                <Link 
                  href="/signup?type=seeker" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 group-hover:scale-105"
                >
                  Submit a Case
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
            
            {/* Lawyers Card */}
            <div className="group relative opacity-0 animate-fade-in-up delay-400">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 rounded-2xl blur-xl group-hover:blur-2xl group-hover:from-emerald-500/20 group-hover:to-emerald-600/20 transition-all duration-500"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 hover:border-emerald-300 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 transform hover:-translate-y-3 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:shadow-emerald-500/30 transition-all duration-300 group-hover:rotate-6">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">⚖️</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-emerald-700 transition-colors">Legal Professional?</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Join our verified network of lawyers providing pro bono services. Make a difference in your community while building your practice.
                </p>
                <Link 
                  href="/signup?type=lawyer" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-1 group-hover:scale-105"
                >
                  Join as Lawyer
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
            
            {/* How it Works Card */}
            <div className="group relative opacity-0 animate-fade-in-up delay-600">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-500/10 to-slate-600/10 rounded-2xl blur-xl group-hover:blur-2xl group-hover:from-slate-500/20 group-hover:to-slate-600/20 transition-all duration-500"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 hover:border-slate-300 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-500/20 transform hover:-translate-y-3 hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:shadow-slate-500/30 transition-all duration-300 group-hover:rotate-6">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">📋</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-slate-700 transition-colors">How It Works</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Simple 3-step process: Submit your case, get matched with qualified lawyers, and receive the legal help you need.
                </p>
                <Link 
                  href="/how-it-works" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-slate-700 hover:to-slate-800 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/30 transform hover:-translate-y-1 group-hover:scale-105"
                >
                  Learn More
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Statistics Section with parallax effect */}
          <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white rounded-3xl p-12 mb-16 relative overflow-hidden opacity-0 animate-fade-in-up delay-800 transform hover:scale-[1.02] transition-all duration-700">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-emerald-500 to-amber-500 animate-gradient-x"></div>
              <div className="absolute bottom-0 right-0 w-full h-2 bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-500 animate-gradient-x-reverse"></div>
            </div>
            
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-emerald-400 to-amber-400 bg-clip-text text-transparent">
              Making Justice Accessible
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="group hover:scale-110 transition-all duration-500">
                <div className="text-5xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">500+</div>
                <div className="text-slate-300 group-hover:text-white transition-colors">Cases Resolved</div>
              </div>
              <div className="group hover:scale-110 transition-all duration-500 delay-100">
                <div className="text-5xl font-bold text-emerald-400 mb-2 group-hover:text-emerald-300 transition-colors">150+</div>
                <div className="text-slate-300 group-hover:text-white transition-colors">Verified Lawyers</div>
              </div>
              <div className="group hover:scale-110 transition-all duration-500 delay-200">
                <div className="text-5xl font-bold text-amber-400 mb-2 group-hover:text-amber-300 transition-colors">95%</div>
                <div className="text-slate-300 group-hover:text-white transition-colors">Success Rate</div>
              </div>
            </div>
          </div>
          
          {/* CTA Section with magnetic hover effect */}
          <div className="text-center mb-16 opacity-0 animate-fade-in-up delay-1000">
            <h2 className="text-4xl font-bold text-slate-800 mb-6 bg-gradient-to-r from-slate-800 via-blue-700 to-slate-800 bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Join thousands of people who have found the legal help they needed through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/know-your-rights"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-500 hover:from-amber-500 hover:to-orange-500 shadow-xl hover:shadow-2xl hover:shadow-amber-500/50 transform hover:-translate-y-2 hover:scale-110 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="text-2xl group-hover:rotate-12 transition-transform duration-300 relative z-10">📚</span>
                <span className="relative z-10">Know Your Rights</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              </Link>
              <Link
                href="/signup"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-500 hover:from-blue-500 hover:to-indigo-500 shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-2 hover:scale-110 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="text-2xl group-hover:rotate-12 transition-transform duration-300 relative z-10">🚀</span>
                <span className="relative z-10">Get Started Today</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              </Link>
            </div>
          </div>
          
          {/* User Status Section */}
          <div className="max-w-4xl mx-auto opacity-0 animate-fade-in-up delay-1200">
            <div className="relative group">
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 hover:border-slate-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="text-center mb-6">
                  <p className="text-2xl font-semibold text-slate-700 mb-2">
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
            <div className="mt-16 max-w-4xl mx-auto opacity-0 animate-fade-in-up delay-1400">
              <LatestPost />
            </div>
          )}
        </div>
      </main>
    </HydrateClient>
  );
}
