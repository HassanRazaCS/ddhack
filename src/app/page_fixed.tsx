import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { PageHeader } from "~/app/_components/page-header";
import { UserStatusHeader, AuthButtons } from "~/app/_components/user-status";
import { ScrollReveal } from "~/app/_components/scroll-reveal";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  // Prefetch latest post for authenticated users - no need to prefetch on server

  return (
    <main 
      className="min-h-screen relative overflow-hidden"
      style={{
        fontFamily: "'Poppins', 'Roboto', system-ui, sans-serif",
        fontWeight: "500",
        background: "linear-gradient(135deg, #b5a846 0%, #cc9e5d 25%, #dce06d 50%, #c7d56f 75%, #9dd08b 100%)",
        color: "#2d3748"
      }}
    >
      <ScrollReveal />
      
      {/* BOSS'S ULTRA BRIGHT SIDE LAMPS - FORCED STYLING */}
      <div 
        className="lamp-light lamp-left-side"
        style={{
          position: "fixed",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          filter: "blur(180px)",
          pointerEvents: "none",
          zIndex: 1,
          opacity: 1,
          top: "0%",
          left: "-300px",
          background: "radial-gradient(circle, rgba(181, 168, 70, 1) 0%, rgba(204, 158, 93, 0.9) 15%, rgba(220, 224, 109, 0.8) 30%, rgba(199, 213, 111, 0.7) 45%, rgba(157, 208, 139, 0.6) 60%, transparent 100%)",
          animation: "lamp-glow-professional 5s ease-in-out infinite"
        }}
      ></div>
      <div 
        className="lamp-light lamp-right-side"
        style={{
          position: "fixed",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          filter: "blur(180px)",
          pointerEvents: "none",
          zIndex: 1,
          opacity: 1,
          bottom: "0%",
          right: "-300px",
          background: "radial-gradient(circle, rgba(157, 208, 139, 1) 0%, rgba(199, 213, 111, 0.9) 15%, rgba(220, 224, 109, 0.8) 30%, rgba(204, 158, 93, 0.7) 45%, rgba(181, 168, 70, 0.6) 60%, transparent 100%)",
          animation: "lamp-glow-professional 5s ease-in-out infinite 1s"
        }}
      ></div>
      
      {/* Floating legal icons and particles with FORCED styling */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(157, 208, 139, 0.6), transparent)",
            animation: "pulse 3s ease-in-out infinite"
          }}
        ></div>
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(199, 213, 111, 0.6), transparent)",
            animation: "pulse 3s ease-in-out infinite 1s"
          }}
        ></div>
        
        {/* Floating legal icons with FORCED styling */}
        <div 
          className="absolute top-20 left-10 text-6xl opacity-40"
          style={{
            color: "#b5a846",
            animation: "float 4.5s ease-in-out infinite",
            fontSize: "4rem"
          }}
        >⚖️</div>
        <div 
          className="absolute top-60 right-20 text-5xl opacity-40"
          style={{
            color: "#cc9e5d",
            animation: "float 5.5s ease-in-out infinite 1s",
            fontSize: "3rem"
          }}
        >📋</div>
        <div 
          className="absolute bottom-40 left-20 text-4xl opacity-40"
          style={{
            color: "#dce06d",
            animation: "float 6.5s ease-in-out infinite 2s",
            fontSize: "2rem"
          }}
        >🤝</div>
        <div 
          className="absolute bottom-20 right-40 text-5xl opacity-40"
          style={{
            color: "#c7d56f",
            animation: "float 5.5s ease-in-out infinite 1.5s",
            fontSize: "3rem"
          }}
        >📚</div>
      </div>
      
      {/* Professional Navigation with BOSS'S LOGO */}
      <nav 
        className="relative z-20 w-full border-b shadow-xl"
        style={{
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(181, 168, 70, 0.3)"
        }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* BOSS'S LOGO */}
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center shadow-xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #b5a846, #cc9e5d)",
                border: "3px solid #9dd08b"
              }}
            >
              <img 
                src="https://8f3riwpkblxtrplf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%2019%2C%202025%2C%2003_03_47%20PM.png"
                alt="Legal Aid Logo"
                className="w-full h-full object-cover rounded-lg"
                style={{ filter: "brightness(1.1) contrast(1.1)" }}
              />
            </div>
            <span 
              className="text-4xl font-black"
              style={{
                background: "linear-gradient(135deg, #b5a846, #cc9e5d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "900"
              }}
            >
              Legal Aid Connect
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/know-your-rights" 
              className="font-bold text-xl transition-all duration-300 hover:scale-110"
              style={{
                color: "#b5a846",
                textShadow: "0 2px 4px rgba(181, 168, 70, 0.3)"
              }}
            >
              Know Your Rights
            </Link>
            <Link 
              href="/find-lawyer" 
              className="font-bold text-xl transition-all duration-300 hover:scale-110"
              style={{
                color: "#b5a846",
                textShadow: "0 2px 4px rgba(181, 168, 70, 0.3)"
              }}
            >
              Find Lawyer
            </Link>
            <Link 
              href="/about" 
              className="font-bold text-xl transition-all duration-300 hover:scale-110"
              style={{
                color: "#b5a846",
                textShadow: "0 2px 4px rgba(181, 168, 70, 0.3)"
              }}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="font-bold text-xl transition-all duration-300 hover:scale-110"
              style={{
                color: "#b5a846",
                textShadow: "0 2px 4px rgba(181, 168, 70, 0.3)"
              }}
            >
              Contact
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link 
              href="/signup" 
              className="px-8 py-4 text-white rounded-xl font-black text-lg shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #b5a846, #cc9e5d)",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)"
              }}
            >
              Sign Up
            </Link>
            <Link 
              href="/login" 
              className="px-8 py-4 text-white rounded-xl font-black text-lg shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #c7d56f, #9dd08b)",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)"
              }}
            >
              Get Help Now
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* FORCED CSS ANIMATIONS IN HEAD */}
        <style jsx>{`
          @keyframes lamp-glow-professional {
            0%, 100% {
              opacity: 0.95;
              transform: scale(1.3) rotate(0deg);
              filter: brightness(6) drop-shadow(0 0 120px rgba(181, 168, 70, 1)) drop-shadow(0 0 240px rgba(204, 158, 93, 0.9));
            }
            25% {
              opacity: 1;
              transform: scale(1.6) rotate(90deg);
              filter: brightness(7) drop-shadow(0 0 140px rgba(220, 224, 109, 1)) drop-shadow(0 0 280px rgba(199, 213, 111, 0.95));
            }
            50% {
              opacity: 0.98;
              transform: scale(1.7) rotate(180deg);
              filter: brightness(8) drop-shadow(0 0 160px rgba(157, 208, 139, 1)) drop-shadow(0 0 320px rgba(181, 168, 70, 0.8));
            }
            75% {
              opacity: 1;
              transform: scale(1.5) rotate(270deg);
              filter: brightness(7.5) drop-shadow(0 0 150px rgba(199, 213, 111, 1)) drop-shadow(0 0 300px rgba(220, 224, 109, 0.85));
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg) scale(1);
            }
            33% {
              transform: translateY(-30px) rotate(8deg) scale(1.08);
            }
            66% {
              transform: translateY(-18px) rotate(-5deg) scale(0.95);
            }
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 0.6;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.1);
            }
          }
        `}</style>

        {/* Hero Section with FORCED styling */}
        <div 
          className="text-center mb-20"
          style={{
            opacity: 1,
            transform: "translateY(0)",
            transition: "all 0.8s ease-out"
          }}
        >
          <h1 
            className="mb-8 leading-tight"
            style={{
              fontSize: "8rem",
              fontWeight: "900",
              color: "#9dd08b",
              fontFamily: "'Poppins', sans-serif",
              textShadow: "0 0 40px rgba(157, 208, 139, 1), 0 0 80px rgba(199, 213, 111, 0.9), 0 0 120px rgba(220, 224, 109, 0.7), 0 0 160px rgba(204, 158, 93, 0.5)",
              marginBottom: "2rem"
            }}
          >
            Legal Aid Connect
          </h1>
          <p 
            className="mb-12 max-w-5xl mx-auto leading-relaxed"
            style={{
              fontSize: "3rem",
              color: "#b5a846",
              fontWeight: "600",
              fontFamily: "'Poppins', sans-serif",
              textShadow: "0 2px 8px rgba(181, 168, 70, 0.4)"
            }}
          >
            Connecting individuals in need of legal assistance with qualified lawyers willing to provide pro bono services. Access justice, regardless of your financial situation.
          </p>
        </div>

        {/* User Status Section */}
        <div className="max-w-5xl mx-auto">
          <div 
            className="relative rounded-3xl p-12 border-2 shadow-2xl"
            style={{
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(10px)",
              borderColor: "#b5a846"
            }}
          >
            <div className="text-center mb-8">
              <p 
                className="mb-4"
                style={{
                  fontSize: "3rem",
                  fontWeight: "800",
                  color: "#b5a846",
                  fontFamily: "'Poppins', sans-serif"
                }}
              >
                {hello ? hello.greeting : "Loading tRPC query..."}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-8">
              <UserStatusHeader session={session} />
              
              {session?.user && (
                <p 
                  className="font-medium bg-slate-100 px-4 py-2 rounded-full inline-block"
                  style={{
                    fontSize: "1.125rem",
                    color: "#cc9e5d"
                  }}
                >
                  User ID: {session.user.id}
                </p>
              )}
              
              <AuthButtons session={session} />
            </div>
          </div>
        </div>

        {session?.user && (
          <div className="mt-20 max-w-5xl mx-auto">
            <LatestPost />
          </div>
        )}
      </div>
    </main>
  );
}
