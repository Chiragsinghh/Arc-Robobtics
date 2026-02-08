export default function Footer() {
    return (
      <footer className="mt-32 border-t border-neutral-200 dark:border-neutral-800 px-8 py-12">
        <div className="max-w-6xl mx-auto flex flex-col gap-4 text-sm opacity-80">
          
          <div className="font-medium">
            ARC Robotics
          </div>
  
          <div className="max-w-md">
            A student-led robotics initiative focused on systems thinking,
            engineering fundamentals, and applied learning.
          </div>
  
          <div className="text-xs opacity-60">
            © {new Date().getFullYear()} ARC Robotics · All rights reserved
          </div>
  
        </div>
      </footer>
    );
  }
  