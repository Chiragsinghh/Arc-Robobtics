export default function GridOverlay() {
    return (
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute inset-0
  
          /* Light mode: slightly stronger */
          bg-[radial-gradient(circle,rgba(0,0,0,0.2)_1px,transparent_1px)]
          bg-[size:32px_32px]
  
          /* Dark mode: softer */
          dark:bg-[radial-gradient(circle,rgba(255,255,255,0.12)_1px,transparent_1px)]
        "
      />
    );
  }
  