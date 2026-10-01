import React, { useState } from 'react';

export const SBSLogo: React.FC<{ className?: string; height?: string }> = ({
  className = '',
  height = 'h-8',
}) => {
  const [imgError, setImgError] = useState(false);

  // Exact hotlinked logo asset from the provided HTML
  const primaryLogoUrl =
    'https://lh3.googleusercontent.com/aida/AEtjO1V8tJ8zDtd5rJw_k2xSKFwssf-c6QYQ5ExnIYZ-B654JmZjlxQjP01JQc96tZiiHz4hi3J3bOEYKSYL6R6Nt_mpYwKei9PFfbnI_nV7MAB8zeEA9ca9MsawWu0GVFDvzj70zBZ2vJqaELD9BDq71Y60rqKgcf0p3HxqrW3eAcMxWMw8ps-Rs-PLcdat6En01q8p4XQP7RkMnHNMZpova22Q06Pll1u502liupz0o6po_S5EagO3PTz_9kM';

  if (imgError) {
    // Exact SVG representation of Image 1 / Image 2
    return (
      <svg
        className={`${height} w-auto object-contain ${className}`}
        viewBox="0 0 240 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="SBS Transit Live Bus Tracker"
      >
        <rect width="240" height="56" rx="14" fill="#39126B" />
        {/* Red circle with white bus icon */}
        <circle cx="36" cy="28" r="18" fill="#DF2E0C" />
        <path
          d="M29 23C29 21.3431 30.3431 20 32 20H40C41.6569 20 43 21.3431 43 23V31C43 32.6569 41.6569 34 40 34H32C30.3431 34 29 32.6569 29 31V23Z"
          fill="white"
        />
        <rect x="31" y="23" width="10" height="4" rx="1" fill="#DF2E0C" />
        <circle cx="32.5" cy="30.5" r="1.5" fill="#DF2E0C" />
        <circle cx="39.5" cy="30.5" r="1.5" fill="#DF2E0C" />
        <path d="M31 34V36M41 34V36" stroke="white" strokeWidth="2" strokeLinecap="round" />
        {/* SBS Transit text */}
        <text
          x="68"
          y="27"
          fill="white"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
          fontSize="18"
          letterSpacing="-0.5"
        >
          SBS
        </text>
        <text
          x="110"
          y="27"
          fill="#FF7A66"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
          fontSize="18"
          letterSpacing="-0.5"
        >
          Transit
        </text>
        {/* LIVE BUS TRACKER subtitle */}
        <text
          x="68"
          y="42"
          fill="rgba(255, 255, 255, 0.9)"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
          fontSize="9.5"
          letterSpacing="2.5"
        >
          LIVE BUS TRACKER
        </text>
      </svg>
    );
  }

  return (
    <img
      src={primaryLogoUrl}
      alt="SBS Transit Live Bus Tracker Logo"
      className={`${height} w-auto object-contain ${className}`}
      onError={() => setImgError(true)}
    />
  );
};
