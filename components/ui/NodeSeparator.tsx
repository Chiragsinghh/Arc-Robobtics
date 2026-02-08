export default function NodeSeparator() {
    return (
      <div className="relative flex items-center justify-center py-16">
        
        {/* Horizontal line */}
        <div className="absolute left-0 right-0 h-px bg-neutral-200 dark:bg-neutral-800" />
  
        {/* Nodes */}
        <div className="relative flex items-center gap-16">
          
          {/* Node 1 */}
          <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
  
          {/* Node 2 */}
          <div className="w-2 h-2 rounded-full bg-neutral-500 dark:bg-neutral-500" />
  
          {/* Central node (emphasis) */}
          <div className="w-3 h-3 rounded-full bg-accent" />
  
          {/* Node 4 */}
          <div className="w-2 h-2 rounded-full bg-neutral-500 dark:bg-neutral-500" />
  
          {/* Node 5 */}
          <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600" />
  
        </div>
      </div>
    );
  }
  