import { IQuestion } from "./question.interface";
import { AnswerType } from "./answer.type";

export interface IQuizState {
  questions: IQuestion[];
  showResults: boolean;
  currentQuestionIndex: number;
  correctAnswerCount: number;
  answers: AnswerType[];
  currentAnswer: AnswerType | null;
}
