import { LocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/question';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { User } from 'src/app/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  constructor(private locationSt : LocationStrategy,private route : ActivatedRoute,
    private questionService : QuestionService, private loginService : LoginService,) { }
  quizId : number = 0;
  questions : Question[]= [new Question()];

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  perQuestionMarks = 0;
  passQuiz = false;
 

  timer : any ;
  isSubmit = false;

  user = new User();

  ngOnInit(): void {
    this.preventBackButton();
    this.quizId = this.route.snapshot.params.quizId;
    this.loadQuestions();

    this.loginService.getCurrentUser().subscribe(
      (resp: User) => {
        this.user = resp;
      },
      (error: HttpErrorResponse) => {
        console.log('something went wrong ' + error.message);
      }
    );
  }
  loadQuestions() {
    this.questionService.getQuestionsOfQuizUser(this.quizId).subscribe(
      (resp : Question[])=>{
        this.questions = resp;

        this.questions.forEach((q)=>{
          q.givenAnswer = '';
          q.answer = '';
        });

        //Each Question will have 2 minutes.
        this.timer = this.questions.length * 2 * 60;

        console.log(this.questions);
        this.startTimer();

      },(error : HttpErrorResponse)=>{
        console.log('Error Loading Questions of Quiz '+error.message);
      }
    );
  }

  submitQuiz(){
    Swal.fire({
      title:'Do you want to Submit the Quiz',
      confirmButtonText:'Yes',
      showCancelButton:true,
      icon:'info'
    }).then((result)=>{
      if(result.isConfirmed){
        this.evalQuiz();
      }
    });
  }

  preventBackButton(){
      history.pushState(null,'',location.href);
      this.locationSt.onPopState(()=>{
        history.pushState(null,'',location.href);
      });
  }

  startTimer(){
    //in each second this will be called back
    let t = window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000);
  }

  getFormattedTime(){
    let minute = Math.floor(this.timer/60);
    let seconds = this.timer -minute*60;
    return `${minute} min : ${seconds} sec`
  }

  evalQuiz() {
    this.isSubmit = true;

    this.questionService.evaluateQuestionsOfQuiz(this.questions).subscribe(
      (obj : Object)=>{

        this.correctAnswers = Object(obj)["correctAnswers"];
        this.attempted = Object(obj)["attempted"];
        this.marksGot = Object(obj)["marksGot"];
        this.perQuestionMarks = Object(obj)["perQuestionMarks"];
        this.passQuiz = Object(obj)["passQuiz"];
        
      },(error: HttpErrorResponse)=>{
        console.log(error.message);
      }
    );

    // this.questions.forEach((q)=>{
    //   if(q.givenAnswer == q.answer){
    //     this.correctAnswers++;
    //     this.perQuestionMarks = +this.questions[0].quiz.maxMarks/this.questions.length;
    //   }
    //   if(q.givenAnswer.trim() != ''){
    //     this.attempted++;
    //   }
    // });
    // //makrs after two decimal points.
    // this.marksGot = +(this.perQuestionMarks * this.correctAnswers).toFixed(2);
  }
  printPage(){
    window.print();
  }
  

} 


