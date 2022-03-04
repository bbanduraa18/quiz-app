import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-answer',
  templateUrl: './answer.component.html'
})
export class AnswerComponent implements OnInit {
  @Input('answerText') answerTextProps!: string;

  ngOnInit() {
    // if(!this.answerTextProps) {
    //   throw new Error('Inputs in answer are not correct');
    // }
  }
}
