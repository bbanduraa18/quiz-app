import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import { AnswerType } from "../../types/answer.type";

@Component({
  selector: 'app-quiz-answer',
  templateUrl: './answer.component.html'
})
export class AnswerComponent {
  @Input('answerText') answerTextProps!: string;
  @Input('index') indexProps!: number;

  @Output('selectAnswer') selectAnswerEvent = new EventEmitter<AnswerType>()

  @HostListener('click', ['$event'])
  onClick() {
    this.selectAnswerEvent.emit(this.answerTextProps)
  }

  letterMapping: string[] = ['A', 'B', 'C', 'D'];
}
