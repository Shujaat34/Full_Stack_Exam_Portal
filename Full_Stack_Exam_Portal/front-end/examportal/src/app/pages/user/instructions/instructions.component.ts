import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  quizId : number = 0 ;
  constructor(private route : ActivatedRoute,private quizService : QuizService,
    private router : Router) { }
  quiz = new Quiz();

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params.quizId;
    this.quizService.getQuizById(this.quizId).subscribe(
      (resp : Quiz)=>{
        this.quiz = resp;
        console.log(this.quiz);
      },(error: HttpErrorResponse)=>{
        console.log('error in loading quiz data '+error.message);
      }
    );
  }


  startQuiz(){
    Swal.fire({
      title:'Do you want to start the Quiz',
      confirmButtonText:'Start',
      showCancelButton:true,
      icon:'info'
    }).then((result)=>{
      if(result.isConfirmed){
        this.router.navigate(['/start-quiz/'+this.quiz.id]);
      }
    });
  }
}
