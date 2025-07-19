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
      <main className="min-h-screen relative overflow-hidden" style={{fontFamily: "'Poppins', 'Roboto', sans-serif", background: 'linear-gradient(135deg, #b5a846, #cc9e5d, #dce06d)'}}>
        <ScrollReveal />
        
        {/* BOSS'S ULTRA BRIGHT SIDE LAMPS - NEW COLOR PALETTE */}
        <div className="lamp-light lamp-left-side animate-lamp-glow-professional"></div>
        <div className="lamp-light lamp-right-side animate-lamp-glow-professional" style={{animationDelay: '1s'}}></div>
        
        {/* Floating legal icons and particles with NEW colors */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{background: 'radial-gradient(circle, rgba(157, 208, 139, 0.4), transparent)'}}></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000" style={{background: 'radial-gradient(circle, rgba(199, 213, 111, 0.4), transparent)'}}></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-2xl animate-professional-bounce delay-500" style={{backgroundColor: '#b5a846'}}></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full blur-2xl animate-professional-bounce delay-1500" style={{backgroundColor: '#cc9e5d'}}></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full blur-xl animate-professional-pulse delay-2000" style={{backgroundColor: '#dce06d'}}></div>
          
          {/* Floating legal icons with NEW colors */}
          <div className="absolute top-20 left-10 text-4xl opacity-30 animate-float" style={{color: '#b5a846'}}>⚖️</div>
          <div className="absolute top-60 right-20 text-3xl opacity-30 animate-float-delayed" style={{color: '#cc9e5d'}}>📋</div>
          <div className="absolute bottom-40 left-20 text-2xl opacity-30 animate-float-slow" style={{color: '#dce06d'}}>🤝</div>
          <div className="absolute bottom-20 right-40 text-3xl opacity-30 animate-float-delayed" style={{color: '#c7d56f'}}>📚</div>
        </div>
        
        {/* Professional Navigation with NEW palette */}
        <nav className="relative z-20 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-xl">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xl" style={{background: 'linear-gradient(135deg, #b5a846, #cc9e5d)'}}>
                <span className="text-white font-bold text-xl">⚖️</span>
              </div>
              <span className="text-3xl font-bold" style={{background: 'linear-gradient(135deg, #b5a846, #cc9e5d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: "'Poppins', sans-serif"}}>Legal Aid Connect</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/know-your-rights" className="font-semibold text-lg transition-colors hover:opacity-80" style={{color: '#b5a846'}}>Know Your Rights</Link>
              <Link href="/find-lawyer" className="font-semibold text-lg transition-colors hover:opacity-80" style={{color: '#b5a846'}}>Find Lawyer</Link>
              <Link href="/about" className="font-semibold text-lg transition-colors hover:opacity-80" style={{color: '#b5a846'}}>About</Link>
              <Link href="/contact" className="font-semibold text-lg transition-colors hover:opacity-80" style={{color: '#b5a846'}}>Contact</Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/signup" className="px-8 py-3 text-white rounded-xl transition-colors font-bold shadow-xl text-lg" style={{backgroundColor: '#b5a846'}}>
                Sign Up
              </Link>
              <Link href="/login" className="px-8 py-3 text-white rounded-xl transition-all font-bold shadow-xl text-lg" style={{background: 'linear-gradient(135deg, #c7d56f, #9dd08b)'}}>
                Get Help Now
              </Link>
            </div>
          </div>
        </nav>
        
        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Hero Section with IMMEDIATE scroll reveal */}
          <div className="text-center mb-20 scroll-reveal">
            <h1 className="text-8xl font-black mb-8 glow-text leading-tight" style={{color: '#9dd08b', fontFamily: "'Poppins', sans-serif"}}>
              Legal Aid Connect
            </h1>
            <p className="text-3xl mb-12 max-w-5xl mx-auto font-semibold leading-relaxed" style={{color: '#b5a846'}}>
              Connecting individuals in need of legal assistance with qualified lawyers willing to provide pro bono services. Access justice, regardless of your financial situation.
            </p>
          </div>
          
          {/* Feature Cards with NEW color palette */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Aid Seekers Card */}
            <div className="group relative scroll-reveal">
              <div className="absolute inset-0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" style={{backgroundColor: '#b5a84630'}}></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 border-2 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105" style={{borderColor: '#b5a846'}}>
                <div className="w-20 h-20 rounded-xl flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-6" style={{background: 'linear-gradient(135deg, #b5a846, #cc9e5d)'}}>
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">🤝</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 transition-colors" style={{color: '#b5a846', fontFamily: "'Poppins', sans-serif"}}>Need Legal Help?</h3>
                <p className="text-slate-700 leading-relaxed mb-6 text-lg font-medium">
                  Submit your case and get connected with verified lawyers who offer pro bono services. Get the legal assistance you deserve.
                </p>
                <Link 
                  href="/signup?type=seeker" 
                  className="magnetic-btn inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 group-hover:scale-105 relative overflow-hidden"
                  style={{background: 'linear-gradient(135deg, #b5a846, #cc9e5d)'}}
                >
                  <div className="absolute inset-0 animate-shimmer"></div>
                  Submit a Case
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
            
            {/* Lawyers Card */}
            <div className="group relative scroll-reveal">
              <div className="absolute inset-0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" style={{backgroundColor: '#dce06d30'}}></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 border-2 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105" style={{borderColor: '#dce06d'}}>
                <div className="w-20 h-20 rounded-xl flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-6" style={{background: 'linear-gradient(135deg, #dce06d, #c7d56f)'}}>
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">⚖️</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 transition-colors" style={{color: '#cc9e5d', fontFamily: "'Poppins', sans-serif"}}>Legal Professional?</h3>
                <p className="text-slate-700 leading-relaxed mb-6 text-lg font-medium">
                  Join our verified network of lawyers providing pro bono services. Make a difference in your community while building your practice.
                </p>
                <Link 
                  href="/signup?type=lawyer" 
                  className="magnetic-btn inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 group-hover:scale-105 relative overflow-hidden"
                  style={{background: 'linear-gradient(135deg, #dce06d, #c7d56f)'}}
                >
                  <div className="absolute inset-0 animate-shimmer"></div>
                  Join as Lawyer
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
            
            {/* How it Works Card */}
            <div className="group relative scroll-reveal">
              <div className="absolute inset-0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" style={{backgroundColor: '#9dd08b30'}}></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 border-2 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105" style={{borderColor: '#9dd08b'}}>
                <div className="w-20 h-20 rounded-xl flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-6" style={{background: 'linear-gradient(135deg, #c7d56f, #9dd08b)'}}>
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">📋</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 transition-colors" style={{color: '#9dd08b', fontFamily: "'Poppins', sans-serif"}}>How It Works</h3>
                <p className="text-slate-700 leading-relaxed mb-6 text-lg font-medium">
                  Simple 3-step process: Submit your case, get matched with qualified lawyers, and receive the legal help you need.
                </p>
                <Link 
                  href="/how-it-works" 
                  className="magnetic-btn inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 group-hover:scale-105 relative overflow-hidden"
                  style={{background: 'linear-gradient(135deg, #c7d56f, #9dd08b)'}}
                >
                  <div className="absolute inset-0 animate-shimmer"></div>
                  Learn More
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Statistics Section with NEW palette */}
          <div className="text-white rounded-3xl p-16 mb-16 relative overflow-hidden scroll-reveal transform hover:scale-[1.02] transition-all duration-700" style={{background: 'linear-gradient(135deg, #b5a846, #cc9e5d, #dce06d)'}}>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-3 animate-gradient-x" style={{background: 'linear-gradient(90deg, #c7d56f, #9dd08b, #b5a846)'}}></div>
              <div className="absolute bottom-0 right-0 w-full h-3 animate-gradient-x-reverse" style={{background: 'linear-gradient(90deg, #b5a846, #9dd08b, #c7d56f)'}}></div>
            </div>
            
            <h2 className="text-6xl font-black text-center mb-16 glow-text" style={{fontFamily: "'Poppins', sans-serif", color: '#9dd08b'}}>
              Making Justice Accessible
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="group hover:scale-110 transition-all duration-500">
                <div className="text-7xl font-black mb-4 group-hover:opacity-80 transition-colors" style={{color: '#9dd08b', fontFamily: "'Poppins', sans-serif"}}>500+</div>
                <div className="text-slate-100 text-2xl font-semibold group-hover:text-white transition-colors">Cases Resolved</div>
              </div>
              <div className="group hover:scale-110 transition-all duration-500 delay-100">
                <div className="text-7xl font-black mb-4 group-hover:opacity-80 transition-colors" style={{color: '#c7d56f', fontFamily: "'Poppins', sans-serif"}}>150+</div>
                <div className="text-slate-100 text-2xl font-semibold group-hover:text-white transition-colors">Verified Lawyers</div>
              </div>
              <div className="group hover:scale-110 transition-all duration-500 delay-200">
                <div className="text-7xl font-black mb-4 group-hover:opacity-80 transition-colors" style={{color: '#9dd08b', fontFamily: "'Poppins', sans-serif"}}>95%</div>
                <div className="text-slate-100 text-2xl font-semibold group-hover:text-white transition-colors">Success Rate</div>
              </div>
            </div>
          </div>
          
          {/* CTA Section with magnetic hover effect */}
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-6xl font-black mb-8" style={{fontFamily: "'Poppins', sans-serif", background: 'linear-gradient(135deg, #b5a846, #cc9e5d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Ready to Get Started?
            </h2>
            <p className="text-2xl mb-12 max-w-4xl mx-auto font-semibold" style={{color: '#b5a846'}}>
              Join thousands of people who have found the legal help they needed through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link
                href="/know-your-rights"
                className="magnetic-btn group relative inline-flex items-center gap-4 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 hover:scale-110 overflow-hidden"
                style={{background: 'linear-gradient(135deg, #c7d56f, #9dd08b)'}}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: 'linear-gradient(135deg, #dce06d, #c7d56f)'}}></div>
                <span className="text-3xl group-hover:rotate-12 transition-transform duration-300 relative z-10">📚</span>
                <span className="relative z-10">Know Your Rights</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              </Link>
              <Link
                href="/signup"
                className="magnetic-btn group relative inline-flex items-center gap-4 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all duration-500 shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 hover:scale-110 overflow-hidden"
                style={{background: 'linear-gradient(135deg, #b5a846, #cc9e5d)'}}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: 'linear-gradient(135deg, #cc9e5d, #dce06d)'}}></div>
                <span className="text-3xl group-hover:rotate-12 transition-transform duration-300 relative z-10">🚀</span>
                <span className="relative z-10">Get Started Today</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              </Link>
            </div>
          </div>
          
          {/* User Status Section */}
          <div className="max-w-5xl mx-auto scroll-reveal">
            <div className="relative group">
              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-12 border-2 transition-all duration-300 shadow-2xl hover:shadow-3xl" style={{borderColor: '#b5a846'}}>
                <div className="text-center mb-8">
                  <p className="text-3xl font-bold mb-4" style={{color: '#b5a846', fontFamily: "'Poppins', sans-serif"}}>
                    {hello ? hello.greeting : "Loading tRPC query..."}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-8">
                  <UserStatusHeader session={session} />
                  
                  {session?.user && (
                    <p className="text-lg font-medium bg-slate-100 px-4 py-2 rounded-full inline-block" style={{color: '#cc9e5d'}}>
                      User ID: {session.user.id}
                    </p>
                  )}
                  
                  <AuthButtons session={session} />
                </div>
              </div>
            </div>
          </div>

          {session?.user && (
            <div className="mt-20 max-w-5xl mx-auto scroll-reveal">
              <LatestPost />
            </div>
          )}
        </div>
      </main>
    </HydrateClient>
  );
}
