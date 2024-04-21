"use client";
import { useAcceptGameStore } from "@/app/accept-game/store";
import { GAME_ADDRESS, TOKEN_ABI, TOKEN_ADDRESS } from "@/utils";
import { teams } from "@/utils/team-data";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "sonner";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { z } from "zod";
// import TOKEN_ABI from "../abi/ERC20.json";
import GAME_ABI from "../abi/Game.json";
import { useNewGameStore } from "../app/create-game/store";
import TeamCard from "./TeamCard";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
interface ITeamSelection {
  setSelectedTeam: (val: number) => void;
  setIsGameStarted: (val: boolean) => void;
  selectedTeam: number;
  isChallenged: boolean;
  // startGame: () => void;
}

type Team = {
  name: string;
  attack: number;
  // midfield: number;
  defense: number;
  image: string;
  foundingYear: number;
  coach: string;
  colors: string[];
  achievements: string[];
  fanbase: string;
};
enum ConfirmStep {
  Signing,
  RequestingEvent,
}

const messageToSign = "1234567field"; // TODO?

const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;

const opponentSchema = z.string().regex(ethereumAddressRegex);
const wagerAmountSchema = z
  .number()
  .refine(
    (value) => !isNaN(Number(value)),
    "Wager amount must be a valid number"
  )
  .refine(
    (value) => Number(value) >= 0 && Number(value) <= 1000,
    "Wager amount must be between 0 and 1000"
  );

const TeamSelection: React.FC<ITeamSelection> = ({
  selectedTeam,
  setSelectedTeam,
  setIsGameStarted,
  isChallenged,
}) => {
  const [bet, setBet] = useState(1);
  const [opponent, setOpponent] = useState("");
  const swiperRef = useRef<any>();
  const { address } = useAccount();
  const { data: balance } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });
  console.log("balance", balance);

  const [opponentError, setOpponentError] = useState<string | null>(null);
  const [betError, setBetError] = useState<string | null>(null);
  // const [isChallenged, setIsChallenged] = useState(false);
  const { setInputs, inputs } = useNewGameStore();
  const [loading, setLoading] = useState(false);
  const [
    inputsSubmitWager,
    eventIdSubmit,
    acceptGameInputs,
    setSubmitWagerInputs,
    setEventIdSubmit,
    setStep,
    setAcceptedSelectedTeam,
  ] = useAcceptGameStore((state: any) => [
    state.inputsSubmitWager,
    state.eventIdSubmit,
    state.setAcceptGameInputs,
    state.setSubmitWagerInputs,
    state.setEventIdSubmit,
    state.setStep,
    state.setAcceptedSelectedTeam,
  ]);
  const { writeContractAsync } = useWriteContract();

  const result = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });
  const { data } = useReadContract({
    address: GAME_ADDRESS,
    abi: GAME_ABI.abi,
    functionName: "getGameCount",
  });

  console.log("🚀 ~ {data}:", result, address, data);

  const router = useRouter();

  const getTokens = async () => {
    setLoading(true);
    try {
      writeContractAsync({
        abi: TOKEN_ABI,
        address: TOKEN_ADDRESS,
        functionName: "mint",
        args: [address as `0x${string}`, parseUnits("1000", 18)],
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleOpponentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpponent(e.target.value);
  };
  useEffect(() => {
    const wagerAmountResult = wagerAmountSchema.safeParse(bet);
    const opponentResult = opponentSchema.safeParse(opponent);

    if (!wagerAmountResult.success) {
      setBetError("Wager amount must be a valid number");
    } else {
      setBetError(null);
    }

    if (!opponentResult.success) {
      setOpponentError("Opponent address must be valid account");
    } else {
      setOpponentError(null);
    }

    // Update inputs only if both values are valid
    if (wagerAmountResult.success && opponentResult.success) {
      setInputs({
        challenger_wager_amount: wagerAmountResult.data.toString(),
        opponent: opponentResult.data,
      });
    }
  }, [bet, opponent]);

  const handleStartGame = () => {
    if (address && bet <= 123) {
      setIsGameStarted(true);
    } else {
      toast.info("Please connect your Wallet to play");
    }
  };

  return (
    <div className="flex flex-col h-fit  items-center gap-16 mt-16 justify-around ">
      <Swiper
        onSnapIndexChange={
          (newIndex) => {
            setSelectedTeam(newIndex.activeIndex);
            setAcceptedSelectedTeam(newIndex.activeIndex);
          }
          /* or set to state */
        }
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: false,
          //   scale: 0.9,
        }}
        direction="horizontal"
        navigation={{
          nextEl: "swiper-button-prev",
          prevEl: "swiper-button-next",
        }}
        initialSlide={teams.length / 2}
        // navigation={true}
        modules={[EffectCoverflow, Navigation]}
        className="mySwiper max-w-md h-fit lg:max-w-3xl lg:h-full"
      >
        {/* {artists.map((artist) => (
          <SwiperSlide key={artist.id} className={SwiperSlideClass}>
            <FeaturedEventCard artist={artist} />
          </SwiperSlide>
        ))} */}
        {teams.map((team, index) => {
          return (
            <SwiperSlide
              key={team.name}
              className="max-w-fit flex flex-col gap-8 items-center justify-center rounded-3xl font-bold"
            >
              <TeamCard
                key={team.name}
                index={index}
                selectedTeam={selectedTeam}
                team={team}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="hidden sm:block  absolute top-[45%]  left-48">
        <Button
          size={"icon"}
          className="rounded-full"
          variant={"ghost"}
          onClick={() => swiperRef.current?.slidePrev()}
          title="Previous"
        >
          <FaChevronLeft size={24} />
        </Button>
      </div>
      <div className="hidden sm:block  absolute top-[45%]  right-48">
        <Button
          size={"icon"}
          className="rounded-full"
          variant={"ghost"}
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
          title="Next"
        >
          {" "}
          <FaChevronRight size={24} />
        </Button>
        {/* <div className="flex flex-row gap-1"> */}
        {/* </div> */}
      </div>
      {!isChallenged ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Pick Team</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Start Game</DialogTitle>
              <DialogDescription>
                Enter your opponent&apos;s wallet address and how much you are
                wagering for the game
              </DialogDescription>
            </DialogHeader>
            <Input
              type="text"
              onChange={(e) => handleOpponentChange(e)}
              placeholder="Opponent address"
            />
            {opponentError && (
              <p className="text-red-500 text-sm">{opponentError}</p>
            )}
            <div className="grid gap-4 py-4">
              <div className="flex w-full relative items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Wager
                </Label>
                <Input
                  id="amount"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBet(parseInt(e.currentTarget.value))
                  }
                  className="col-span-3 outline-none  ring-offset-0"
                  value={bet}
                />
                <p className="absolute text-xs tracking-tighter right-4">FBC</p>
              </div>
              {betError && <p className="text-red-500 text-sm">{betError}</p>}
              {Number(
                formatUnits(balance ? (balance as bigint) : BigInt(0), 18)
              ) == 0 ? (
                <div className="flex flex-col gap-4 -mb-6 items-center justify-center text-center w-full tracking-tight">
                  <p className="text-red-500 text-sm">
                    You need FBC to play the game
                  </p>
                  <Button
                    disabled={loading}
                    onClick={getTokens}
                    className="w-32"
                    variant={"outline"}
                  >
                    Mint FBC
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <Slider
                    className="mt-6"
                    onValueChange={(e) => setBet(e[0])}
                    defaultValue={[100]}
                    value={[bet]}
                    min={1}
                    max={balance ? Number(formatUnits(balance, 18)) : 0}
                    step={1}
                  />
                  {/* Min label */}
                  <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-7">
                    0
                  </span>
                  {/* Max label */}
                  <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-7">
                    {balance ? formatUnits(balance, 18) : 0}
                  </span>
                </div>
              )}
            </div>
            <div className="flex w-full justify-center  items-center ">
              {/* <Button
              variant="outline"
              className="relative w-48 overflow-hidden bg-gradient-to-r from-blue-300 via-fuchsia-400 to-yellow-600"
              onClick={() => {
                const number = getRandomNumber();
                setBet(number);
              }}
            >
              <motion.span
                layout
                initial={{
                  x: Math.random() * 100 - 50, // Random initial x position between -50 and 50
                  y: Math.random() * 60 - 30, // Random initial y position between -30 and 30
                }}
                animate={{
                  x: Math.random() * 100 - 50, // Random destination x position between -50 and 50
                  y: Math.random() * 60 - 30, // Random destination y position between -30 and 30
                  z: Math.random(),
                }}
                className="absolute  bg-clip-text bg-transparent"
                transition={{
                  repeatType: "reverse",
                  repeat: Infinity,
                  duration: 2,
                }}
              >
                Feeling Lucky!
              </motion.span>
            </Button> */}
              <Button
                onClick={handleStartGame}
                className="w-full"
                variant={"outline"}
                type="submit"
              >
                Start Game
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Button
          onClick={handleStartGame}
          className="w-36"
          variant={"outline"}
          type="submit"
        >
          Start Game
        </Button>
      )}
    </div>
  );
};
export default TeamSelection;
