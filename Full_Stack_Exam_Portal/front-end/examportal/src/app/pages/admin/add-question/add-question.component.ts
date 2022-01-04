import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/question';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
// @ts-ignore
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;

  qId: number = 0;
  question: Question = new Question();
  quizName: string = '';

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private snackBar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this.qId = this.route.snapshot.params.quizId;
    this.quizName = this.route.snapshot.params.quizTitle;
    this.question.quiz.id = this.qId;
  }

  onAddQuestion() {
    if(this.question.content =='' || this.question.content== null){
      this.snackBar.open('Please Fill the Content ', '', {
        duration: 3000,
      });
      return;
    }
    this.questionService.addQuestionToQuiz(this.question).subscribe(
      (resp: Question) => {
        Swal.fire("Question Add", "New Question Added", "success");
        this.question.content='';
        this.question.option1='';
        this.question.option2='';
        this.question.option3='';
        this.question.option4='';
        this.question.answer='';
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Something went wrong '+error.message, '', {
          duration: 3000,
        });
      }
    );
  }
}
