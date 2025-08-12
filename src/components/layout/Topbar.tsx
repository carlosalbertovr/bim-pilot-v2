import Image from "next/image";
import { ThemeSwitch } from "./ThemeSwitch";

export function Topbar() {
  return (
    <div className="h-12 py-2 px-4 sm:px-8 flex flex-row items-center justify-between border-b bg-background dark:bg-card">
      <div className="flex flex-row items-center justify-center gap-2 sm:gap-3">
        <div className="flex justify-center items-center h-8 w-8 sm:h-9 sm:w-9 bg-brand-primary dark:bg-brand-primary-dark rounded-md">
          <Image
            className="light:invert"
            src="/logo.svg"
            alt="BIM Pilot logo"
            width={16}
            height={16}
            priority
          />
        </div>
        <h1 className="text-xs sm:text-sm uppercase font-semibold hidden xs:block">
          BIM Pilot
        </h1>
      </div>
      <ThemeSwitch />
    </div>
  );
}
