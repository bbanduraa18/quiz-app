import { AnswerType } from "./answer.type";

export interface IBackendQuestion {
  question: string;
  incorrect_answers: AnswerType[];
  correct_answer: AnswerType;
}
