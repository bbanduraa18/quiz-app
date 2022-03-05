import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from "../../services/quiz.service";
import { map, Observable, Subscription } from "rxjs";
import { IQuestion } from "../../types/question.interface";
import { AnswerType } from "../../types/answer.type";

@Component({
  selector: 'app-quiz-question',
  templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit, OnDestroy {
  question$: Observable<IQuestion>;
  answers$: Observable<AnswerType[]>;
  correctAnswer: AnswerType | null = null;
  correctAnswerSubscription!: Subscription;
  currentAnswer: AnswerType | null = null;
  currentAnswerSubscription!: Subscription;

  constructor(private quizService: QuizService) {
    this.question$ = this.quizService.state$.pipe(
      map((state) => (state.questions[state.currentQuestionIndex]))
    );

    this.answers$ = this.quizService.state$.pipe(
      map((state) => state.answers)
    );
  }

  ngOnInit() {
    this.correctAnswerSubscription = this.question$.pipe(
      map((question) => question.correctAnswer)
    ).subscribe(
      (correctAnswer) => (this.correctAnswer = correctAnswer)
    );

    this.currentAnswerSubscription = this.quizService.state$.pipe(
      map((state) => state.currentAnswer)
    ).subscribe(
      (currentAnswer) => (this.currentAnswer = currentAnswer)
    );
  }

  ngOnDestroy() {
    this.correctAnswerSubscription.unsubscribe();
    this.currentAnswerSubscription.unsubscribe();
  }

  selectAnswer(answer: AnswerType): void {
    this.quizService.selectAnswer(answer);
  }

  isWrongAnswer(answer: AnswerType): boolean {
    if(!this.correctAnswer || !this.currentAnswer) {
      return false
    }

    return this.currentAnswer === answer && this.currentAnswer !== this.correctAnswer;
  }

  isCorrectAnswer(answer: AnswerType): boolean {
    if(!this.correctAnswer || !this.currentAnswer) {
      return false
    }

    return Boolean(this.currentAnswer) && answer === this.correctAnswer;
  }

  isDisabledAnswer(): boolean {
    if(!this.correctAnswer || !this.currentAnswer) {
      return false
    }

    return Boolean(this.currentAnswer);
  }

}
