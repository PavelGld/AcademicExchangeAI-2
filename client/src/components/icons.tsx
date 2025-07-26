interface IconProps {
  className?: string;
  size?: number;
}

export const GraduationCapIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12 3l9 4-9 4-9-4 9-4z" fill="currentColor"/>
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" fill="currentColor"/>
    <path d="M12 11l7-3.82v4L12 15l-7-3.82v-4L12 11z" fill="currentColor" opacity="0.6"/>
  </svg>
);

