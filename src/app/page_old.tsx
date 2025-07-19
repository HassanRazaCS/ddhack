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
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-800 relative overflow-hidden" style={{fontFamily: "'Playfair Display', 'Georgia', serif"}}>
        <ScrollReveal />
        
        {/* Professional Side Lamps - ULTRA BRIGHT */}
        <div className="lamp-light lamp-left-side animate-lamp-glow-professional"></div>
        <div className="lamp-light lamp-right-side animate-lamp-glow-professional" style={{animationDelay: '1s'}}></div>
        
        {/* Floating legal icons and particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-100 to-emerald-100 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-slate-100 to-blue-100 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-2xl animate-bounce delay-500" style={{backgroundColor: '#355070'}}></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full blur-2xl animate-bounce delay-1500" style={{backgroundColor: '#6d597a'}}></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full blur-xl animate-ping delay-2000" style={{backgroundColor: '#b56576'}}></div>
          
          {/* Floating legal icons */}
          <div className="absolute top-20 left-10 text-4xl opacity-20 animate-float" style={{color: '#355070'}}>⚖️</div>
          <div className="absolute top-60 right-20 text-3xl opacity-20 animate-float-delayed" style={{color: '#6d597a'}}>📋</div>
          <div className="absolute bottom-40 left-20 text-2xl opacity-20 animate-float-slow" style={{color: '#b56576'}}>🤝</div>
          <div className="absolute bottom-20 right-40 text-3xl opacity-20 animate-float-delayed" style={{color: '#e56b6f'}}>📚</div>
        </div>
        
        {/* Professional Navigation */}
        <nav className="relative z-20 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-lg">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{background: 'linear-gradient(135deg, #355070, #6d597a)'}}>
                <span className="text-white font-bold text-lg">⚖️</span>
              </div>
              <span className="text-2xl font-bold" style={{background: 'linear-gradient(135deg, #355070, #6d597a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Legal Aid Connect</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/know-your-rights" className="font-medium transition-colors hover:opacity-80" style={{color: '#355070'}}>Know Your Rights</Link>
              <Link href="/find-lawyer" className="font-medium transition-colors hover:opacity-80" style={{color: '#355070'}}>Find Lawyer</Link>
              <Link href="/about" className="font-medium transition-colors hover:opacity-80" style={{color: '#355070'}}>About</Link>
              <Link href="/contact" className="font-medium transition-colors hover:opacity-80" style={{color: '#355070'}}>Contact</Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/signup" className="px-6 py-2 text-white rounded-lg transition-colors font-medium shadow-lg" style={{backgroundColor: '#355070'}}>
                Sign Up
              </Link>
              <Link href="/login" className="px-6 py-2 text-white rounded-lg transition-all font-medium shadow-lg" style={{background: 'linear-gradient(135deg, #e56b6f, #eaac8b)'}}>
                Get Help Now
              </Link>
            </div>
          </div>
        </nav>
        
        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Hero Section with scroll reveal */}
          <div className="text-center mb-20 scroll-reveal">
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
            <div className="group relative scroll-reveal">
              <div className="absolute inset-0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" style={{backgroundColor: '#35507020'}}></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105" style={{borderColor: '#355070'}}>
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-6" style={{background: 'linear-gradient(135deg, #355070, #6d597a)'}}>
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🤝</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 transition-colors" style={{fontFamily: "'Playfair Display', serif"}}>Need Legal Help?</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Submit your case and get connected with verified lawyers who offer pro bono services. Get the legal assistance you deserve.
                </p>
                <Link 
                  href="/signup?type=seeker" 
                  className="magnetic-btn inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 group-hover:scale-105 relative overflow-hidden"
                  style={{background: 'linear-gradient(135deg, #355070, #6d597a)'}}
                >
                  <div className="absolute inset-0 animate-shimmer"></div>
                  Submit a Case
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
            
            {/* Lawyers Card */}
            <div className="group relative scroll-reveal">
              <div className="absolute inset-0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" style={{backgroundColor: '#b5657620'}}></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105" style={{borderColor: '#b56576'}}>
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-6" style={{background: 'linear-gradient(135deg, #b56576, #e56b6f)'}}>
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">⚖️</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 transition-colors" style={{fontFamily: "'Playfair Display', serif"}}>Legal Professional?</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Join our verified network of lawyers providing pro bono services. Make a difference in your community while building your practice.
                </p>
                <Link 
                  href="/signup?type=lawyer" 
                  className="magnetic-btn inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 group-hover:scale-105 relative overflow-hidden"
                  style={{background: 'linear-gradient(135deg, #b56576, #e56b6f)'}}
                >
                  <div className="absolute inset-0 animate-shimmer"></div>
                  Join as Lawyer
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
            
            {/* How it Works Card */}
            <div className="group relative scroll-reveal">
              <div className="absolute inset-0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" style={{backgroundColor: '#eaac8b20'}}></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105" style={{borderColor: '#eaac8b'}}>
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-6" style={{background: 'linear-gradient(135deg, #e56b6f, #eaac8b)'}}>
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">📋</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 transition-colors" style={{fontFamily: "'Playfair Display', serif"}}>How It Works</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Simple 3-step process: Submit your case, get matched with qualified lawyers, and receive the legal help you need.
                </p>
                <Link 
                  href="/how-it-works" 
                  className="magnetic-btn inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 group-hover:scale-105 relative overflow-hidden"
                  style={{background: 'linear-gradient(135deg, #e56b6f, #eaac8b)'}}
                >
                  <div className="absolute inset-0 animate-shimmer"></div>
                  Learn More
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="text-white rounded-3xl p-12 mb-16 relative overflow-hidden scroll-reveal transform hover:scale-[1.02] transition-all duration-700" style={{background: 'linear-gradient(135deg, #355070, #6d597a, #b56576)'}}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-2 animate-gradient-x" style={{background: 'linear-gradient(90deg, #e56b6f, #eaac8b, #355070)'}}></div>
              <div className="absolute bottom-0 right-0 w-full h-2 animate-gradient-x-reverse" style={{background: 'linear-gradient(90deg, #355070, #eaac8b, #e56b6f)'}}></div>
            </div>
            
            <h2 className="text-4xl font-bold text-center mb-12 glow-text" style={{fontFamily: "'Playfair Display', serif", background: 'linear-gradient(135deg, #eaac8b, #e56b6f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Making Justice Accessible
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="group hover:scale-110 transition-all duration-500">
                <div className="text-5xl font-bold mb-2 group-hover:opacity-80 transition-colors" style={{color: '#eaac8b', fontFamily: "'Playfair Display', serif"}}>500+</div>
                <div className="text-slate-300 group-hover:text-white transition-colors">Cases Resolved</div>
              </div>
              <div className="group hover:scale-110 transition-all duration-500 delay-100">
                <div className="text-5xl font-bold mb-2 group-hover:opacity-80 transition-colors" style={{color: '#e56b6f', fontFamily: "'Playfair Display', serif"}}>150+</div>
                <div className="text-slate-300 group-hover:text-white transition-colors">Verified Lawyers</div>
              </div>
              <div className="group hover:scale-110 transition-all duration-500 delay-200">
                <div className="text-5xl font-bold mb-2 group-hover:opacity-80 transition-colors" style={{color: '#eaac8b', fontFamily: "'Playfair Display', serif"}}>95%</div>
                <div className="text-slate-300 group-hover:text-white transition-colors">Success Rate</div>
              </div>
            </div>
          </div>
          
          {/* CTA Section with magnetic hover effect */}
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-6" style={{fontFamily: "'Playfair Display', serif", background: 'linear-gradient(135deg, #355070, #6d597a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Ready to Get Started?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Join thousands of people who have found the legal help they needed through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/know-your-rights"
                className="magnetic-btn group relative inline-flex items-center gap-3 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 overflow-hidden"
                style={{background: 'linear-gradient(135deg, #e56b6f, #eaac8b)'}}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: 'linear-gradient(135deg, #b56576, #e56b6f)'}}></div>
                <span className="text-2xl group-hover:rotate-12 transition-transform duration-300 relative z-10">📚</span>
                <span className="relative z-10">Know Your Rights</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              </Link>
              <Link
                href="/signup"
                className="magnetic-btn group relative inline-flex items-center gap-3 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 overflow-hidden"
                style={{background: 'linear-gradient(135deg, #355070, #6d597a)'}}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: 'linear-gradient(135deg, #6d597a, #b56576)'}}></div>
                <span className="text-2xl group-hover:rotate-12 transition-transform duration-300 relative z-10">🚀</span>
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
                  <p className="text-2xl font-semibold text-slate-700 mb-2" style={{fontFamily: "'Playfair Display', serif"}}>
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
