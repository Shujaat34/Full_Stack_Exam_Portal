import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  cateId = 0;
  quizzes : Quiz[]= [];
  constructor(private route : ActivatedRoute, private quizService : QuizService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params)=>{
        this.cateId = params.catId;
        if(this.cateId == 0){
          //load All the quizzes
          this.quizService.getActiveQuizzes().subscribe(
            (resp : Quiz[])=>{
              this.quizzes = resp;
            },(error : HttpErrorResponse)=>{
              console.log('error loading quizzes '+error.message);
            }
          );
        }else{
          //load specific quiz
          this.quizzes = [];
          this.quizService.getActiveQuizzesOfCategory(this.cateId).subscribe(
            (resp : Quiz[])=>{
              this.quizzes = resp;
            },(error : HttpErrorResponse)=>{
              console.log(error.message);
            }
          );
          
        }
      }
    );
   
    
  }

}
