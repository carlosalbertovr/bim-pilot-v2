import Image from "next/image";
import { ThemeSwitch } from "./ThemeSwitch";

export function Topbar() {
  return (
    <div className="h-12 py-2 px-8 flex flex-row items-center justify-between border-b bg-background dark:bg-card">
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="flex justify-center items-center h-9 w-9 bg-brand-primary dark:bg-brand-primary-dark rounded-md">
          <Image
            className="light:invert"
            src="/logo.svg"
            alt="BIM Pilot logo"
            width={16}
            height={16}
            priority
          />
        </div>
        <h1 className="text-sm uppercase font-semibold">BIM Pilot</h1>
      </div>
      <ThemeSwitch />
    </div>
  );
}
