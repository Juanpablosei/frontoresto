import React from 'react';
import { useThemeColors } from '../../hooks/useThemeColors';

const Background: React.FC = () => {
  const { getBackgroundGradient } = useThemeColors();

  return (
    <div 
      className="fixed inset-0 -z-10"
      style={{ background: getBackgroundGradient() }}
    >
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 100 100&quot;><defs><pattern id=&quot;grain&quot; width=&quot;100&quot; height=&quot;100&quot; patternUnits=&quot;userSpaceOnUse&quot;><circle cx=&quot;50&quot; cy=&quot;50&quot; r=&quot;1&quot; fill=&quot;rgba(255,255,255,0.1)&quot;/></pattern></defs><rect width=&quot;100&quot; height=&quot;100&quot; fill=&quot;url(%23grain)&quot;/></svg>')]"></div>
    </div>
  );
};

export default Background;
