/**
 * Light decorative SVG for the “Where practical AI helps” page hero.
 * Abstract: scattered process fragments → clearer organised path (not a literal scene).
 */
export default function WhereAiHelpsHeroGraphic({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 480 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden
    >
      <defs>
        <linearGradient
          id="where-ai-grad-green"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#007E3A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00A650" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient
          id="where-ai-grad-soft"
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
        >
          <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#007E3A" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      {/* Soft ground wash */}
      <ellipse
        cx="240"
        cy="168"
        rx="180"
        ry="22"
        fill="#007E3A"
        opacity="0.06"
      />

      {/* Left: scattered friction fragments */}
      <rect
        x="28"
        y="48"
        width="52"
        height="36"
        rx="6"
        fill="#e2e8f0"
        stroke="#cbd5e1"
        strokeWidth="1.5"
      />
      <rect
        x="40"
        y="58"
        width="28"
        height="3"
        rx="1.5"
        fill="#94a3b8"
        opacity="0.7"
      />
      <rect
        x="40"
        y="66"
        width="20"
        height="3"
        rx="1.5"
        fill="#94a3b8"
        opacity="0.5"
      />

      <rect
        x="72"
        y="96"
        width="44"
        height="32"
        rx="6"
        fill="#f1f5f9"
        stroke="#cbd5e1"
        strokeWidth="1.5"
        transform="rotate(-8 94 112)"
      />
      <rect
        x="48"
        y="118"
        width="40"
        height="28"
        rx="5"
        fill="#e2e8f0"
        stroke="#cbd5e1"
        strokeWidth="1.5"
        transform="rotate(6 68 132)"
      />
      <circle cx="96" cy="52" r="8" fill="#D4A574" opacity="0.45" />
      <circle cx="36" cy="100" r="5" fill="#94a3b8" opacity="0.4" />

      {/* Connecting path: friction → clarity */}
      <path
        d="M120 100 C160 100, 180 78, 220 78 C260 78, 280 100, 320 100"
        stroke="url(#where-ai-grad-soft)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="6 6"
      />
      <path
        d="M308 94 L322 100 L308 106"
        stroke="#007E3A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />

      {/* Right: organised stack (clarity) */}
      <rect
        x="340"
        y="56"
        width="100"
        height="88"
        rx="10"
        fill="white"
        stroke="#007E3A"
        strokeWidth="1.75"
        opacity="0.95"
      />
      <rect
        x="340"
        y="56"
        width="100"
        height="22"
        rx="10"
        fill="url(#where-ai-grad-green)"
      />
      <rect
        x="340"
        y="68"
        width="100"
        height="10"
        fill="url(#where-ai-grad-green)"
      />
      <circle cx="356" cy="67" r="3.5" fill="white" opacity="0.9" />
      <rect
        x="366"
        y="64"
        width="48"
        height="5"
        rx="2.5"
        fill="white"
        opacity="0.85"
      />

      <rect
        x="356"
        y="92"
        width="68"
        height="5"
        rx="2.5"
        fill="#007E3A"
        opacity="0.25"
      />
      <rect
        x="356"
        y="104"
        width="52"
        height="5"
        rx="2.5"
        fill="#007E3A"
        opacity="0.18"
      />
      <rect
        x="356"
        y="116"
        width="60"
        height="5"
        rx="2.5"
        fill="#007E3A"
        opacity="0.14"
      />
      <rect
        x="356"
        y="128"
        width="40"
        height="5"
        rx="2.5"
        fill="#D4A574"
        opacity="0.55"
      />

      {/* Small spark of insight */}
      <path
        d="M300 48 L304 58 L314 62 L304 66 L300 76 L296 66 L286 62 L296 58 Z"
        fill="#D4A574"
        opacity="0.7"
      />
    </svg>
  );
}
