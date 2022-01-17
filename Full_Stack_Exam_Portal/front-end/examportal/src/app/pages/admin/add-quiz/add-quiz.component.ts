import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
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
  selectedImage : File = null!;

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private quizService: QuizService,
    private http :HttpClient
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
    // if (this.quiz.title == '' || this.quiz.title == null) {
    //   Swal.fire('Error !!', 'Title can not be Empty', 'error');
    //   return;
    // }

    // if (this.quiz.isActive == null) {
    //   this.quiz.isActive = false;
    // }
    if(!this.selectedImage){
      Swal.fire('Error !!', 'Please Select An Image from your Device', 'error');
      return;
    }
    //Assets Directory With Image Extension.
    this.quiz.quizLogo = './../../../../assets/'+this.selectedImage.name;

    this.quizService.addQuiz(this.quiz).subscribe(
      (resp: Quiz) => {
        //Image Upload Service.
        this.quizService.upload(this.selectedImage).subscribe(
          (event: any) => {
            Swal.fire('Success', resp.title + ' Added To Quiz List', 'success');
          },
          (err: any) => {
            console.log('Got Error '+err.message);
          }
        );
        this.quiz.title = '';
        this.quiz.description = '';
        this.quiz.isActive = false;
        this.quiz.maxMarks = '';
        this.quiz.numberOfQuestions = '';
        this.quiz.quizLogo = '';
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.snackBar.open('Something went wrong', '', {
          duration: 3000,
        });
      }
    );

    
  }

  getSelectedFile(event : any){
    this.selectedImage = event.target.files[0];
  }

  
}
