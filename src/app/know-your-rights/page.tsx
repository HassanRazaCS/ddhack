import Link from "next/link";
import { PageHeader } from "~/app/_components/page-header";
import { RightsCard } from "~/app/_components/rights-card";
import { ArrestCard } from "~/app/_components/arrest-card";
import { LegalRightsChatbot } from "~/app/_components/legal-rights-chatbot";
import { rightsData } from "~/app/_data/rights-data";

export default function KnowYourRightsPage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-800 min-h-screen">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <PageHeader
            icon="⚖️"
            title="Know Your Rights"
            subtitle="Knowledge is power. Understand your rights to stay safe and make your voice heard in peaceful demonstrations."
            variant="info"
            size="lg"
            textColor="dark"
            titleOverride="text-5xl font-bold text-white mb-3"
          />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RightsCard
            icon={rightsData.fundamentalRights.icon}
            title={rightsData.fundamentalRights.title}
            items={rightsData.fundamentalRights.items}
            variant={rightsData.fundamentalRights.variant}
          />
          
          <RightsCard
            icon={rightsData.policeInteraction.icon}
            title={rightsData.policeInteraction.title}
            items={rightsData.policeInteraction.items}
            variant={rightsData.policeInteraction.variant}
          />
          
          <RightsCard
            icon={rightsData.iceInteraction.icon}
            title={rightsData.iceInteraction.title}
            items={rightsData.iceInteraction.items}
            variant={rightsData.iceInteraction.variant}
          />
          
          <RightsCard
            icon={rightsData.homeRights.icon}
            title={rightsData.homeRights.title}
            items={rightsData.homeRights.items}
            variant={rightsData.homeRights.variant}
          />
          
          <RightsCard
            icon={rightsData.dispersalOrder.icon}
            title={rightsData.dispersalOrder.title}
            items={rightsData.dispersalOrder.items}
            variant={rightsData.dispersalOrder.variant}
            className="lg:col-span-2"
            useGrid={true}
          />
          
          <ArrestCard
            icon={rightsData.arrest.icon}
            title={rightsData.arrest.title}
            items={rightsData.arrest.items}
            importantNumbers={rightsData.arrest.importantNumbers}
            variant={rightsData.arrest.variant}
            className="lg:col-span-2"
          />
        </div>
        
        <div className="text-center mt-16 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-600 text-lg mb-6">
              This information is based on guidelines from the ACLU. For more detailed information, visit the{" "}
              <a 
                href="https://www.aclu.org/know-your-rights/protesters-rights" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-700 underline transition-colors font-medium"
              >
                ACLU website
              </a>.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span>🏠</span>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      
      {/* Legal Rights Chatbot */}
      <LegalRightsChatbot />
    </div>
  );
}
