import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-quizzes',
  templateUrl: './show-quizzes.component.html',
  styleUrls: ['./show-quizzes.component.css'],
})
export class ShowQuizzesComponent implements OnInit {
  public quizzes: Quiz[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuiz();
  }

  loadQuiz() {
    this.quizService.getAllQuizzes().subscribe(
      (resp: Quiz[]) => {
        this.quizzes = resp;
      },

      (error: HttpErrorResponse) => {
        console.log('Error Loading Quizzes ' + error.message);
      }
    );
  }

  deleteQuiz(id: number) {
    Swal.fire({icon: 'info',title: 'Are you Sure?',confirmButtonText: 'Delete',
    showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //Then We Hit the Delete Service
        this.quizService.deleteQuiz(id).subscribe(
          () => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.id != id);
            Swal.fire('Success', 'Quiz Deleted Successfully', 'success');
            // this.loadQuiz();
          },

          (error) => {
            console.log('Error Loading Quizzes ' + error.message);
          }
        );
      }
    });
  }
}
