import { AnswerType } from "./answer.type";

export interface IQuestion {
  question: string;
  incorrectAnswers: AnswerType[];
  correctAnswer: AnswerType;
}
