"use client";

import { cn } from "@/lib/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import {
  FloatingMenu,
  HoveredLink,
  MobileMenu,
  MobileMenuItem,
} from "./FloatingMenu";
import { ThemeToggle } from "./ToggleTheme";
import { buttonVariants } from "./ui/button";
const Navbar = ({ className }: { className?: string }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  const [isWalletModal, setIsWalletModal] = useState(false);
  const { width } = useWindowSize();
  const [active, setActive] = useState<boolean>(false);
  useEffect(() => {
    if (width > 768) {
      setIsNavOpen(false);
    }
  }, [width]);

  // const connectUserWallet = async () => {
  //   conn
  // }

  return (
    <div
      className={` flex justify-between pt-3 md:pt-6 items-center md:items-end    px-6 ${
        pathname === "/" ? "bg-[#E0F4FF] dark:bg-black" : "bg-transparent"
      }    w-full z-20 top-0 left-0`}
    >
      {width < 768 ? (
        <MobileMenu setActive={setActive}>
          {/* <Link
              href="/your-games"
              className={`text-black ${buttonVariants({
                variant: "link",
              })}`}
            >
              Your Games
            </Link>
            <Link
              href="/create-game"
              className={`text-black ${buttonVariants({
                variant: "link",
              })}`}
            >
              Create Game
            </Link> */}

          <MobileMenuItem
            setActive={setActive}
            active={active}
            // item={<IoFootballOutline className="h-4 w-4 " />}
            item={
              <Image
                width={48}
                height={48}
                src={"/logo-frog.png"}
                className="rounded-full"
                alt="logo"
              />
            }
          >
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/create-game">Create Game</HoveredLink>
              <HoveredLink href="/your-games">Your Games</HoveredLink>
            </div>
          </MobileMenuItem>
        </MobileMenu>
      ) : (
        <Link href="/" className="">
          <Image
            width={48}
            height={48}
            src={"/logo-frog.png"}
            className="rounded-full"
            alt="logo"
          />
        </Link>
      )}
      <div
        className={cn(
          "fixed flex items-center  justify-center top-6 inset-x-0 max-w-xl mx-auto z-50",
          className
        )}
      >
        {width > 768 && (
          <FloatingMenu setActive={setActive}>
            <Link
              href="/your-games"
              className={`text-black ${buttonVariants({
                variant: "link",
              })}`}
            >
              Your Games
            </Link>
            <Link
              href="/create-game"
              className={`text-black ${buttonVariants({
                variant: "link",
              })}`}
            >
              Create Game
            </Link>
          </FloatingMenu>
        )}
      </div>
      <div className="flex justify-center items-center mb-1 gap-6 z-50">
        <ConnectButton showBalance={false} />

        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
