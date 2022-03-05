import { NgModule } from "@angular/core";
import { QuizComponent } from "./components/quiz/quiz.component";
import { RouterModule, Routes } from "@angular/router";
import { QuestionComponent } from "./components/question/question.component";
import { AnswerComponent } from "./components/answer/answer.component";
import { QuizService } from "./services/quiz.service";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

const routes: Routes = [
  { path: '', component: QuizComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, MatButtonModule],
  declarations: [QuizComponent, QuestionComponent, AnswerComponent],
  providers: [QuizService]
})

export class QuizModule {}

