import { RecordWithPlaintext } from "@puzzlehq/sdk";

export const GAME_PROGRAM_ID = "football_game_v014.aleo";
export const GAME_RESULTS_MAPPING = "game_outcomes";

export const GAME_FUNCTIONS = {
  propose_game: "propose_game",
  submit_wager: "submit_wager",
  accept_game: "accept_game",
  reveal_answer: "reveal_answer_game",
  finish_game: "finish_game",
  calculate_outcome: "calculate_outcome",
};

/// todo - update these
export const transitionFees = {
  propose_game: 0.027,
  submit_wager: 0.0286,
  accept_game: 0.05901,
  calculate_outcome: 3.1,
  reveal_answer: 0.1,
  finish_game: 0.1,
};

export type LoadingStatus = "idle" | "loading" | "success" | "error";

export type ProposeGameInputs = {
  wager_record: RecordWithPlaintext;
  challenger_wager_amount: string;
  sender: string; // challenger address proposing game
  challenger: string;
  opponent: string;
  game_multisig: string;
  challenger_message_1: string;
  challenger_message_2: string;
  challenger_message_3: string;
  challenger_message_4: string;
  challenger_message_5: string;
  challenger_sig: string;
  challenger_nonce: string;
  challenger_answer: string;
  game_multisig_seed: string;
};

export type SubmitWagerInputs = {
  opponent_wager_record: RecordWithPlaintext;
  key_record: RecordWithPlaintext;
  game_req_notification: RecordWithPlaintext;
  opponent_message_1: string; //from output of useSignature
  opponent_message_2: string;
  opponent_message_3: string;
  opponent_message_4: string;
  opponent_message_5: string;
  opponent_sig: string; //from output of useSignature
};

// used for submit wager and accept game
export type AcceptGameInputs = {
  game_record: RecordWithPlaintext;
  opponent_answer: string;
  piece_stake_challenger: RecordWithPlaintext;
  piece_claim_challenger: RecordWithPlaintext;
  piece_stake_opponent: RecordWithPlaintext;
  piece_claim_opponent: RecordWithPlaintext;
  block_ht: string;
};

export type CalculateOutcomeInputs = {
  reveal_answer_notification_record: RecordWithPlaintext;
  challenger_answer_record: RecordWithPlaintext;
};

export type RevealAnswerInputs = {
  challenger_claim_signature: RecordWithPlaintext;
  calculated_outcome_notification_record: RecordWithPlaintext;
  joint_piece_state: RecordWithPlaintext;
  challenger_answer_record: RecordWithPlaintext;
  game_outcome: string;
};

export type FinishGameInputs = {
  game_record: RecordWithPlaintext;
  joint_piece_winner: RecordWithPlaintext;
  piece_joint_stake: RecordWithPlaintext;
  joint_piece_time_claim: RecordWithPlaintext;
};
