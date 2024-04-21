import { RecordWithPlaintext } from "@puzzlehq/sdk";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CalculateOutcomeInputs } from '@state/manager';

export enum Step {
  _01_Finish,
  _02_Confirmed,
}

type CalculateOutcomeStore = {
  calculateOutcomeAnswer?: any;
  eventId?: string;
  step: Step;
  setStep: (step: Step) => void;
  initialize: (
    reveal_answer_notification_record: RecordWithPlaintext,
    challenger_answer_record: RecordWithPlaintext
  ) => void;
  setEventId: (eventId?: string) => void;
  close: () => void;
};

export const useCalculateOutcomeStore = create<CalculateOutcomeStore>()(
  persist(
    (set) => ({
      calculateOutcomeAnswer: undefined,
      eventId: undefined,
      step: Step._01_Finish,
      setStep: (step: Step) => {
        set({ step });
      },
      initialize: (
        reveal_answer_notification_record: RecordWithPlaintext,
        challenger_answer_record: RecordWithPlaintext
      ) => {
        set({
          calculateOutcomeAnswer: {
            reveal_answer_notification_record,
            challenger_answer_record,
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
          calculateOutcomeAnswer: undefined,
          step: Step._01_Finish,
          eventId: undefined,
        });
      },
    }),
    {
      name: "calculate-outcome",
    }
  )
);
