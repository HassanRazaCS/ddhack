import Link from "next/link";

export default function KnowYourRightsPage() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen">
      <header className="bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <span className="text-3xl">⚖️</span>
            </div>
            <h1 className="text-5xl font-bold text-white">
              Know Your Rights
            </h1>
            <p className="text-xl mt-3 text-emerald-100 max-w-2xl mx-auto">
              Knowledge is power. Understand your rights to stay safe and make your voice heard in peaceful demonstrations.
            </p>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="group bg-gradient-to-br from-blue-800/50 to-blue-900/50 backdrop-blur-sm rounded-xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📜</span>
              </div>
              <h2 className="text-2xl font-bold text-blue-200">Your Fundamental Rights</h2>
            </div>
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 mt-1">•</span>
                The First Amendment protects your right to assemble and express your views through protest.
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 mt-1">•</span>
                Your rights are strongest in "traditional public forums" like streets, sidewalks, and parks.
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 mt-1">•</span>
                You have the right to photograph or videotape anything in plain view in a public space.
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 mt-1">•</span>
                Counter-protesters also have free speech rights. Police must treat both groups equally.
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3 mt-1">•</span>
                You do not need a permit to march on streets or sidewalks if you don't obstruct traffic.
              </li>
            </ul>
          </div>
          
          <div className="group bg-gradient-to-br from-purple-800/50 to-purple-900/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">👮</span>
              </div>
              <h2 className="text-2xl font-bold text-purple-200">If You Are Stopped by Police</h2>
            </div>
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">•</span>
                Stay calm and keep your hands visible. Do not argue, resist, or obstruct the police.
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">•</span>
                Ask "Am I free to leave?" If the officer says yes, calmly walk away.
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">•</span>
                If you are under arrest, you have a right to ask why.
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">•</span>
                State that you wish to remain silent and ask for a lawyer immediately.
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">•</span>
                You do not have to consent to a search of yourself or your belongings.
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-3 mt-1">•</span>
                Police cannot confiscate or view your photos/videos without a warrant.
              </li>
            </ul>
          </div>
          
          <div className="group bg-gradient-to-br from-orange-800/50 to-red-900/50 backdrop-blur-sm rounded-xl p-8 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h2 className="text-2xl font-bold text-orange-200">If ICE Approaches You</h2>
            </div>
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-start">
                <span className="text-orange-400 mr-3 mt-1">•</span>
                You have the right to remain silent. You do not have to answer questions about your immigration status.
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-3 mt-1">•</span>
                You do not have to consent to a search of yourself or your belongings.
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-3 mt-1">•</span>
                If you are not a U.S. citizen, carry your immigration documents with you if you have them.
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-3 mt-1">•</span>
                You have the right to an attorney, but the government does not have to provide one for immigration cases.
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-3 mt-1">•</span>
                Do not lie about your status or provide false documents.
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-3 mt-1">•</span>
                If detained, ask to call a lawyer or your consulate immediately.
              </li>
            </ul>
          </div>
          
          <div className="group bg-gradient-to-br from-teal-800/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-8 border border-teal-500/30 hover:border-teal-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h2 className="text-2xl font-bold text-teal-200">At Your Home</h2>
            </div>
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-start">
                <span className="text-teal-400 mr-3 mt-1">•</span>
                Do not open the door if law enforcement doesn't have a warrant signed by a judge.
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-3 mt-1">•</span>
                Ask to see the warrant through a window or ask them to slide it under the door.
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-3 mt-1">•</span>
                A warrant must have your correct name and address on it.
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-3 mt-1">•</span>
                If they have a warrant, you can still say you do not consent to any search beyond what is on the warrant.
              </li>
              <li className="flex items-start">
                <span className="text-teal-400 mr-3 mt-1">•</span>
                Everyone in the home has the right to remain silent.
              </li>
            </ul>
          </div>
          
          <div className="group bg-gradient-to-br from-indigo-800/50 to-violet-900/50 backdrop-blur-sm rounded-xl p-8 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📢</span>
              </div>
              <h2 className="text-2xl font-bold text-indigo-200">If Police Order You to Disperse</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
              <li className="flex items-start">
                <span className="text-indigo-400 mr-3 mt-1">•</span>
                Police must have a legitimate reason to issue a dispersal order, such as a clear and present danger of a riot.
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-3 mt-1">•</span>
                They must provide a reasonable opportunity to comply, including a clear exit path and enough time.
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-3 mt-1">•</span>
                You must receive clear, detailed notice of the order before you can be arrested for failing to disperse.
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-3 mt-1">•</span>
                If you believe the order is unlawful, do not resist. Comply and challenge it later in court.
              </li>
            </ul>
          </div>
          
          <div className="group bg-gradient-to-br from-rose-800/50 to-pink-900/50 backdrop-blur-sm rounded-xl p-8 border border-rose-500/30 hover:border-rose-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/20 lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-rose-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🚨</span>
              </div>
              <h2 className="text-2xl font-bold text-rose-200">If You Are Arrested</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-3 mt-1">•</span>
                    Do not resist arrest, even if you believe it is unjust.
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-3 mt-1">•</span>
                    Say you wish to remain silent and that you want a lawyer.
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-3 mt-1">•</span>
                    You have the right to a local phone call. Police cannot listen if you are calling a lawyer.
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-3 mt-1">•</span>
                    Do not provide explanations or excuses. Do not lie.
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 mr-3 mt-1">•</span>
                    Remember the details of your arrest and write them down as soon as possible.
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 p-6 rounded-lg border border-amber-500/30">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-2">📞</span>
                  <h3 className="font-bold text-amber-200">Important Numbers</h3>
                </div>
                <ul className="text-sm text-gray-200 space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                    <strong className="text-amber-300">ACLU:</strong> Know Your Rights Hotline
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                    <strong className="text-amber-300">Legal Aid:</strong> lawhelp.org
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                    <strong className="text-amber-300">Immigration:</strong> 1-844-363-1423
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                    <strong className="text-amber-300">Emergency Contact:</strong> Have ready
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/30">
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-300 text-lg mb-6">
              This information is based on guidelines from the ACLU. For more detailed information, visit the{" "}
              <a 
                href="https://www.aclu.org/know-your-rights/protesters-rights" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-400 hover:text-emerald-300 underline transition-colors"
              >
                ACLU website
              </a>.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 px-8 rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
