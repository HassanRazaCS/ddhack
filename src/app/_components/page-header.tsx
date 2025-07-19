interface PageHeaderProps {
  icon: string;
  title: string;
  subtitle: string;
  variant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  textColor?: 'light' | 'dark';
  titleOverride?: string;
}

const variantStyles = {
  primary: {
    iconBg: 'from-purple-500 to-pink-500',
    titleGradient: 'from-purple-400 via-pink-400 to-emerald-400',
  },
  secondary: {
    iconBg: 'from-blue-500 to-indigo-500',
    titleGradient: 'from-blue-400 to-indigo-400',
  },
  info: {
    iconBg: 'from-blue-600 to-blue-700',
    titleGradient: 'from-blue-400 to-blue-600',
  },
  success: {
    iconBg: 'from-green-500 to-emerald-500',
    titleGradient: 'from-green-400 to-emerald-400',
  },
  warning: {
    iconBg: 'from-yellow-500 to-orange-500',
    titleGradient: 'from-yellow-400 to-orange-400',
  },
};

const sizeStyles = {
  sm: {
    iconSize: 'w-12 h-12',
    iconText: 'text-2xl',
    titleText: 'text-2xl',
    subtitleText: 'text-lg',
    spacing: 'mb-3',
  },
  md: {
    iconSize: 'w-16 h-16',
    iconText: 'text-3xl',
    titleText: 'text-3xl',
    subtitleText: 'text-xl',
    spacing: 'mb-4',
  },
  lg: {
    iconSize: 'w-20 h-20',
    iconText: 'text-4xl',
    titleText: 'text-5xl',
    subtitleText: 'text-2xl',
    spacing: 'mb-8',
  },
};

export function PageHeader({ 
  icon, 
  title, 
  subtitle, 
  variant = 'primary', 
  size = 'md',
  textColor = 'light',
  titleOverride
}: PageHeaderProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const subtitleColorClass = textColor === 'light' ? 'text-gray-300' : 'text-blue-100';
  
  // Special handling for the main hero title with multiple gradient words
  const isMainHero = title === "Unite & Organize";
  
  return (
    <div className="text-center">
      <div className={`inline-flex items-center justify-center ${sizeStyle.iconSize} bg-gradient-to-r ${variantStyle.iconBg} rounded-full ${sizeStyle.spacing} shadow-xl`}>
        <span className={sizeStyle.iconText}>{icon}</span>
      </div>
      
      {isMainHero ? (
        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
            Unite
          </span>
          <span className="text-white"> & </span>
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Organize
          </span>
        </h1>
      ) : titleOverride ? (
        <h2 className={titleOverride}>
          {title}
        </h2>
      ) : (
        <h2 className={`${sizeStyle.titleText} font-bold bg-gradient-to-r ${variantStyle.titleGradient} bg-clip-text text-transparent mb-3`}>
          {title}
        </h2>
      )}
      
      <p className={`${sizeStyle.subtitleText} ${subtitleColorClass} max-w-4xl mx-auto leading-relaxed`}>
        {subtitle}
      </p>
    </div>
  );
}
