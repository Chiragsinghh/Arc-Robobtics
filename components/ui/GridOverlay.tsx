type GridVariant = "hero" | "section" | "subtle";

interface GridOverlayProps {
  variant?: GridVariant;
}

export default function GridOverlay({ variant = "section" }: GridOverlayProps) {
  const density =
    variant === "hero" ? "56px" : variant === "section" ? "72px" : "96px";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden grid-overlay"
    >
      {/* Horizontal lines */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(
            to_bottom,
            rgba(0,0,0,0.08)_1px,
            transparent_1px
          )]
          dark:bg-[linear-gradient(
            to_bottom,
            rgba(255,255,255,0.14)_1px,
            transparent_1px
          )]
          animate-grid-lines-y
        "
        style={{ backgroundSize: `100% ${density}` }}
      />

      {/* Vertical lines */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(
            to_right,
            rgba(0,0,0,0.08)_1px,
            transparent_1px
          )]
          dark:bg-[linear-gradient(
            to_right,
            rgba(255,255,255,0.14)_1px,
            transparent_1px
          )]
          animate-grid-lines-x
        "
        style={{ backgroundSize: `${density} 100%` }}
      />

      {/* Edge fade */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-b
          from-white via-transparent to-white
          dark:from-[#0b0d12] dark:to-[#0b0d12]
        "
      />
    </div>
  );
}
