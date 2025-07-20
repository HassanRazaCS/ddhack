"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, Phone, ExternalLink } from "lucide-react";
import Link from "next/link";

// Country rights data structure
const countryRights = {
  US: {
    title: "Know Your Rights in the United States",
    sections: [
      {
        heading: "Your Fundamental Rights (First Amendment)",
        points: [
          "You have the right to **peacefully assemble** and express your views through protest.",
          "You have the right to **free speech**, even if it's unpopular or controversial.",
          "Your rights are strongest in **traditional public forums** like streets, sidewalks, and parks.",
          "You have the right to **photograph or videotape** anything in plain view in a public space.",
          "**Counter-protesters** also have free speech rights. Police must treat both groups equally.",
          "You do **not need a permit** to march on streets or sidewalks if you don't obstruct traffic.",
        ],
      },
      {
        heading: "If You Are Stopped by Police",
        points: [
          "**Stay calm** and keep your hands visible. Do not argue, resist, or obstruct the police.",
          "Ask **'Am I free to leave?'** If the officer says yes, calmly walk away.",
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
          "You have the right to **an attorney**, but government doesn't provide one for immigration cases.",
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
      "ACLU Know Your Rights Hotline: aclu.org/know-your-rights",
      "Legal Aid: lawhelp.org",
      "Immigration Hotline: 1-844-363-1423",
      "National Lawyers Guild: nlg.org",
    ],
  },
  UK: {
    title: "Know Your Rights in the United Kingdom",
    sections: [
      {
        heading: "Your Fundamental Rights",
        points: [
          "You have the right to **peaceful protest** under Article 11 of the European Convention on Human Rights.",
          "You have the right to **freedom of expression** under Article 10.",
          "**Police powers** are limited and must be exercised lawfully and proportionately.",
          "You have the right to **record police** in public spaces.",
          "**Peaceful assembly** is protected, but organizers may need to notify police for large gatherings.",
        ],
      },
      {
        heading: "If You Are Stopped by Police",
        points: [
          "Police can **stop and search** you if they have reasonable grounds for suspicion.",
          "You have the right to **know the officer's name**, station, and reason for the stop.",
          "You have the right to a **copy of the search record**.",
          "Stay **calm and cooperative** but you can ask questions about the search.",
          "You do **not have to answer questions** beyond providing your name and address if required.",
        ],
      },
      {
        heading: "Your Rights During Arrest",
        points: [
          "Police must tell you that **you are under arrest** and the reason why.",
          "You have the right to **remain silent** (you do not have to answer questions).",
          "You have the right to **free legal advice** and to have someone told of your arrest.",
          "Police can **hold you for up to 24 hours** before charging you (longer in serious cases).",
          "You should be given a **written notice** of your rights at the police station.",
        ],
      },
      {
        heading: "Protest-Specific Rights",
        points: [
          "**Peaceful protest** is generally lawful in public places.",
          "Police can impose **conditions** on protests to prevent disorder, damage, or disruption.",
          "**Trespass** on private property is generally a civil matter, not criminal.",
          "**Obstruction of the highway** can be an offense if it's unreasonable.",
        ],
      },
    ],
    importantNumbers: [
      "Legal Aid Agency: gov.uk/legal-aid",
      "Citizens Advice: citizensadvice.org.uk",
      "Liberty (Human Rights): libertyhumanrights.org.uk",
      "Green & Black Cross (Protest Support): greenandblackcross.org",
    ],
  },
  Germany: {
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
      "Legal Aid: beratungshilfe.de",
      "German Bar Association: anwaltverein.de",
      "Amnesty International Germany: amnesty.de",
      "Pro Asyl (for immigration issues): proasyl.de",
    ],
  },
  France: {
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
      "Legal Aid (Aide juridictionnelle): justice.gouv.fr",
      "French Human Rights League (LDH): ldh-france.org",
      "SOS Racisme: sos-racisme.org",
      "Lawyers without Borders: avocatssansfrontieres.org",
    ],
  },
  Canada: {
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
      "Legal Aid: legalaid.on.ca (varies by province)",
      "Canadian Civil Liberties Association: ccla.org",
      "British Columbia Civil Liberties: bccla.org",
      "Canadian Bar Association: cba.org",
    ],
  },
  Australia: {
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
          "You have the right to **ask if you're free to leave**.",
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
      "Legal Aid: nationallegalaid.org",
      "Australian Human Rights Commission: humanrights.gov.au",
      "NSW Council for Civil Liberties: nswccl.org.au",
      "Victoria Legal Aid: legalaid.vic.gov.au",
    ],
  },
};

type Country = keyof typeof countryRights;

export default function KnowYourRightsPage() {
  const [selectedCountry, setSelectedCountry] = useState<Country>('US');
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const currentRights = countryRights[selectedCountry];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Global Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-9m3 9l3-9" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Legal Compass</h1>
            </div>
            
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Country Selector */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Select Your Country:</h2>
            <div className="flex flex-wrap gap-2">
              {Object.keys(countryRights).map((country) => (
                <button
                  key={country}
                  onClick={() => {
                    setSelectedCountry(country as Country);
                    setExpandedSections(new Set([0])); // Reset to first section expanded
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCountry === country
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Legal Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 mb-2">Important Legal Disclaimer</h3>
              <p className="text-amber-700 text-sm leading-relaxed">
                This information is for general guidance only and does not constitute legal advice. 
                Laws and procedures can change frequently and vary by jurisdiction. Always consult 
                with a qualified legal professional for specific legal situations.
              </p>
            </div>
          </div>
        </div>

        {/* Country Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentRights.title}</h1>
          <p className="text-gray-600">Understanding your rights during protests and legal interactions</p>
        </div>

        {/* Rights Sections */}
        <div className="space-y-4 mb-8">
          {currentRights.sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-xl font-semibold text-gray-900">{section.heading}</h2>
                {expandedSections.has(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {expandedSections.has(index) && (
                <div className="px-6 pb-6">
                  <ul className="space-y-3">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                        <p 
                          className="text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: point.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Important Numbers/Resources */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Phone className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-blue-900">Important Resources & Contacts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentRights.importantNumbers.map((resource, index) => (
              <div key={index} className="flex items-center space-x-2">
                <ExternalLink className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-blue-800 text-sm">{resource}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Need Legal Assistance Section */}
        <div className="text-center mt-8 bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Need Professional Legal Assistance?</h3>
          <p className="text-gray-600 mb-4">
            If you're facing legal issues, it's important to consult with qualified legal professionals 
            who can provide advice specific to your situation and jurisdiction.
          </p>
          <div className="text-sm text-gray-500">
            Connect with pro-bono lawyers and legal aid organizations in your region.
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                © 2025 Legal Compass. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Full Legal Disclaimer
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
