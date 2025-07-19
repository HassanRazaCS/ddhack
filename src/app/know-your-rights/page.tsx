import Link from "next/link";
import { PageHeader } from "~/app/_components/page-header";
import { RightsCard } from "~/app/_components/rights-card";
import { ArrestCard } from "~/app/_components/arrest-card";
import { ScrollReveal } from "~/app/_components/scroll-reveal";
import { rightsData } from "~/app/_data/rights-data";

export default function KnowYourRightsPage() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{fontFamily: "'Playfair Display', 'Georgia', serif", background: 'linear-gradient(135deg, #355070, #6d597a, #b56576)'}}>
      <ScrollReveal />
      
      {/* Professional Side Lamps - ULTRA BRIGHT */}
      <div className="lamp-light lamp-left-side animate-lamp-glow-professional"></div>
      <div className="lamp-light lamp-right-side animate-lamp-glow-professional" style={{animationDelay: '1s'}}></div>
      
      {/* Floating legal icons and particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-4xl opacity-30 animate-float" style={{color: '#eaac8b'}}>⚖️</div>
        <div className="absolute top-60 right-20 text-3xl opacity-30 animate-float-delayed" style={{color: '#e56b6f'}}>📋</div>
        <div className="absolute bottom-40 left-20 text-2xl opacity-30 animate-float-slow" style={{color: '#355070'}}>🛡️</div>
        <div className="absolute bottom-20 right-40 text-3xl opacity-30 animate-float-delayed" style={{color: '#6d597a'}}>🏛️</div>
      </div>
      
      {/* Professional Navigation */}
      <nav className="relative z-20 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{background: 'linear-gradient(135deg, #355070, #6d597a)'}}>
              <span className="text-white font-bold text-lg">⚖️</span>
            </div>
            <Link href="/" className="text-2xl font-bold" style={{background: 'linear-gradient(135deg, #355070, #6d597a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Legal Aid Connect
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium transition-colors hover:opacity-80" style={{color: '#355070'}}>Home</Link>
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
      
      {/* Hero Header */}
      <header className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-12 scroll-reveal">
          <h1 className="text-6xl font-bold mb-6 glow-text" style={{color: '#eaac8b', fontFamily: "'Playfair Display', serif"}}>
            Know Your Rights
          </h1>
          <p className="text-2xl mb-8 max-w-4xl mx-auto" style={{color: '#e56b6f'}}>
            Knowledge is power. Understand your legal rights to protect yourself and navigate the justice system with confidence.
          </p>
        </div>
      </header>
      
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="group relative scroll-reveal">
            <div className="absolute inset-0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" style={{backgroundColor: '#35507020'}}></div>
            <RightsCard
              icon={rightsData.fundamentalRights.icon}
              title={rightsData.fundamentalRights.title}
              items={rightsData.fundamentalRights.items}
              variant={rightsData.fundamentalRights.variant}
            />
          </div>
          
          <div className="group relative scroll-reveal">
            <div className="absolute inset-0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" style={{backgroundColor: '#b5657620'}}></div>
            <RightsCard
              icon={rightsData.policeInteraction.icon}
              title={rightsData.policeInteraction.title}
              items={rightsData.policeInteraction.items}
              variant={rightsData.policeInteraction.variant}
            />
          </div>
          
          <div className="group relative scroll-reveal">
            <div className="absolute inset-0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" style={{backgroundColor: '#e56b6f20'}}></div>
            <RightsCard
              icon={rightsData.iceInteraction.icon}
              title={rightsData.iceInteraction.title}
              items={rightsData.iceInteraction.items}
              variant={rightsData.iceInteraction.variant}
            />
          </div>
          
          <div className="group relative scroll-reveal">
            <div className="absolute inset-0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" style={{backgroundColor: '#eaac8b20'}}></div>
            <RightsCard
              icon={rightsData.homeRights.icon}
              title={rightsData.homeRights.title}
              items={rightsData.homeRights.items}
              variant={rightsData.homeRights.variant}
            />
          </div>
          
          <div className="group relative scroll-reveal">
            <div className="absolute inset-0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" style={{backgroundColor: '#6d597a20'}}></div>
            <RightsCard
              icon={rightsData.dispersalOrder.icon}
              title={rightsData.dispersalOrder.title}
              items={rightsData.dispersalOrder.items}
              variant={rightsData.dispersalOrder.variant}
            className="lg:col-span-2"
            useGrid={true}
          />
          </div>
          
          <div className="group relative scroll-reveal lg:col-span-2">
            <div className="absolute inset-0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" style={{backgroundColor: '#35507020'}}></div>
            <ArrestCard
              icon={rightsData.arrest.icon}
              title={rightsData.arrest.title}
              items={rightsData.arrest.items}
              importantNumbers={rightsData.arrest.importantNumbers}
              variant={rightsData.arrest.variant}
              className="lg:col-span-2"
            />
          </div>
        </div>
        
        {/* Professional CTA Section */}
        <div className="text-center mt-16 scroll-reveal">
          <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-12 border border-slate-200 shadow-xl" style={{background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(234,172,139,0.1))'}}>
            <h2 className="text-4xl font-bold mb-6" style={{fontFamily: "'Playfair Display', serif", background: 'linear-gradient(135deg, #355070, #6d597a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Need Legal Assistance?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto" style={{color: '#6d597a'}}>
              If you need help navigating a legal situation, our verified network of pro bono lawyers is here to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/signup"
                className="magnetic-btn group relative inline-flex items-center gap-3 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 overflow-hidden"
                style={{background: 'linear-gradient(135deg, #355070, #6d597a)'}}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: 'linear-gradient(135deg, #6d597a, #b56576)'}}></div>
                <span className="text-2xl group-hover:rotate-12 transition-transform duration-300 relative z-10">🤝</span>
                <span className="relative z-10">Get Legal Help</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              </Link>
              <Link
                href="/"
                className="magnetic-btn group relative inline-flex items-center gap-3 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 overflow-hidden"
                style={{background: 'linear-gradient(135deg, #e56b6f, #eaac8b)'}}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: 'linear-gradient(135deg, #b56576, #e56b6f)'}}></div>
                <span className="text-2xl group-hover:rotate-12 transition-transform duration-300 relative z-10">🏠</span>
                <span className="relative z-10">Back to Home</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12 scroll-reveal">
          <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 border shadow-lg" style={{borderColor: '#eaac8b'}}>
            <p className="text-lg mb-6" style={{color: '#6d597a'}}>
              This information is based on guidelines from the ACLU and other legal organizations. For more detailed information, visit the{" "}
              <a 
                href="https://www.aclu.org/know-your-rights/protesters-rights" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-medium transition-colors hover:opacity-80"
                style={{color: '#355070'}}
              >
                ACLU website
              </a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
