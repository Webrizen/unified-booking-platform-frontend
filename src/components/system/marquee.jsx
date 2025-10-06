export default function Marquee({ 
  items = [],
  speed = 'medium',
  direction = 'left',
  behavior = 'scroll',
  className = '',
  theme = 'light'
}) {
  // Default offers if no items provided
  const defaultItems = [
    { id: 1, text: '🎉 Get 20% OFF on your first booking!', highlight: true },
    { id: 2, text: '✨ Free cancellation up to 24 hours before check-in' },
    { id: 3, text: '🏨 Book 3 nights, get 1 night FREE!' },
    { id: 4, text: '⭐ Luxury suites now available - Limited time offer' },
    { id: 5, text: '🚗 Free parking included with all bookings' },
    { id: 6, text: '🍽️ Complimentary breakfast for early birds' },
    { id: 7, text: '💼 Business travelers enjoy exclusive discounts' },
    { id: 8, text: '🌴 Summer special: 15% OFF on beachfront properties' },
  ];

  const displayItems = items.length > 0 ? items : defaultItems;

  const speedValues = {
    slow: '10',
    medium: '6',
    fast: '1'
  };

  const themeClasses = {
    light: 'bg-gradient-to-r from-indigo-50 to-blue-50 text-gray-800 border-b border-indigo-100',
    dark: 'bg-gradient-to-r from-gray-800 to-indigo-900 text-white border-b border-gray-700',
    indigo: 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-b border-indigo-500',
  };

  return (
    <div className={`w-full py-3 ${themeClasses[theme]} ${className}`}>
      <marquee
        behavior={behavior}
        direction={direction}
        scrollamount={speedValues[speed]}
        className="flex items-center"
      >
        {displayItems.map((item, index) => (
          <span
            key={item.id || index}
            className="inline-flex items-center mx-8"
          >
            <span className={`text-sm font-medium whitespace-nowrap ${
              item.highlight 
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold' 
                : ''
            }`}>
              {item.text}
            </span>
          </span>
        ))}
      </marquee>
    </div>
  );
}

// Simple Marquee with just text
export function SimpleMarquee({ 
  text = "Special offers available! Book now and save!",
  speed = 'medium',
  direction = 'left',
  className = '',
  theme = 'light'
}) {
  const themeClasses = {
    light: 'bg-indigo-50 text-gray-800 border-b border-indigo-100',
    dark: 'bg-gray-800 text-white border-b border-gray-700',
    indigo: 'bg-indigo-600 text-white border-b border-indigo-500',
  };

  const speedValues = {
    slow: '8',
    medium: '12',
    fast: '16'
  };

  return (
    <div className={`w-full py-2 ${themeClasses[theme]} ${className}`}>
      <marquee
        behavior="scroll"
        direction={direction}
        scrollamount={speedValues[speed]}
        className="text-sm font-medium"
      >
        {text}
      </marquee>
    </div>
  );
}