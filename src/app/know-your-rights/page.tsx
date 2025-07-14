import Link from "next/link";

export default function KnowYourRightsPage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-800 min-h-screen">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/30 rounded-full mb-4 shadow-lg">
              <span className="text-3xl">⚖️</span>
            </div>
            <h1 className="text-5xl font-bold text-white">
              Know Your Rights
            </h1>
            <p className="text-xl mt-3 text-blue-100 max-w-2xl mx-auto">
              Knowledge is power. Understand your rights to stay safe and make your voice heard in peaceful demonstrations.
            </p>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="group bg-white rounded-xl p-8 border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📜</span>
              </div>
              <h2 className="text-2xl font-bold text-blue-800">Your Fundamental Rights</h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1 font-bold">•</span>
                The First Amendment protects your right to assemble and express your views through protest.
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1 font-bold">•</span>
                Your rights are strongest in "traditional public forums" like streets, sidewalks, and parks.
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1 font-bold">•</span>
                You have the right to photograph or videotape anything in plain view in a public space.
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1 font-bold">•</span>
                Counter-protesters also have free speech rights. Police must treat both groups equally.
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1 font-bold">•</span>
                You do not need a permit to march on streets or sidewalks if you don't obstruct traffic.
              </li>
            </ul>
          </div>
          
          <div className="group bg-white rounded-xl p-8 border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg hover:shadow-purple-100 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">👮</span>
              </div>
              <h2 className="text-2xl font-bold text-purple-800">If You Are Stopped by Police</h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-500 mr-3 mt-1 font-bold">•</span>
                Stay calm and keep your hands visible. Do not argue, resist, or obstruct the police.
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-3 mt-1 font-bold">•</span>
                Ask "Am I free to leave?" If the officer says yes, calmly walk away.
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-3 mt-1 font-bold">•</span>
                If you are under arrest, you have a right to ask why.
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-3 mt-1 font-bold">•</span>
                State that you wish to remain silent and ask for a lawyer immediately.
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-3 mt-1 font-bold">•</span>
                You do not have to consent to a search of yourself or your belongings.
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-3 mt-1 font-bold">•</span>
                Police cannot confiscate or view your photos/videos without a warrant.
              </li>
            </ul>
          </div>
          
          <div className="group bg-white rounded-xl p-8 border border-orange-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg hover:shadow-orange-100 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h2 className="text-2xl font-bold text-orange-800">If ICE Approaches You</h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1 font-bold">•</span>
                You have the right to remain silent. You do not have to answer questions about your immigration status.
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1 font-bold">•</span>
                You do not have to consent to a search of yourself or your belongings.
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1 font-bold">•</span>
                If you are not a U.S. citizen, carry your immigration documents with you if you have them.
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1 font-bold">•</span>
                You have the right to an attorney, but the government does not have to provide one for immigration cases.
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1 font-bold">•</span>
                Do not lie about your status or provide false documents.
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1 font-bold">•</span>
                If detained, ask to call a lawyer or your consulate immediately.
              </li>
            </ul>
          </div>
          
          <div className="group bg-white rounded-xl p-8 border border-teal-200 hover:border-teal-300 transition-all duration-300 hover:shadow-lg hover:shadow-teal-100 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h2 className="text-2xl font-bold text-teal-800">At Your Home</h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1 font-bold">•</span>
                Do not open the door if law enforcement doesn't have a warrant signed by a judge.
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1 font-bold">•</span>
                Ask to see the warrant through a window or ask them to slide it under the door.
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1 font-bold">•</span>
                A warrant must have your correct name and address on it.
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1 font-bold">•</span>
                If they have a warrant, you can still say you do not consent to any search beyond what is on the warrant.
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1 font-bold">•</span>
                Everyone in the home has the right to remain silent.
              </li>
            </ul>
          </div>
          
          <div className="group bg-white rounded-xl p-8 border border-indigo-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100 shadow-sm lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📢</span>
              </div>
              <h2 className="text-2xl font-bold text-indigo-800">If Police Order You to Disperse</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-3 mt-1 font-bold">•</span>
                Police must have a legitimate reason to issue a dispersal order, such as a clear and present danger of a riot.
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-3 mt-1 font-bold">•</span>
                They must provide a reasonable opportunity to comply, including a clear exit path and enough time.
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-3 mt-1 font-bold">•</span>
                You must receive clear, detailed notice of the order before you can be arrested for failing to disperse.
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-3 mt-1 font-bold">•</span>
                If you believe the order is unlawful, do not resist. Comply and challenge it later in court.
              </li>
            </ul>
          </div>
          
          <div className="group bg-white rounded-xl p-8 border border-rose-200 hover:border-rose-300 transition-all duration-300 hover:shadow-lg hover:shadow-rose-100 shadow-sm lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🚨</span>
              </div>
              <h2 className="text-2xl font-bold text-rose-800">If You Are Arrested</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-3 mt-1 font-bold">•</span>
                    Do not resist arrest, even if you believe it is unjust.
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-3 mt-1 font-bold">•</span>
                    Say you wish to remain silent and that you want a lawyer.
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-3 mt-1 font-bold">•</span>
                    You have the right to a local phone call. Police cannot listen if you are calling a lawyer.
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-3 mt-1 font-bold">•</span>
                    Do not provide explanations or excuses. Do not lie.
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-500 mr-3 mt-1 font-bold">•</span>
                    Remember the details of your arrest and write them down as soon as possible.
                  </li>
                </ul>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-2">📞</span>
                  <h3 className="font-bold text-amber-800">Important Numbers</h3>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    <strong className="text-amber-700">ACLU:</strong> Know Your Rights Hotline
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    <strong className="text-amber-700">Legal Aid:</strong> lawhelp.org
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    <strong className="text-amber-700">Immigration:</strong> 1-844-363-1423
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    <strong className="text-amber-700">Emergency Contact:</strong> Have ready
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
    </div>
  );
}
