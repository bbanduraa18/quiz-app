import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-answer',
  templateUrl: './answer.component.html'
})
export class AnswerComponent implements OnInit {
  @Input('answerText') answerTextProps!: string;
  @Input('index') indexProps!: number;

  letterMapping: string[] = ['A', 'B', 'C', 'D'];

  ngOnInit() {
  }
}
