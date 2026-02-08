import Image from "next/image";

export default function SystemCard({
  title,
  description,
  tags,
  image,
}: {
  title: string;
  description: string;
  tags: string[];
  image?: string;
}) {
  return (
    <div
      className="
        relative
        border border-neutral-200 dark:border-neutral-800
        p-6 space-y-4
        transition-all duration-300
        hover:-translate-y-[2px]
        hover:border-accent
      "
    >
      {/* Subtle internal grid on hover */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute inset-0
          opacity-0
          bg-[radial-gradient(circle,rgba(0,0,0,0.08)_1px,transparent_1px)]
          bg-[size:24px_24px]
          dark:bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)]
          transition-opacity duration-300
          hover:opacity-100
        "
      />

      <div className="relative space-y-4">
        
        {/* Image */}
        {image && (
  <div className="relative h-56 w-full overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
    <Image
      src={image}
      alt={title}
      fill
      className="object-contain p-4"
    />
  </div>
)}

        <h3 className="text-xl font-medium">
          {title}
        </h3>

        <p className="text-sm opacity-80 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="
                text-xs px-2 py-1
                border border-neutral-300 dark:border-neutral-700
                rounded-full opacity-80
              "
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}
