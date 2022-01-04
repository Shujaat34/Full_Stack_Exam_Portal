import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/category';
import { Quiz } from 'src/app/quiz';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  quiz = new Quiz();
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
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

  onAddQuiz(): void {
    if (this.quiz.title == '' || this.quiz.title == null) {
      Swal.fire('Error !!', 'Title can not be Empty', 'error');
      return;
    }

    if (this.quiz.isActive == null) {
      this.quiz.isActive = false;
    }
    this.quizService.addQuiz(this.quiz).subscribe(
      (resp: Quiz) => {
        console.log('Quiz Object ' + this.quiz.isActive);
        Swal.fire('Success', resp.title + ' Added To Quiz List', 'success');
        this.quiz.title = '';
        this.quiz.description = '';
        this.quiz.isActive = false;
        this.quiz.maxMarks = '';
        this.quiz.numberOfQuestions = '';
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.snackBar.open('Something went wrong', '', {
          duration: 3000,
        });
      }
    );
  }
}
