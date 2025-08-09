import Image from "next/image";

export function Footer() {
  return (
    <footer className="h-12 py-2 px-8 flex flex-row items-center justify-between border-t">
      <p className="text-xs text-muted-foreground">
        © 2025 Carlos Velázquez. Personal project.
      </p>
      <div className="flex flex-row items-center justify-center gap-4">
        <p className="text-xs text-muted-foreground">Built with</p>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={50}
          height={16}
          priority
        />
      </div>
    </footer>
  );
}
