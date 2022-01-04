import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/question';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css'],
})
export class ViewQuestionsComponent implements OnInit {
  // qId: number = 0;
  // qTitle: string = '';

  quizId: number = 0;
  quizTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  questionsOfQuiz: Question[] = [];

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params.quizId;
    this.quizTitle = this.route.snapshot.params.quizTitle;

    this.questionService.getQuestionOfQuizAdmin(this.quizId).subscribe(
      (resp: Question[]) => {
        this.questionsOfQuiz = resp;
      },
      (error: HttpErrorResponse) => {
        console.log('something went wrong ' + error.message);
      }
    );
  }

  deleteQuestion(questionId : number) {
    Swal.fire({icon: 'info',title: 'Are you Sure?',confirmButtonText: 'Delete',showCancelButton: true,})
      .then((result) => {
      if (result.isConfirmed) {
          //Then We Hit the Delete Service
          this.questionService.deleteQuestion(questionId).subscribe(
            () => {
              this.questionsOfQuiz = this.questionsOfQuiz.filter((question) => question.id != questionId);
              Swal.fire('Success', 'Question Deleted Successfully', 'success');
              // this.loadQuiz();
            },
            (error) => {
              console.log('Error Loading Questions ' + error.message);
            }
          );
        }
      });
  }
}
