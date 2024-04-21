"use client";

import FAQ from "@/components/FAQ";
import StadiumCanvas from "@/components/StadiumCanvas";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { CiTrophy } from "react-icons/ci";
import { IoFootballOutline, IoGameControllerOutline } from "react-icons/io5";
export default function Home() {
  const header = "Welcome to Ten Taipei Football Manager".split(" ");
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-white dark:bg-gray-900">
      <main className="flex-1">
        <section className="w-full py-6 sm:py-12 md:py-24 xl:py-48   dark:bg-black bg-[#E0F4FF] ">
          <div className="container xl:-mt-4 px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl w-2/3 font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    {header.map((el, i) => (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.25,
                          delay: i / 5,
                        }}
                        key={i}
                      >
                        {el}{" "}
                      </motion.span>
                    ))}
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Experience the thrill of football like never before.
                    Challenge your friends, build your dream team and rise to
                    the top of the league.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="/create-game"
                  >
                    Play Now
                  </Link>
                </div>
              </div>
              {/* <div className="w-1/2">
                <Image
                  src="/promo/promo8-removebg-preview.png"
                  alt="player"
                  height={900}
                  width={800}
                />
              </div> */}
              <StadiumCanvas />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 xl:py-48 bg-[#3B3486]  dark:bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white tracking-tighter sm:text-5xl">
                  Play, Compete, Earn
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our game offers a unique and immersive on-chain football
                  experience. Challenge your friends on a zk powered football
                  manager game and win!
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardContent className="flex flex-col text-center items-center space-y-4">
                  <IoGameControllerOutline className="h-10 mt-2 w-10" />
                  <h3 className="text-xl font-bold">Compete</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Compete against players from around the world.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col text-center items-center space-y-4">
                  <IoFootballOutline className="h-10 w-10 mt-2" />
                  <h3 className="text-xl font-bold">Build Your Team</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Build your best team and tactic to beat your opponent
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col text-center items-center space-y-4">
                  <CiTrophy className="h-10 w-10 mt-2" />
                  <h3 className="text-xl font-bold">Win</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Play the first ZK Football Manager game and earn!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 dark:bg-black bg-[#E0F4FF]">
          <FAQ />
        </section>
      </main>
      <footer className="flex flex-col bg-[#3B3486] dark:bg-[#020817] gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-white dark:text-gray-400">
          © 2024 Ten Taipei Football Manager. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
