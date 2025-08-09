"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { CustomButton } from "../common/CustomButton";
import { PhosphorIcon } from "../common/PhosphorIcon";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <CustomButton
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      variant="outline"
      size="icon"
    >
      {resolvedTheme === "dark" ? (
        <PhosphorIcon icon="Moon" />
      ) : (
        <PhosphorIcon icon="Sun" />
      )}
    </CustomButton>
  );
}
