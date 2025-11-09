import React from 'react';

interface IconProps {
  className?: string;
}

const FootstepsIcon: React.FC<IconProps> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 21.75H5.25a2.25 2.25 0 0 1-2.25-2.25V15a2.25 2.25 0 0 1 2.25-2.25H9.75a2.25 2.25 0 0 1 2.25 2.25v.75m-4.5 6H12m0 0h1.5a2.25 2.25 0 0 0 2.25-2.25V15a2.25 2.25 0 0 0-2.25-2.25H9.75m4.5 6.75v-1.5a2.25 2.25 0 0 0-2.25-2.25H9.75m4.5 6.75h-4.5m0-6.75h.008v.008H9.75v-.008Zm0 0H9.75m2.25 2.25H12m0 0h4.5m-4.5 0v-3.75m0 3.75V9.75m0 0h1.5a2.25 2.25 0 0 1 2.25 2.25v1.5m-4.5 0h-1.5a2.25 2.25 0 0 0-2.25 2.25v1.5m-4.5 0H6.75m0 0v-1.5a2.25 2.25 0 0 1 2.25-2.25h1.5m-4.5 0h-1.5a2.25 2.25 0 0 0-2.25 2.25v1.5M9 4.5h6a2.25 2.25 0 0 1 2.25 2.25v1.5a2.25 2.25 0 0 1-2.25 2.25H9a2.25 2.25 0 0 1-2.25-2.25v-1.5A2.25 2.25 0 0 1 9 4.5Z" />
</svg>
);

export default FootstepsIcon;
