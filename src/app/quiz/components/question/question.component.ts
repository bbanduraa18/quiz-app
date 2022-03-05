import { Component } from '@angular/core';
import { QuizService } from "../../services/quiz.service";
import { map, Observable } from "rxjs";
import { IQuestion } from "../../types/question.interface";
import {AnswerType} from "../../types/answer.type";

@Component({
  selector: 'app-quiz-question',
  templateUrl: './question.component.html'
})
export class QuestionComponent {
  question$: Observable<IQuestion>;
  answers$: Observable<AnswerType[]>;
  correctAnswer$: Observable<AnswerType>;
  currentAnswer$: Observable<AnswerType | null>;

  constructor(private quizService: QuizService) {
    this.question$ = this.quizService.state$.pipe(
      map(state => state.questions[state.currentQuestionIndex])
    );

    this.answers$ = this.quizService.state$.pipe(
      map(state => state.answers)
    );

    this.correctAnswer$ = this.question$.pipe(
      map(question => question.correctAnswer)
    );

    this.currentAnswer$ = this.quizService.state$.pipe(
      map(state => state.currentAnswer)
    );
  }

  selectAnswer(answer: AnswerType): void {
    this.quizService.selectAnswer(answer);
  }

}
