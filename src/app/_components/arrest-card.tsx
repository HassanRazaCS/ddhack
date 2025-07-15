interface ArrestCardProps {
  icon: string;
  title: string;
  items: string[];
  importantNumbers: Array<{
    label: string;
    info: string;
  }>;
  variant: 'rose';
  className?: string;
}

const variantStyles = {
  rose: {
    border: 'border-rose-200 hover:border-rose-300',
    shadow: 'hover:shadow-rose-100',
    iconBg: 'bg-rose-100 text-rose-600',
    title: 'text-rose-800',
    bullet: 'text-rose-500',
  },
};

export function ArrestCard({ icon, title, items, importantNumbers, variant, className = "" }: ArrestCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className={`group bg-white rounded-xl p-8 border ${styles.border} transition-all duration-300 hover:shadow-lg ${styles.shadow} shadow-sm ${className}`}>
      <div className="flex items-center mb-6">
        <div className={`w-12 h-12 ${styles.iconBg} rounded-lg flex items-center justify-center mr-4`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <h2 className={`text-2xl font-bold ${styles.title}`}>{title}</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ul className="space-y-3 text-gray-700">
            {items.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className={`${styles.bullet} mr-3 mt-1 font-bold`}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-2">📞</span>
            <h3 className="font-bold text-amber-800">Important Numbers</h3>
          </div>
          <ul className="text-sm text-gray-700 space-y-2">
            {importantNumbers.map((number, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                <strong className="text-amber-700">{number.label}:</strong> {number.info}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
