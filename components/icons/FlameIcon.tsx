import React from 'react';

interface IconProps {
  className?: string;
}

const FlameIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.C14.05 5.02 16 7.46 16 10c0-1 2.043-1.343 2.5-3.5C17.657 5.343 17.657 18.657 17.657 18.657z" />
  </svg>
);

export default FlameIcon;
