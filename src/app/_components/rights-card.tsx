interface RightsCardProps {
  icon: string;
  title: string;
  items: string[];
  variant: 'blue' | 'purple' | 'orange' | 'teal' | 'indigo' | 'rose';
  className?: string;
  useGrid?: boolean;
}

const variantStyles = {
  blue: {
    border: 'border-blue-200 hover:border-blue-300',
    shadow: 'hover:shadow-blue-100',
    iconBg: 'bg-blue-100 text-blue-600',
    title: 'text-blue-800',
    bullet: 'text-blue-500',
  },
  purple: {
    border: 'border-purple-200 hover:border-purple-300',
    shadow: 'hover:shadow-purple-100',
    iconBg: 'bg-purple-100 text-purple-600',
    title: 'text-purple-800',
    bullet: 'text-purple-500',
  },
  orange: {
    border: 'border-orange-200 hover:border-orange-300',
    shadow: 'hover:shadow-orange-100',
    iconBg: 'bg-orange-100 text-orange-600',
    title: 'text-orange-800',
    bullet: 'text-orange-500',
  },
  teal: {
    border: 'border-teal-200 hover:border-teal-300',
    shadow: 'hover:shadow-teal-100',
    iconBg: 'bg-teal-100 text-teal-600',
    title: 'text-teal-800',
    bullet: 'text-teal-500',
  },
  indigo: {
    border: 'border-indigo-200 hover:border-indigo-300',
    shadow: 'hover:shadow-indigo-100',
    iconBg: 'bg-indigo-100 text-indigo-600',
    title: 'text-indigo-800',
    bullet: 'text-indigo-500',
  },
  rose: {
    border: 'border-rose-200 hover:border-rose-300',
    shadow: 'hover:shadow-rose-100',
    iconBg: 'bg-rose-100 text-rose-600',
    title: 'text-rose-800',
    bullet: 'text-rose-500',
  },
};

export function RightsCard({ icon, title, items, variant, className = "", useGrid = false }: RightsCardProps) {
  const styles = variantStyles[variant];
  const listClassName = useGrid ? "grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700" : "space-y-3 text-gray-700";

  return (
    <div className={`group bg-white rounded-xl p-8 border ${styles.border} transition-all duration-300 hover:shadow-lg ${styles.shadow} shadow-sm ${className}`}>
      <div className="flex items-center mb-6">
        <div className={`w-12 h-12 ${styles.iconBg} rounded-lg flex items-center justify-center mr-4`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <h2 className={`text-2xl font-bold ${styles.title}`}>{title}</h2>
      </div>
      <ul className={listClassName}>
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className={`${styles.bullet} mr-3 mt-1 font-bold`}>•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
