import React from 'react';

interface IconProps {
  className?: string;
}

const DumbbellIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 12-7.5 7.5m7.5-7.5-7.5-7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 12h-2.25m21 0h-2.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 16.5v-9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 16.5v-9" />
  </svg>
);

export default DumbbellIcon;
