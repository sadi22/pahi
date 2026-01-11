export default function BusIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 64 64" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bus Body */}
      <rect x="12" y="16" width="40" height="32" rx="4" fill="#FDB813" />
      
      {/* Bus Top */}
      <path d="M16 16 C16 12 20 10 32 10 C44 10 48 12 48 16" fill="#FDB813" />
      
      {/* Windows */}
      <rect x="16" y="20" width="12" height="10" rx="1.5" fill="#4A9FD8" opacity="0.9" />
      <rect x="36" y="20" width="12" height="10" rx="1.5" fill="#4A9FD8" opacity="0.9" />
      
      {/* Window Divider */}
      <line x1="32" y1="20" x2="32" y2="30" stroke="#E67E22" strokeWidth="1.5" />
      
      {/* Front Grill */}
      <rect x="16" y="34" width="32" height="8" rx="1" fill="#2C3E50" />
      <line x1="20" y1="36" x2="44" y2="36" stroke="#34495E" strokeWidth="1" />
      <line x1="20" y1="38" x2="44" y2="38" stroke="#34495E" strokeWidth="1" />
      
      {/* Headlights */}
      <circle cx="20" cy="38" r="2" fill="#FFF9C4" />
      <circle cx="44" cy="38" r="2" fill="#FFF9C4" />
      
      {/* Wheels */}
      <g>
        <circle cx="20" cy="48" r="5" fill="#2C3E50" />
        <circle cx="20" cy="48" r="3" fill="#536878" />
        <circle cx="20" cy="48" r="1.5" fill="#7F8C8D" />
      </g>
      <g>
        <circle cx="44" cy="48" r="5" fill="#2C3E50" />
        <circle cx="44" cy="48" r="3" fill="#536878" />
        <circle cx="44" cy="48" r="1.5" fill="#7F8C8D" />
      </g>
      
      {/* Bus Stripes */}
      <rect x="12" y="30" width="40" height="2" fill="#E67E22" />
      
      {/* Side Mirror */}
      <rect x="10" y="24" width="2" height="4" rx="0.5" fill="#2C3E50" />
      <rect x="52" y="24" width="2" height="4" rx="0.5" fill="#2C3E50" />
      
      {/* Door Lines */}
      <line x1="30" y1="34" x2="30" y2="46" stroke="#E67E22" strokeWidth="1" />
      
      {/* Bumper */}
      <rect x="14" y="46" width="36" height="1.5" rx="0.5" fill="#BDC3C7" />
    </svg>
  );
}
