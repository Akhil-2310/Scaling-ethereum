import { RecordWithPlaintext } from "@puzzlehq/sdk";
import { RevealAnswerInputs } from "@state/manager";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum Step {
  _01_Finish,
  _02_Confirmed,
}

type RevealAnswerStore = {
  inputsRevealAnswer?: Partial<RevealAnswerInputs>;
  eventId?: string;
  step: Step;
  setStep: (step: Step) => void;
  initialize: (
    calculated_outcome_notification_record: RecordWithPlaintext,
    challenger_answer_record: RecordWithPlaintext,
    joint_piece_state: RecordWithPlaintext,
    challenger_claim_signature: RecordWithPlaintext,
    game_outcome: string, //TODO this is a struct in leo
  ) => void;
  setEventId: (eventId?: string) => void;
  close: () => void;
};

export const useRevealAnswerStore = create<RevealAnswerStore>()(
  persist(
    (set) => ({
      inputsRevealAnswer: undefined,
      eventId: undefined,
      step: Step._01_Finish,
      setStep: (step: Step) => {
        set({ step });
      },
      initialize: (
        calculated_outcome_notification_record: RecordWithPlaintext,
        challenger_answer_record: RecordWithPlaintext,
        joint_piece_state: RecordWithPlaintext,
        challenger_claim_signature: RecordWithPlaintext,
        game_outcome: string
      ) => {
        set({
          inputsRevealAnswer: {
            calculated_outcome_notification_record,
            challenger_answer_record,
            joint_piece_state,
            challenger_claim_signature,
            game_outcome,
          },
          step: Step._01_Finish,
          eventId: undefined,
        });
      },
      setEventId: (eventId) => {
        set({ eventId });
      },
      close: () => {
        set({
          inputsRevealAnswer: undefined,
          step: Step._01_Finish,
          eventId: undefined,
        });
      },
    }),
    {
      name: "reveal-answer",
    }
  )
);
