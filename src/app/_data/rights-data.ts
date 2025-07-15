export const rightsData = {
  fundamentalRights: {
    icon: "📜",
    title: "Your Fundamental Rights",
    variant: "blue" as const,
    items: [
      "The First Amendment protects your right to assemble and express your views through protest.",
      "Your rights are strongest in \"traditional public forums\" like streets, sidewalks, and parks.",
      "You have the right to photograph or videotape anything in plain view in a public space.",
      "Counter-protesters also have free speech rights. Police must treat both groups equally.",
      "You do not need a permit to march on streets or sidewalks if you don't obstruct traffic.",
    ],
  },

  policeInteraction: {
    icon: "👮",
    title: "If You Are Stopped by Police",
    variant: "purple" as const,
    items: [
      "Stay calm and keep your hands visible. Do not argue, resist, or obstruct the police.",
      "Ask \"Am I free to leave?\" If the officer says yes, calmly walk away.",
      "If you are under arrest, you have a right to ask why.",
      "State that you wish to remain silent and ask for a lawyer immediately.",
      "You do not have to consent to a search of yourself or your belongings.",
      "Police cannot confiscate or view your photos/videos without a warrant.",
    ],
  },

  iceInteraction: {
    icon: "🛡️",
    title: "If ICE Approaches You",
    variant: "orange" as const,
    items: [
      "You have the right to remain silent. You do not have to answer questions about your immigration status.",
      "You do not have to consent to a search of yourself or your belongings.",
      "If you are not a U.S. citizen, carry your immigration documents with you if you have them.",
      "You have the right to an attorney, but the government does not have to provide one for immigration cases.",
      "Do not lie about your status or provide false documents.",
      "If detained, ask to call a lawyer or your consulate immediately.",
    ],
  },

  homeRights: {
    icon: "🏠",
    title: "At Your Home",
    variant: "teal" as const,
    items: [
      "Do not open the door if law enforcement doesn't have a warrant signed by a judge.",
      "Ask to see the warrant through a window or ask them to slide it under the door.",
      "A warrant must have your correct name and address on it.",
      "If they have a warrant, you can still say you do not consent to any search beyond what is on the warrant.",
      "Everyone in the home has the right to remain silent.",
    ],
  },

  dispersalOrder: {
    icon: "📢",
    title: "If Police Order You to Disperse",
    variant: "indigo" as const,
    items: [
      "Police must have a legitimate reason to issue a dispersal order, such as a clear and present danger of a riot.",
      "They must provide a reasonable opportunity to comply, including a clear exit path and enough time.",
      "You must receive clear, detailed notice of the order before you can be arrested for failing to disperse.",
      "If you believe the order is unlawful, do not resist. Comply and challenge it later in court.",
    ],
  },

  arrest: {
    icon: "🚨",
    title: "If You Are Arrested",
    variant: "rose" as const,
    items: [
      "Do not resist arrest, even if you believe it is unjust.",
      "Say you wish to remain silent and that you want a lawyer.",
      "You have the right to a local phone call. Police cannot listen if you are calling a lawyer.",
      "Do not provide explanations or excuses. Do not lie.",
      "Remember the details of your arrest and write them down as soon as possible.",
    ],
    importantNumbers: [
      { label: "ACLU", info: "Know Your Rights Hotline" },
      { label: "Legal Aid", info: "lawhelp.org" },
      { label: "Immigration", info: "1-844-363-1423" },
      { label: "Emergency Contact", info: "Have ready" },
    ],
  },
};
