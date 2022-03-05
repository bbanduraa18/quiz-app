import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { IQuizState } from "../types/quizState.interface";
import { IQuestion } from "../types/question.interface";
import { AnswerType } from "../types/answer.type";
import { HttpClient } from "@angular/common/http";
import { IBackendQuestion } from "../types/backendQuestion.interface";

@Injectable()
export class QuizService {
  apiUrl = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple';
  initialState: IQuizState = {
    questions: [],
    showResults: false,
    currentQuestionIndex: 0,
    correctAnswerCount: 0,
    answers: [],
    currentAnswer: null,
  };

  state$ = new BehaviorSubject<IQuizState>({...this.initialState});

  constructor(private http: HttpClient) {
  }

  getState(): IQuizState {
    return this.state$.getValue();
  }

  setState(partialState: Partial<IQuizState>): void {
    this.state$.next({...this.state$.getValue(), ...partialState})
  }

  nextQuestion(): void {
    const state = this.getState();
    const newShowResults = state.currentQuestionIndex === state.questions.length - 1;
    const newCurrentQuestionIndex = newShowResults ? state.currentQuestionIndex : this.getState().currentQuestionIndex + 1;
    const newAnswers = newShowResults ? [] : this.shuffleAnswers(state.questions[newCurrentQuestionIndex])

    this.setState({
      currentQuestionIndex: newCurrentQuestionIndex,
      showResults: newShowResults,
      answers: newAnswers,
      currentAnswer: null,
    });
  }

  shuffleAnswers(question: IQuestion): AnswerType[] {
    const unshuffledAnswers = [
      ...question.incorrectAnswers, question.correctAnswer
    ];

    return unshuffledAnswers.map(unshuffledAnswer => ({
      sort: Math.random(),
      value: unshuffledAnswer
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(el => el.value)
  }

  restart(): void {
    this.setState(this.initialState);
    this.getQuestions();
  }

  selectAnswer(answer: AnswerType): void {
    const state = this.getState();
    const newCorrectAnswerCount = answer === state.questions[state.currentQuestionIndex].correctAnswer
      ? state.correctAnswerCount + 1
      : state.correctAnswerCount;

    this.setState({ currentAnswer: answer, correctAnswerCount: newCorrectAnswerCount });
  }

  getQuestions(): void {
    this.http.get<{ results: IBackendQuestion[] }>(this.apiUrl).pipe(
      map((res) => res.results)
    ).subscribe((questions) => {
      this.loadQuestions(questions)
    })
  }

  loadQuestions(backendQuestions: IBackendQuestion[]): void {
    const normalizedQuestions = this.normalizeQuestions(backendQuestions);
    const initialAnswers = this.shuffleAnswers(normalizedQuestions[0]);
    this.setState({ questions: normalizedQuestions, answers: initialAnswers });
  }

  normalizeQuestions(backendQuestions: IBackendQuestion[]): IQuestion[] {
    return backendQuestions.map(backendQuestion => {
      const incorrectAnswers = backendQuestion.incorrect_answers.map(backendIncorrectAnswer => {
        return decodeURIComponent(backendIncorrectAnswer)
      });

      return {
        question: decodeURIComponent(backendQuestion.question),
        correctAnswer: decodeURIComponent(backendQuestion.correct_answer),
        incorrectAnswers: incorrectAnswers
      };
    })
  }
}
