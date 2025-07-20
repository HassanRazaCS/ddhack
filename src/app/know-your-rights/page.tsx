"use client";

import { useState } from "react";
import { AlertTriangle, Phone, ExternalLink, ChevronDown } from "lucide-react";
import Link from "next/link";

// Shadcn UI components
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Badge } from "~/components/ui/badge";

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
    flag: "🇬🇧",
    name: "United Kingdom",
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
      "Legal Aid: beratungshilfe.de",
      "German Bar Association: anwaltverein.de",
      "Amnesty International Germany: amnesty.de",
      "Pro Asyl (for immigration issues): proasyl.de",
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
      "Legal Aid (Aide juridictionnelle): justice.gouv.fr",
      "French Human Rights League (LDH): ldh-france.org",
      "SOS Racisme: sos-racisme.org",
      "Lawyers without Borders: avocatssansfrontieres.org",
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
      "Legal Aid: legalaid.on.ca (varies by province)",
      "Canadian Civil Liberties Association: ccla.org",
      "British Columbia Civil Liberties: bccla.org",
      "Canadian Bar Association: cba.org",
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentRights = countryRights[selectedCountry];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold text-gray-900">Know Your Rights</h1>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                ← Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Country Selector */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <h2 className="text-lg font-semibold text-gray-900">Select Your Country:</h2>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-64 px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{countryRights[selectedCountry].flag}</span>
                  <span className="font-medium text-gray-900">{countryRights[selectedCountry].name}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {Object.entries(countryRights).map(([code, country]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setSelectedCountry(code as Country);
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <span className="font-medium text-gray-900">{country.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Country Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{currentRights.title}</h1>
          <p className="text-xl text-gray-600">Understanding your rights during protests and legal interactions</p>
        </div>

        {/* Rights Sections */}
        <Card className="mb-8 bg-white border border-gray-200 shadow-sm">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-xl font-bold text-gray-900">Your Legal Rights</CardTitle>
            <CardDescription className="text-gray-600">
              Click on each section to expand and learn about your specific rights
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <Accordion type="multiple" defaultValue={["item-0"]} className="w-full">
              {currentRights.sections.map((section, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                  <AccordionTrigger className="text-left py-4 hover:bg-gray-50 rounded-lg px-2 font-semibold text-gray-900">
                    {section.heading}
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-4">
                    <div className="space-y-3">
                      {section.points.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                          <p 
                            className="text-sm leading-relaxed text-gray-700"
                            dangerouslySetInnerHTML={{
                              __html: point.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
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
        <Card className="mb-8 bg-white border border-gray-200 shadow-sm">
          <CardHeader className="px-6 pt-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-xl font-bold text-gray-900">Important Resources & Contacts</CardTitle>
            </div>
            <CardDescription className="text-gray-600">
              Keep these resources handy for legal assistance and support
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentRights.importantNumbers.map((resource, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-gray-100 rounded-lg">
                  <ExternalLink className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span className="text-sm text-gray-800">{resource}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Need Legal Assistance Section */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="text-center px-6 pt-6">
            <CardTitle className="text-xl font-bold text-gray-900">Need Professional Legal Assistance?</CardTitle>
            <CardDescription className="text-gray-600">
              If you're facing legal issues, it's important to consult with qualified legal professionals 
              who can provide advice specific to your situation and jurisdiction.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center px-6 pb-6">
            <Badge variant="secondary" className="text-sm bg-gray-200 text-gray-800">
              Connect with pro-bono lawyers and legal aid organizations in your region
            </Badge>
          </CardContent>
        </Card>
      </main>

      {/* Small Legal Disclaimer */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 bg-gray-100 rounded-lg p-3">
          <AlertTriangle className="h-3 w-3 text-gray-400 flex-shrink-0" />
          <span>
            This information is for general guidance only and does not constitute legal advice. 
            Always consult with a qualified legal professional for specific legal situations.
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                © 2025 Know Your Rights. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="#" className="text-gray-500 hover:text-gray-700">Full Legal Disclaimer</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="#" className="text-gray-500 hover:text-gray-700">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
