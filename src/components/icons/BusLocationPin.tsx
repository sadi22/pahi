interface BusLocationPinProps {
  className?: string;
}

export default function BusLocationPin({ className = "w-12 h-12" }: BusLocationPinProps) {
  return (
    <svg 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Location Pin Shape */}
      <path
        d="M24 2C15.163 2 8 9.163 8 18c0 11.25 16 26 16 26s16-14.75 16-26c0-8.837-7.163-16-16-16z"
        fill="#2F6F9F"
      />
      
      {/* Bus Icon Inside Pin */}
      <g transform="translate(24, 18) scale(0.8) translate(-12, -12)">
        {/* Bus Body */}
        <rect x="6" y="8" width="12" height="9" rx="1.5" fill="white" />
        
        {/* Bus Windows */}
        <rect x="7.5" y="9.5" width="4" height="3" rx="0.5" fill="#2F6F9F" />
        <rect x="12.5" y="9.5" width="4" height="3" rx="0.5" fill="#2F6F9F" />
        
        {/* Bus Wheels */}
        <circle cx="9" cy="17.5" r="1.5" fill="#374151" />
        <circle cx="15" cy="17.5" r="1.5" fill="#374151" />
        
        {/* Bus Front Bumper */}
        <rect x="8" y="7" width="8" height="1" rx="0.5" fill="white" opacity="0.8" />
      </g>
      
      {/* Pin Point */}
      <circle cx="24" cy="18" r="2" fill="white" opacity="0.3" />
    </svg>
  );
}
