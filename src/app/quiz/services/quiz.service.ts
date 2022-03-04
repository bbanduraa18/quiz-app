import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IQuizState } from "../types/quizState.interface";
import mockData from '../data';
import {IQuestion} from "../types/question.interface";
import { AnswerType } from "../types/answer.type";

Injectable()
export class QuizService {
  state$ = new BehaviorSubject<IQuizState>({
    questions: mockData,
    showResults: false,
    currentQuestionIndex: 0,
    correctAnswerCount: 0,
    answers: this.shuffleAnswers(mockData[0])
  });

  getState(): IQuizState {
    return this.state$.getValue();
  }

  setState(partialState: Partial<IQuizState>): void {
    this.state$.next({...this.state$.getValue(), ...partialState})
  }

  nextQuestion(): void {
    const state = this.getState();
    const newShowResults = state.currentQuestionIndex === state.questions.length - 1;
    const currentQuestionIndex = newShowResults ? state.currentQuestionIndex : this.getState().currentQuestionIndex + 1;

    this.setState({
      currentQuestionIndex: currentQuestionIndex,
      showResults: newShowResults
    });
  }

  shuffleAnswers(question: IQuestion): AnswerType[] {
    const unshuffledAnswers = [
      ...question.incorrectAnswers,
      ...question.correctAnswer
    ];

    return unshuffledAnswers.map(unshuffledAnswer => ({
      sort: Math.random(),
      value: unshuffledAnswer
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(el => el.value)
  }
}
