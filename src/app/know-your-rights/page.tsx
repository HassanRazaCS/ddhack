"use client";

import { AlertTriangle, ChevronDown } from "lucide-react";
import { useState } from "react";

// Shadcn UI components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

// Country rights data structure
const countryRights = {
  US: {
    flag: "🇺🇸",
    name: "United States",
    title: "Know Your Rights in the United States",
    sections: [
      {
        heading: "Your Fundamental Rights (First Amendment)",
        points: [
          "You have the right to **peacefully assemble** and express your views through protest.",
          "You have the right to **free speech**, even if it&apos;s unpopular or controversial.",
          "Your rights are strongest in **traditional public forums** like streets, sidewalks, and parks.",
          "You have the right to **photograph or videotape** anything in plain view in a public space.",
          "**Counter-protesters** also have free speech rights. Police must treat both groups equally.",
          "You do **not need a permit** to march on streets or sidewalks if you don&apos;t obstruct traffic.",
        ],
      },
      {
        heading: "If You Are Stopped by Police",
        points: [
          "**Stay calm** and keep your hands visible. Do not argue, resist, or obstruct the police.",
          "Ask **&apos;Am I free to leave?&apos;** If the officer says yes, calmly walk away.",
          "If you are under arrest, you have a right to **ask why**.",
          "State that you wish to **remain silent** and ask for a lawyer immediately.",
          "You do **not have to consent** to a search of yourself or your belongings.",
          "Police **cannot confiscate or view** your photos/videos without a warrant.",
          "You have the right to **record police** in public spaces from a safe distance.",
        ],
      },
      {
        heading: "If ICE Approaches You",
        points: [
          "You have the right to **remain silent**. You do not have to answer questions about immigration status.",
          "You do **not have to consent** to a search of yourself or your belongings.",
          "If you are not a U.S. citizen, **carry immigration documents** with you if you have them.",
          "You have the right to **an attorney**, but government doesn&apos;t provide one for immigration cases.",
          "Do **not lie** about your status or provide false documents.",
          "If detained, ask to **call a lawyer or your consulate** immediately.",
        ],
      },
      {
        heading: "If Police Order You to Disperse",
        points: [
          "Police must have a **legitimate reason** to issue a dispersal order (clear and present danger).",
          "They must provide **reasonable opportunity** to comply, including clear exit path and enough time.",
          "You must receive **clear, detailed notice** of the order before arrest for failing to disperse.",
          "If you believe the order is unlawful, **do not resist**. Comply and challenge it later in court.",
        ],
      },
      {
        heading: "If You Are Arrested",
        points: [
          "Do **not resist arrest**, even if you believe it is unjust.",
          "Say you wish to **remain silent** and that you want a lawyer.",
          "You have the right to a **local phone call**. Police cannot listen if calling a lawyer.",
          "Do **not provide explanations** or excuses. Do not lie.",
          "**Remember the details** of your arrest and write them down as soon as possible.",
        ],
      },
    ],
    importantNumbers: [
      {
        name: "ACLU Know Your Rights",
        url: "https://aclu.org/know-your-rights",
      },
      { name: "Legal Aid", url: "https://lawhelp.org" },
      { name: "Immigration Hotline", url: "tel:1-844-363-1423" },
      { name: "National Lawyers Guild", url: "https://nlg.org" },
    ],
  },
  UK: {
    flag: "🇬🇧",
    name: "United Kingdom",
    title: "Know Your Rights in the United Kingdom 🏛️",
    sections: [
      {
        heading: "🛡️ Your Fundamental Protest Rights",
        points: [
          "You have the right to **peaceful protest** under Article 11 of the European Convention on Human Rights - this is your democratic right.",
          "You have the right to **freedom of expression** under Article 10 - your voice matters and deserves to be heard.",
          "**Police powers** are limited and must be exercised lawfully and proportionately - they cannot act without proper justification.",
          "You have the right to **record police** in public spaces - documenting interactions protects everyone.",
          "**Peaceful assembly** is protected by law, but organizers may need to notify police for large gatherings - this is just administrative, not permission.",
        ],
      },
      {
        heading:
          "🚔 If You Are Stopped by Police (Stay Calm - You Have Rights)",
        points: [
          "Stay **calm and polite** - this protects you and makes the interaction smoother for everyone involved.",
          "Police can **stop and search** you only if they have reasonable grounds for suspicion - you can ask what these grounds are.",
          "You have the right to **know the officer&apos;s name**, station, and reason for the stop - this information is legally required.",
          "You have the right to a **copy of the search record** - always ask for this as it's your legal entitlement.",
          "You do **not have to answer questions** beyond providing your name and address if required - silence is not guilt.",
        ],
      },
      {
        heading: "🔒 Your Rights During Arrest (You Are Protected)",
        points: [
          "Police must tell you that **you are under arrest** and the reason why - this is the law, not optional.",
          "You have the right to **remain silent** - you do not have to answer questions, and this cannot be used against you.",
          "You have the right to **free legal advice** and to have someone told of your arrest - this support is always available to you.",
          "Police can **hold you for up to 24 hours** before charging you (longer only in serious cases) - there are strict time limits protecting you.",
          "You should be given a **written notice** of your rights at the police station - make sure you receive and understand this.",
        ],
      },
      {
        heading: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 UK-Specific Protest Guidance (Know Your Power)",
        points: [
          "**Say &apos;no comment&apos;** to all police questions during casual chats and &apos;booking in&apos; interviews - this protects you legally.",
          "At a police station, you may give your **name, address, and date of birth** to speed up your release, but don&apos;t answer further questions.",
          "**Do not accept a caution** without advice from a recommended solicitor - this is an admission of responsibility and goes on the Police National Computer permanently.",
          "You have the right to **free legal advice** at the police station - duty solicitors don&apos;t always have experience with protest law, so ask to contact a specialist if needed.",
          "**Peaceful protest** is generally lawful in public places - you're exercising a fundamental democratic right.",
          "Police can impose **conditions** on protests to prevent disorder, but these must be reasonable and proportionate.",
          "**Trespass** on private property is generally a civil matter, not criminal - don&apos;t let this intimidate you unnecessarily.",
        ],
      },
    ],
    importantNumbers: [
      { name: "Legal Aid Agency", url: "https://gov.uk/legal-aid" },
      { name: "Citizens Advice", url: "https://citizensadvice.org.uk" },
      {
        name: "Liberty (Human Rights)",
        url: "https://libertyhumanrights.org.uk",
      },
      {
        name: "Green & Black Cross (Protest Support)",
        url: "https://greenandblackcross.org",
      },
      {
        name: "Hodge Jones & Allen (Protest Law Specialists)",
        url: "https://hja.net",
      },
      { name: "Network for Police Monitoring", url: "https://netpol.org" },
    ],
  },
  Germany: {
    flag: "🇩🇪",
    name: "Germany",
    title: "Know Your Rights in Germany",
    sections: [
      {
        heading: "Your Fundamental Rights (Grundrechte)",
        points: [
          "**Article 8** of the Basic Law guarantees freedom of assembly for German citizens.",
          "**Peaceful assembly** without weapons is permitted and protected.",
          "**Non-citizens** also have limited rights to peaceful assembly.",
          "**Prior registration** may be required for public assemblies.",
          "You have the right to **express opinions** freely (Article 5).",
        ],
      },
      {
        heading: "Police Interactions",
        points: [
          "Police must **identify themselves** when asked and show their badge number.",
          "You have the right to **remain silent** beyond providing identification when required.",
          "**ID checks** are permitted in certain circumstances (Personalienfestellung).",
          "Police can **temporarily detain** you (Gewahrsam) for up to 24 hours in some cases.",
          "You have the right to **legal representation** if arrested.",
        ],
      },
      {
        heading: "Assembly and Protest Rights",
        points: [
          "**Outdoor assemblies** generally require prior notification to authorities.",
          "**Spontaneous assemblies** are permitted in response to current events.",
          "Police can **dissolve assemblies** if they become violent or illegal.",
          "**Counter-demonstrations** are also protected but must remain peaceful.",
          "**Banned symbols** (Nazi symbols, etc.) are strictly prohibited.",
        ],
      },
    ],
    importantNumbers: [
      { name: "Legal Aid (Beratungshilfe)", url: "https://beratungshilfe.de" },
      { name: "German Bar Association", url: "https://anwaltverein.de" },
      { name: "Amnesty International Germany", url: "https://amnesty.de" },
      { name: "Pro Asyl (Immigration Issues)", url: "https://proasyl.de" },
    ],
  },
  France: {
    flag: "🇫🇷",
    name: "France",
    title: "Know Your Rights in France",
    sections: [
      {
        heading: "Your Fundamental Rights",
        points: [
          "**Freedom of assembly** is guaranteed by the French Constitution and European Convention.",
          "**Freedom of expression** is protected, but hate speech and incitement to violence are prohibited.",
          "**Peaceful protest** is a fundamental right in the French Republic.",
          "You have the right to **record police** in public spaces (with some limitations).",
        ],
      },
      {
        heading: "Police Interactions (Contrôle d'identité)",
        points: [
          "Police can **check your identity** in certain circumstances without specific suspicion.",
          "You must **carry valid ID** (French citizens) or passport/residence permit (foreigners).",
          "You have the right to **remain silent** beyond providing identification.",
          "Police cannot **search you** without reasonable grounds or your consent.",
          "**Garde à vue** (police custody) can last up to 24 hours for most offenses.",
        ],
      },
      {
        heading: "Protest Rights",
        points: [
          "**Declaration requirement**: Most public demonstrations must be declared to authorities 3-15 days in advance.",
          "**Spontaneous gatherings** may be permitted in exceptional circumstances.",
          "Police can **prohibit demonstrations** if they pose a threat to public order.",
          "**Face coverings** are generally prohibited during protests.",
          "**Violence or property damage** can lead to immediate arrest and prosecution.",
        ],
      },
    ],
    importantNumbers: [
      {
        name: "Legal Aid (Aide juridictionnelle)",
        url: "https://justice.gouv.fr",
      },
      {
        name: "French Human Rights League (LDH)",
        url: "https://ldh-france.org",
      },
      { name: "SOS Racisme", url: "https://sos-racisme.org" },
      {
        name: "Lawyers without Borders",
        url: "https://avocatssansfrontieres.org",
      },
    ],
  },
  Canada: {
    flag: "🇨🇦",
    name: "Canada",
    title: "Know Your Rights in Canada",
    sections: [
      {
        heading: "Your Charter Rights",
        points: [
          "**Section 2(c)** of the Charter protects freedom of peaceful assembly.",
          "**Section 2(b)** protects freedom of thought, belief, opinion and expression.",
          "These rights are **subject to reasonable limits** as prescribed by law.",
          "**Provincial and municipal** laws may impose additional restrictions.",
        ],
      },
      {
        heading: "Police Interactions",
        points: [
          "You have the right to **remain silent** and not answer questions (except identifying yourself when required).",
          "Police must inform you of your **right to counsel** upon arrest.",
          "You have the right to **speak to a lawyer** without delay upon arrest.",
          "Police need **reasonable grounds** to search you or your belongings.",
          "You have the right to **know why** you're being arrested or detained.",
        ],
      },
      {
        heading: "Protest and Assembly Rights",
        points: [
          "**Peaceful protest** is generally protected on public property.",
          "**Permits may be required** for large gatherings or use of sound equipment.",
          "**Trespassing** on private property is not protected expression.",
          "**Blocking traffic** or obstructing others may not be protected.",
          "**Hate speech** and incitement to violence are not protected forms of expression.",
        ],
      },
    ],
    importantNumbers: [
      {
        name: "Legal Aid Ontario (varies by province)",
        url: "https://legalaid.on.ca",
      },
      { name: "Canadian Civil Liberties Association", url: "https://ccla.org" },
      { name: "British Columbia Civil Liberties", url: "https://bccla.org" },
      { name: "Canadian Bar Association", url: "https://cba.org" },
    ],
  },
  Australia: {
    flag: "🇦🇺",
    name: "Australia",
    title: "Know Your Rights in Australia",
    sections: [
      {
        heading: "Your Fundamental Rights",
        points: [
          "**Freedom of assembly** and **freedom of expression** are implied rights in the Australian Constitution.",
          "**Peaceful protest** is generally protected, but subject to reasonable restrictions.",
          "**State and territory** laws govern most protest activities.",
          "You have the right to **record police** in public spaces in most jurisdictions.",
        ],
      },
      {
        heading: "Police Interactions",
        points: [
          "You have the right to **remain silent** (except when required to provide identification).",
          "Police can **request identification** in certain circumstances (varies by state).",
          "You have the right to **ask if you&apos;re free to leave**.",
          "Police need **reasonable suspicion** to search you in most circumstances.",
          "You have the right to **legal representation** and a phone call upon arrest.",
        ],
      },
      {
        heading: "Protest Rights (varies by state)",
        points: [
          "**Permits or notifications** may be required for large public assemblies.",
          "**Blocking roads or disrupting traffic** may result in arrest.",
          "**Trespassing** on private property is generally not protected.",
          "**Move-on directions** from police must generally be obeyed.",
          "**Summary offenses** related to protests can result in fines or arrest.",
        ],
      },
    ],
    importantNumbers: [
      { name: "National Legal Aid", url: "https://nationallegalaid.org" },
      {
        name: "Australian Human Rights Commission",
        url: "https://humanrights.gov.au",
      },
      { name: "NSW Council for Civil Liberties", url: "https://nswccl.org.au" },
      { name: "Victoria Legal Aid", url: "https://legalaid.vic.gov.au" },
    ],
  },
};

type Country = keyof typeof countryRights;

export default function KnowYourRightsPage() {
  const [selectedCountry, setSelectedCountry] = useState<Country>("UK");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentRights = countryRights[selectedCountry];

  const generatePrintableContent = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Know Your Rights - ${currentRights.name} | Advocado</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 20px;
              color: #333;
              background: white;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #68D466;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 32px;
              font-weight: bold;
              color: #68D466;
              margin-bottom: 10px;
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .subtitle {
              font-size: 16px;
              color: #666;
              margin-bottom: 20px;
            }
            .section {
              margin-bottom: 25px;
              break-inside: avoid;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #68D466;
              margin-bottom: 10px;
              border-bottom: 1px solid #e0e0e0;
              padding-bottom: 5px;
            }
            .point {
              margin-bottom: 8px;
              padding-left: 15px;
              position: relative;
              font-size: 14px;
            }
            .point::before {
              content: "•";
              color: #68D466;
              font-weight: bold;
              position: absolute;
              left: 0;
            }
            .strong {
              font-weight: bold;
            }
            .resources {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #68D466;
            }
            .resource {
              margin-bottom: 5px;
              font-size: 12px;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 12px;
              color: #666;
              border-top: 1px solid #e0e0e0;
              padding-top: 20px;
            }
            .qr-section {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 20px;
              margin: 20px 0;
            }
            .qr-code {
              width: 80px;
              height: 80px;
            }
            .website-info {
              text-align: center;
            }
            @media print {
              body {
                font-size: 12px;
              }
              .header {
                margin-bottom: 20px;
              }
              .section {
                margin-bottom: 15px;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">⚖️ Advocado</div>
            <div class="title">${currentRights.title}</div>
            <div class="subtitle">Protest Rights Quick Reference</div>
          </div>
          
          ${currentRights.sections
            .map(
              (section) => `
            <div class="section">
              <div class="section-title">${section.heading.replace(/[🛡️🚔🔒🏴󠁧󠁢󠁥󠁮󠁧󠁿]/g, "").trim()}</div>
              ${section.points
                .map(
                  (point) => `
                <div class="point">${point.replace(/\*\*(.*?)\*\*/g, '<span class="strong">$1</span>')}</div>
              `,
                )
                .join("")}
            </div>
          `,
            )
            .join("")}
          
          <div class="resources">
            <div class="section-title">📞 Important Resources & Contacts</div>
            ${currentRights.importantNumbers
              .map(
                (resource) => `
              <div class="resource">• ${resource.name}: ${resource.url.replace("https://", "").replace("tel:", "")}</div>
            `,
              )
              .join("")}
          </div>
          
          <div class="footer">
            <div class="qr-section">
              <img src="/qr-code.png" alt="Advocado QR Code" class="qr-code" />
              <div class="website-info">
                <div><strong>advocado.uk</strong></div>
                <div>For more legal resources</div>
              </div>
            </div>
            <div>This information is for general guidance only. Always consult with a qualified legal professional for specific legal situations.</div>
            <div style="margin-top: 10px;">© 2024 Advocado. All rights reserved.</div>
          </div>
        </body>
      </html>
    `;

    return printContent;
  };

  const handlePrint = () => {
    const printContent = generatePrintableContent();
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Country Selector */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex w-64 items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left shadow-sm hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {countryRights[selectedCountry].flag}
                  </span>
                  <span className="font-medium text-gray-900">
                    {countryRights[selectedCountry].name}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full right-0 left-0 z-10 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg">
                  {Object.entries(countryRights).map(([code, country]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setSelectedCountry(code as Country);
                        setIsDropdownOpen(false);
                      }}
                      className="flex w-full items-center space-x-3 px-4 py-3 text-left transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <span className="font-medium text-gray-900">
                        {country.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center justify-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm transition-colors hover:border-[#68D466] hover:bg-green-50 focus:border-[#68D466] focus:ring-2 focus:ring-[#68D466] focus:outline-none"
            >
              <span className="text-lg">🖨</span>
              <span className="font-medium text-gray-900">
                Print Cheat Sheet
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Country Title */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            {currentRights.title}
          </h1>
          <p className="text-xl text-gray-600">
            Understanding your rights during protests and legal interactions
          </p>
        </div>

        {/* Rights Sections */}
        <Card className="mb-8 border border-gray-200 bg-white shadow-sm">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-xl font-bold text-gray-900">
              Your Legal Rights
            </CardTitle>
            <CardDescription className="text-gray-600">
              Click on each section to expand and learn about your specific
              rights
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <Accordion
              type="multiple"
              defaultValue={["item-0"]}
              className="w-full"
            >
              {currentRights.sections.map((section, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-gray-200"
                >
                  <AccordionTrigger className="rounded-lg px-2 py-4 text-left text-lg font-semibold text-gray-900 hover:bg-gray-50">
                    {section.heading}
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-4">
                    <div className="space-y-3">
                      {section.points.map((point, pointIndex) => (
                        <div
                          key={pointIndex}
                          className="flex items-start space-x-3"
                        >
                          <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#68D466]"></div>
                          <p
                            className="text-base leading-relaxed text-gray-700"
                            dangerouslySetInnerHTML={{
                              __html: point.replace(
                                /\*\*(.*?)\*\*/g,
                                '<strong class="font-semibold text-gray-900">$1</strong>',
                              ),
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Important Numbers/Resources */}
        <Card className="mb-8 border border-gray-200 bg-white shadow-sm">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-xl font-bold text-gray-900">
              📞 Important Resources & Contacts
            </CardTitle>
            <CardDescription className="text-gray-600">
              Keep these resources handy for legal assistance and support
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {currentRights.importantNumbers.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 rounded-lg bg-gray-100 p-3 transition-colors hover:bg-gray-200"
                >
                  <span className="text-sm text-gray-800 hover:text-blue-600">
                    {resource.name}
                  </span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Need Legal Assistance Section */}
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader className="px-6 pt-6 text-center">
            <CardTitle className="text-xl font-bold text-gray-900">
              Need Professional Legal Assistance?
            </CardTitle>
            <CardDescription className="text-gray-600">
              If you&apos;re facing legal issues, it&apos;s important to consult
              with qualified legal professionals who can provide advice specific
              to your situation and jurisdiction.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 text-center">
            <Badge
              variant="secondary"
              className="bg-gray-200 text-sm text-gray-800"
            >
              Connect with pro-bono lawyers and legal aid organizations in your
              region
            </Badge>
          </CardContent>
        </Card>
      </main>

      {/* Small Legal Disclaimer */}
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-2 rounded-lg bg-gray-100 p-3 text-xs text-gray-500">
          <AlertTriangle className="h-3 w-3 flex-shrink-0 text-gray-400" />
          <span>
            This information is for general guidance only and does not
            constitute legal advice. Always consult with a qualified legal
            professional for specific legal situations.
          </span>
        </div>
      </div>
    </div>
  );
}
