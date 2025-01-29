import React from 'react';

// BMW Logo
export function BMWIcon(props) {
  return (
    <svg viewBox="0 0 498.503 498.503" {...props}>
      <path fill="currentColor" d="M249.251 498.503c66.577 0 129.168-25.928 176.247-73.005 47.077-47.078 73.005-109.67 73.005-176.247 0-66.576-25.928-129.168-73.005-176.246C378.42 25.927 315.828 0 249.251 0 111.813 0 0 111.813 0 249.251c0 66.577 25.927 129.169 73.005 176.247 47.078 47.077 109.67 73.005 176.246 73.005z"/>
      <path fill="#fff" d="M249.251 18.541c-127.416 0-230.71 103.294-230.71 230.71s103.294 230.711 230.71 230.711c127.416 0 230.71-103.295 230.71-230.711s-103.294-230.71-230.71-230.71z"/>
      <path fill="currentColor" d="M111.362 249.251h137.889V111.362c-76.153 0-137.889 61.737-137.889 137.889zm137.889 0v137.89c76.153 0 137.889-61.736 137.889-137.89H249.251z"/>
    </svg>
  );
}

// Mercedes Logo
export function MercedesIcon(props) {
  return (
    <svg viewBox="0 0 2500 2500" {...props}>
      <path fill="currentColor" d="M1250,0C559.644,0,0,559.644,0,1250s559.644,1250,1250,1250s1250-559.644,1250-1250S1940.356,0,1250,0z M1250,2357.143 c-611.139,0-1107.143-496.004-1107.143-1107.143S638.861,142.857,1250,142.857S2357.143,638.861,2357.143,1250 S1861.139,2357.143,1250,2357.143z M1250,357.143c-494.772,0-892.857,398.085-892.857,892.857h178.571 c0-394.345,320.084-714.286,714.286-714.286s714.286,319.94,714.286,714.286h178.571C2142.857,755.228,1744.772,357.143,1250,357.143z"/>
    </svg>
  );
}

// Audi Logo
export function AudiIcon(props) {
  return (
    <svg viewBox="0 0 2500 2500" {...props}>
      <circle fill="currentColor" cx="500" cy="1250" r="500"/>
      <circle fill="currentColor" cx="1250" cy="1250" r="500"/>
      <circle fill="currentColor" cx="2000" cy="1250" r="500"/>
    </svg>
  );
}

// Porsche Logo
export function PorscheIcon(props) {
  return (
    <svg viewBox="0 0 2500 2500" {...props}>
      <path fill="currentColor" d="M1250,0C559.644,0,0,559.644,0,1250s559.644,1250,1250,1250s1250-559.644,1250-1250S1940.356,0,1250,0z M1250,2357.143 c-611.139,0-1107.143-496.004-1107.143-1107.143S638.861,142.857,1250,142.857S2357.143,638.861,2357.143,1250 S1861.139,2357.143,1250,2357.143z"/>
      <path fill="currentColor" d="M1785.714,892.857H714.286v714.286h1071.429V892.857z M892.857,1428.571v-357.143h714.286v357.143H892.857z"/>
    </svg>
  );
}

// Ferrari Logo
export function FerrariIcon(props) {
  return (
    <svg viewBox="0 0 2500 2500" {...props}>
      <path fill="currentColor" d="M1250,0C559.644,0,0,559.644,0,1250s559.644,1250,1250,1250s1250-559.644,1250-1250S1940.356,0,1250,0z M1785.714,1785.714 H714.286V714.286h1071.429V1785.714z"/>
    </svg>
  );
}

// Add other car manufacturer logos similarly...
// Each logo should be a simple SVG that looks good in monochrome
// and works well with the currentColor fill

export function LamborghiniIcon(props) {
  return (
    <svg viewBox="0 0 2500 2500" {...props}>
      <path fill="currentColor" d="M1250,357.143l892.857,892.857H357.143L1250,357.143z M1250,2142.857l-892.857-892.857h1785.714L1250,2142.857z"/>
    </svg>
  );
}

// ... Add remaining car manufacturer logos