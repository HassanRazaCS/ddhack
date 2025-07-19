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
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Poppins', 'Roboto', system-ui, sans-serif",
        fontWeight: "500",
        background: "#faf9f7",
        color: "#2d3748"
      }}
    >
      {/* Animated Legal Elements */}
      <div 
        id="scales-element"
        style={{
          position: "fixed",
          top: "15%",
          right: "-20px",
          width: "140px",
          height: "140px",
          zIndex: 10,
          opacity: 0.25,
          transform: "translateY(10px) rotate(0deg)",
          transition: "all 0.4s ease-out"
        }}
      >
        <img 
          src="https://8f3riwpkblxtrplf.public.blob.vercel-storage.com/blob-2025-07-19%20at%2015.53.29.png"
          alt="Scales of Justice"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "sepia(20%) saturate(120%) hue-rotate(60deg)"
          }}
        />
      </div>
      <div 
        id="hammer-element"
        style={{
          position: "fixed",
          top: "20%",
          left: "-30px",
          width: "120px",
          height: "120px",
          zIndex: 10,
          opacity: 0.25,
          transform: "translateX(10px) rotate(0deg)",
          transition: "all 0.4s ease-out"
        }}
      >
        <img 
          src="https://8f3riwpkblxtrplf.public.blob.vercel-storage.com/clipart349134.png"
          alt="Legal Gavel"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "sepia(20%) saturate(120%) hue-rotate(60deg)"
          }}
        />
      </div>
      
      <ScrollReveal />

      {/* Scroll-triggered Legal Elements Animation */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            let isInitialized = false;
            let animationStarted = false;
            
            function initScrollAnimation() {
              if (isInitialized) return;
              isInitialized = true;
              
              const scalesElement = document.getElementById('scales-element');
              const hammerElement = document.getElementById('hammer-element');
              
              if (!scalesElement || !hammerElement) {
                setTimeout(initScrollAnimation, 100);
                return;
              }
              
              // Initial entrance animation
              function startEntranceAnimation() {
                if (animationStarted) return;
                animationStarted = true;
                
                // Start from off-screen
                scalesElement.style.transform = 'translateY(100px) rotate(0deg)';
                scalesElement.style.opacity = '0.1';
                hammerElement.style.transform = 'translateX(-100px) rotate(0deg)';
                hammerElement.style.opacity = '0.1';
                
                // Animate to visible position
                setTimeout(() => {
                  scalesElement.style.transform = 'translateY(10px) rotate(0deg)';
                  scalesElement.style.opacity = '0.25';
                  hammerElement.style.transform = 'translateX(10px) rotate(0deg)';
                  hammerElement.style.opacity = '0.25';
                }, 1000);
              }
              
              function handleScroll() {
                const scrollY = window.scrollY;
                const windowHeight = window.innerHeight;
                const disappearThreshold = windowHeight * 0.25;
                
                if (scrollY > disappearThreshold) {
                  // Fade out and disappear
                  scalesElement.style.opacity = '0';
                  scalesElement.style.transform = 'translateY(-150px) rotate(180deg) scale(0.1)';
                  scalesElement.style.visibility = 'hidden';
                  hammerElement.style.opacity = '0';
                  hammerElement.style.transform = 'translateX(-150px) rotate(-180deg) scale(0.1)';
                  hammerElement.style.visibility = 'hidden';
                  
                  // Reset animation flag when hidden
                  animationStarted = false;
                } else {
                  // Show and animate when in hero area
                  scalesElement.style.visibility = 'visible';
                  hammerElement.style.visibility = 'visible';
                  
                  // Start entrance animation if not started
                  if (!animationStarted) {
                    startEntranceAnimation();
                  }
                  
                  // Continuous rotation based on scroll
                  const progress = scrollY / disappearThreshold;
                  const rotationAmount = progress * 90;
                  const baseOpacity = 0.25;
                  const opacity = Math.max(0.15, baseOpacity - (progress * 0.1));
                  
                  // Only apply scroll rotation if entrance animation is done
                  setTimeout(() => {
                    if (scrollY <= disappearThreshold) {
                      scalesElement.style.opacity = opacity.toString();
                      scalesElement.style.transform = \`translateY(10px) rotate(\${rotationAmount}deg) scale(1)\`;
                      hammerElement.style.opacity = opacity.toString();
                      hammerElement.style.transform = \`translateX(10px) rotate(\${-rotationAmount}deg) scale(1)\`;
                    }
                  }, animationStarted ? 0 : 1500);
                }
              }
              
              // Start initial animation
              startEntranceAnimation();
              
              // Set up scroll listener
              window.addEventListener('scroll', handleScroll, { passive: true });
              window.addEventListener('resize', handleScroll, { passive: true });
              handleScroll(); // Initial call
            }
            
            // Initialize when DOM is ready
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', initScrollAnimation);
            } else {
              setTimeout(initScrollAnimation, 100);
            }
          })();
        `
      }} />
      
      {/* Professional Side Lamps - Subtle Effect */}
      <div 
        className="lamp-light lamp-left-side"
        style={{
          position: "fixed",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          filter: "blur(120px)",
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.4,
          top: "10%",
          left: "-200px",
          background: "radial-gradient(circle, rgba(181, 168, 70, 0.8) 0%, rgba(204, 158, 93, 0.6) 30%, rgba(220, 224, 109, 0.4) 60%, transparent 100%)",
          animation: "lamp-glow-professional 8s ease-in-out infinite"
        }}
      ></div>
      <div 
        className="lamp-light lamp-right-side"
        style={{
          position: "fixed",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          filter: "blur(120px)",
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.4,
          bottom: "10%",
          right: "-200px",
          background: "radial-gradient(circle, rgba(157, 208, 139, 0.8) 0%, rgba(199, 213, 111, 0.6) 30%, rgba(220, 224, 109, 0.4) 60%, transparent 100%)",
          animation: "lamp-glow-professional 8s ease-in-out infinite 2s"
        }}
      ></div>
      
      {/* Floating legal icons and particles - Subtle effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-2xl"
          style={{
            background: "radial-gradient(circle, rgba(157, 208, 139, 0.3), transparent)",
            animation: "pulse 4s ease-in-out infinite"
          }}
        ></div>
        <div 
          className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-2xl"
          style={{
            background: "radial-gradient(circle, rgba(199, 213, 111, 0.3), transparent)",
            animation: "pulse 4s ease-in-out infinite 2s"
          }}
        ></div>
        
        {/* Floating legal icons - Smaller and subtle */}
        <div 
          className="absolute top-20 left-10 text-4xl opacity-20"
          style={{
            color: "#b5a846",
            animation: "float 6s ease-in-out infinite"
          }}
        >⚖️</div>
        <div 
          className="absolute top-40 right-20 text-3xl opacity-20"
          style={{
            color: "#8FBC8F",
            animation: "float 7s ease-in-out infinite 1s"
          }}
        >📋</div>
        <div 
          className="absolute bottom-40 left-20 text-3xl opacity-20"
          style={{
            color: "#dce06d",
            animation: "float 8s ease-in-out infinite 2s"
          }}
        >🤝</div>
        <div 
          className="absolute bottom-20 right-40 text-3xl opacity-20"
          style={{
            color: "#c7d56f",
            animation: "float 7s ease-in-out infinite 1.5s"
          }}
        >📚</div>
      </div>
      
      {/* Professional Navigation with BOSS'S LOGO */}
      <nav 
        style={{
          position: "relative",
          zIndex: 20,
          width: "100%",
          borderBottom: "1px solid rgba(181, 168, 70, 0.3)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(20px)"
        }}
      >
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          paddingTop: "12px",
          paddingBottom: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            {/* BOSS'S LOGO - FORCED SIZING */}
                        <div 
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                flexShrink: 0,
                background: "linear-gradient(135deg, #8FBC8F, #98D982)",
                border: "2px solid #6B8E23"
              }}
            >
              <img 
                src="https://8f3riwpkblxtrplf.public.blob.vercel-storage.com/ChatGPT%20Image%20Jul%2019%2C%202025%2C%2003_03_47%20PM.png"
                alt="Legal Aid Logo"
                style={{ 
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  borderRadius: "4px",
                  filter: "brightness(1.1) contrast(1.1)"
                }}
              />
            </div>
            <span 
              style={{
                fontSize: "24px",
                fontWeight: "700",
                background: "linear-gradient(135deg, #6B8E23, #8FBC8F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              Advocado
            </span>
          </div>
          <div style={{
            display: "flex",
            gap: "24px",
            alignItems: "center"
          }} className="hidden md:flex">
            <Link 
              href="/know-your-rights" 
              style={{
                color: "#6B8E23",
                textShadow: "0 1px 2px rgba(107, 142, 35, 0.2)",
                fontWeight: "600",
                fontSize: "18px",
                textDecoration: "none",
                transition: "all 0.3s ease"
              }}
            >
              Know Your Rights
            </Link>
            <Link 
              href="/find-lawyer" 
              style={{
                color: "#6B8E23",
                textShadow: "0 1px 2px rgba(107, 142, 35, 0.2)",
                fontWeight: "600",
                fontSize: "18px",
                textDecoration: "none",
                transition: "all 0.3s ease"
              }}
            >
              Find Lawyer
            </Link>
            <Link 
              href="/about" 
              style={{
                color: "#6B8E23",
                textShadow: "0 1px 2px rgba(107, 142, 35, 0.2)",
                fontWeight: "600",
                fontSize: "18px",
                textDecoration: "none",
                transition: "all 0.3s ease"
              }}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              style={{
                color: "#6B8E23",
                textShadow: "0 1px 2px rgba(107, 142, 35, 0.2)",
                fontWeight: "600",
                fontSize: "18px",
                textDecoration: "none",
                transition: "all 0.3s ease"
              }}
            >
              Contact
            </Link>
          </div>
          <div style={{
            display: "flex",
            gap: "12px",
            alignItems: "center"
          }}>
            <Link 
              href="/signup" 
              style={{
                padding: "8px 24px",
                color: "white",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "16px",
                textDecoration: "none",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                background: "linear-gradient(135deg, #8FBC8F, #98D982)",
                textShadow: "0 1px 2px rgba(0,0,0,0.2)"
              }}
            >
              Sign Up
            </Link>
            <Link 
              href="/login" 
              style={{
                padding: "8px 24px",
                color: "white",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "16px",
                textDecoration: "none",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                background: "linear-gradient(135deg, #9ACD32, #8FBC8F)",
                textShadow: "0 1px 2px rgba(0,0,0,0.2)"
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <div style={{
        position: "relative",
        zIndex: 10,
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "64px 16px"
      }}>
        {/* Hero Section with Professional styling */}
        <div 
          style={{
            textAlign: "center",
            marginBottom: "64px",
            opacity: 1,
            transform: "translateY(0)",
            transition: "all 0.8s ease-out"
          }}
        >
          <h1 
            style={{
              fontSize: "72px",
              fontWeight: "800",
              color: "#2d3748", 
              marginBottom: "24px",
              textAlign: "center",
              fontFamily: "'Poppins', sans-serif",
              textShadow: "none"
            }}
          >
            Advocado
          </h1>
          <p 
            style={{
              marginBottom: "32px",
              maxWidth: "800px",
              margin: "0 auto 32px",
              lineHeight: "1.6",
              fontSize: "20px",
              color: "#2d3748",
              fontWeight: "500",
              fontFamily: "'Poppins', sans-serif",
              textShadow: "0 1px 2px rgba(0,0,0,0.1)",
              background: "rgba(255,255,255,0.8)",
              padding: "16px 24px",
              borderRadius: "8px"
            }}
          >
            Connecting individuals in need of legal assistance with qualified lawyers willing to provide pro bono services. Access justice, regardless of your financial situation.
          </p>
        </div>

        {/* Our Services Section */}
        <div style={{
          marginBottom: "64px",
          padding: "48px 32px",
          background: "rgba(255,255,255,0.9)",
          borderRadius: "16px",
          border: "1px solid #b5a846",
          boxShadow: "0 8px 32px rgba(181, 168, 70, 0.1)"
        }}>
          <h2 style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#8FBC8F",
            textAlign: "center",
            marginBottom: "32px",
            fontFamily: "'Poppins', sans-serif"
          }}>
            Our Services
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "32px"
          }}>
            <div style={{
              padding: "24px",
              background: "rgba(181, 168, 70, 0.1)",
              borderRadius: "12px",
              border: "1px solid #b5a846"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#2d3748",
                marginBottom: "12px",
                fontFamily: "'Poppins', sans-serif"
              }}>
                🔍 Case Matching
              </h3>
              <p style={{
                fontSize: "16px",
                color: "#4a5568",
                lineHeight: "1.5"
              }}>
                Smart algorithm connects you with verified lawyers specializing in your specific legal needs.
              </p>
            </div>
            <div style={{
              padding: "24px",
              background: "rgba(143, 188, 143, 0.1)",
              borderRadius: "12px",
              border: "1px solid #8FBC8F"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#2d3748",
                marginBottom: "12px",
                fontFamily: "'Poppins', sans-serif"
              }}>
                ⚖️ Pro Bono Network
              </h3>
              <p style={{
                fontSize: "16px",
                color: "#4a5568",
                lineHeight: "1.5"
              }}>
                Access to qualified lawyers offering free legal services to those who need it most.
              </p>
            </div>
            <div style={{
              padding: "24px",
              background: "rgba(220, 224, 109, 0.1)",
              borderRadius: "12px",
              border: "1px solid #dce06d"
            }}>
              <h3 style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#2d3748",
                marginBottom: "12px",
                fontFamily: "'Poppins', sans-serif"
              }}>
                � Case Management
              </h3>
              <p style={{
                fontSize: "16px",
                color: "#4a5568",
                lineHeight: "1.5"
              }}>
                Track your case progress, communicate with your lawyer, and manage documents securely.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div style={{
          marginBottom: "64px",
          textAlign: "center"
        }}>
          <h2 style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#8FBC8F",
            marginBottom: "48px",
            fontFamily: "'Poppins', sans-serif"
          }}>
            How Advocado Works
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "32px"
          }}>
            <div style={{
              padding: "32px 24px",
              background: "rgba(255,255,255,0.9)",
              borderRadius: "12px",
              border: "1px solid #b5a846",
              boxShadow: "0 4px 16px rgba(181, 168, 70, 0.1)"
            }}>
              <div style={{
                fontSize: "48px",
                marginBottom: "16px"
              }}>📝</div>
              <h3 style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#2d3748",
                marginBottom: "16px",
                fontFamily: "'Poppins', sans-serif"
              }}>
                1. Submit Your Case
              </h3>
              <p style={{
                fontSize: "16px",
                color: "#4a5568",
                lineHeight: "1.5"
              }}>
                Create a profile and submit details about your legal issue. Our secure platform protects your information.
              </p>
            </div>
            <div style={{
              padding: "32px 24px",
              background: "rgba(255,255,255,0.9)",
              borderRadius: "12px",
              border: "1px solid #8FBC8F",
              boxShadow: "0 4px 16px rgba(143, 188, 143, 0.1)"
            }}>
              <div style={{
                fontSize: "48px",
                marginBottom: "16px"
              }}>🔍</div>
              <h3 style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#2d3748",
                marginBottom: "16px",
                fontFamily: "'Poppins', sans-serif"
              }}>
                2. Lawyer Review
              </h3>
              <p style={{
                fontSize: "16px",
                color: "#4a5568",
                lineHeight: "1.5"
              }}>
                Verified lawyers review your case and can express interest in providing pro bono assistance.
              </p>
            </div>
            <div style={{
              padding: "32px 24px",
              background: "rgba(255,255,255,0.9)",
              borderRadius: "12px",
              border: "1px solid #9dd08b",
              boxShadow: "0 4px 16px rgba(157, 208, 139, 0.1)"
            }}>
              <div style={{
                fontSize: "48px",
                marginBottom: "16px"
              }}>🤝</div>
              <h3 style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#2d3748",
                marginBottom: "16px",
                fontFamily: "'Poppins', sans-serif"
              }}>
                3. Get Connected
              </h3>
              <p style={{
                fontSize: "16px",
                color: "#4a5568",
                lineHeight: "1.5"
              }}>
                Connect directly with interested lawyers and receive the legal help you need.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div style={{
          padding: "48px 32px",
          background: "linear-gradient(135deg, #8FBC8F, #98D982)",
          borderRadius: "16px",
          textAlign: "center",
          marginBottom: "64px",
          color: "white"
        }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "16px",
            fontFamily: "'Poppins', sans-serif"
          }}>
            Ready to Find Legal Help? Join Advocado Today.
          </h2>
          <p style={{
            fontSize: "18px",
            marginBottom: "32px",
            opacity: 0.9
          }}>
            Join thousands who have found justice through Advocado's platform.
          </p>
          <div style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <Link 
              href="/signup" 
              style={{
                padding: "12px 32px",
                background: "rgba(255,255,255,0.2)",
                color: "white",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "18px",
                textDecoration: "none",
                border: "2px solid rgba(255,255,255,0.3)",
                transition: "all 0.3s ease"
              }}
            >
              Get Help Now
            </Link>
            <Link 
              href="/lawyer-signup" 
              style={{
                padding: "12px 32px",
                background: "white",
                color: "#b5a846",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "18px",
                textDecoration: "none",
                transition: "all 0.3s ease"
              }}
            >
              Join as a Lawyer
            </Link>
          </div>
        </div>

        {/* User Status Section */}
        <div style={{
          maxWidth: "800px",
          margin: "0 auto"
        }}>
          <div 
            style={{
              position: "relative",
              borderRadius: "12px",
              padding: "32px",
              border: "1px solid #b5a846",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)"
            }}
          >
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px"
            }}>
              <UserStatusHeader session={session} />
              
              {session?.user && (
                <p 
                  style={{
                    fontWeight: "500",
                    background: "#f1f5f9",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    display: "inline-block",
                    fontSize: "14px",
                    color: "#6B8E23"
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
          <div style={{
            marginTop: "80px",
            maxWidth: "1000px",
            margin: "80px auto 0"
          }}>
            <LatestPost />
          </div>
        )}
      </div>
    </main>
  );
}
