"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";

import { LuMoon } from "react-icons/lu";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      {theme === "light" ? (
        <Button
          onClick={() => setTheme("dark")}
          className="outline-none focus:ring-0 hover:bg-gray-50"
          variant="ghost"
          size="sm"
        >
          {/* <Icons.sun className="w-6 h-6 " /> */}
          <MdOutlineWbSunny size={24} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      ) : (
        <Button
          className="outline-none focus:ring-0 dark:hover:text-black hover:bg-gray-50"
          onClick={() => setTheme("light")}
          variant="ghost"
          size="sm"
        >
          {/* <Icons.moon className="w-6 h-6 dark:text-white" /> */}
          <LuMoon size={24} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      )}
    </div>
  );
}
