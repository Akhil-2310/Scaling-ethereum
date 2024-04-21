import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function FAQ() {
  return (
    <div className="flex justify-center  items-center min-h-screen">
      <Card className="shadow-lg w-[550px]">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold tracking-tighter">
            Frequently Asked Questions
          </h2>
          <Accordion className="w-full mt-4" type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline font-semibold tracking-tight">
                How to play Ten Taipei Football Manager?
              </AccordionTrigger>
              <AccordionContent className="text-black/80 dark:text-white/70">
                <p>
                  You can play <strong>Ten Football Manager</strong> by
                  connecting your Metamask Wallet to TEN network. Download
                  Metamask here{" "}
                  <a
                    href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                    target="_blank"
                    className="underline"
                  >
                    here
                  </a>
                  .
                </p>{" "}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:no-underline font-semibold tracking-tight">
                How many players can play?
              </AccordionTrigger>
              <AccordionContent className="text-black/80 dark:text-white/70 ">
                Two players can play against each other after selecting their
                teams and entering the wagers.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="hover:no-underline font-semibold tracking-tight">
                Are there any tournaments to compete in?
              </AccordionTrigger>
              <AccordionContent className="text-black/80 dark:text-white/70">
                Seasons and special tournaments are part of the roadmap.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="hover:no-underline font-semibold tracking-tight">
                Why is Ten Taipei Football Manager build on TEN?
              </AccordionTrigger>
              <AccordionContent className="text-black/80 dark:text-white/70">
                TEN enables apps that are private by default. This enables users
                to commit to their strategy, without revealing it to the
                opponent.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="hover:no-underline font-semibold tracking-tight">
                Am I able to buy/sell players for my team?
              </AccordionTrigger>
              <AccordionContent className="text-black/80 dark:text-white/70">
                In the future it will be possible. Players will be tokenized as
                NFT&apos;s and tradeable on the market.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-b-0" value="item-6">
              <AccordionTrigger className="hover:no-underline font-semibold tracking-tight">
                Will I get rugged if my opponent rage quits?
              </AccordionTrigger>
              <AccordionContent className="text-black/80 dark:text-white/70">
                No! Ten Taipei Football Manager is built on the TEN network and
                optimized for multiparty privacy games. All wagered amounts are
                stored in the game smart contract. Winners are able to claim
                their winnings after the game is finished. If the game is not
                finished, because someone ghosts, the wagered amount is is
                claimable by the opponent after X blocks have passed.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
