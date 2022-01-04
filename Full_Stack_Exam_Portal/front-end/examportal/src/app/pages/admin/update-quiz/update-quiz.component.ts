import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/category';
import { Quiz } from 'src/app/quiz';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  quizId = 0;

  quiz = <Quiz>{};
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params.id;
    this.quizService.getQuizById(this.quizId).subscribe(
      (resp: Quiz) => {
        this.quiz = resp;
        console.log(this.quiz);
      },
      (error: HttpErrorResponse) => {
        console.log('something went wrong ' + error.message);
      }
    );
    this.categoryService.getCategories().subscribe(
      (resp: Category[]) => {
        this.categories = resp;
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open('Something went wrong', '', {
          duration: 3000,
        });
      }
    );
  }

  onUpdate() {
    this.quizService.updateQuiz(this.quiz).subscribe(
      (resp: Quiz) => {
        Swal.fire('Success', resp.title + ' Quiz Updated', 'success').then(
          (e) => {this.router.navigate(['/admin-dashboard/quizzes'])}
        );
      },
      (error: HttpErrorResponse) => {
        console.log('Some Error Occured ' + error.message);
      }
    );
  }
}
