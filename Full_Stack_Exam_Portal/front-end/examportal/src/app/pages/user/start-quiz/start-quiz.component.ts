import { LocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/question';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  constructor(private locationSt : LocationStrategy,private route : ActivatedRoute,
    private questionService : QuestionService) { }
  quizId : number = 0;

  questions : Question[]= [new Question()];

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  perQuestionMarks =0; 

  isSubmit = false;

  ngOnInit(): void {
    this.preventBackButton();
    this.quizId = this.route.snapshot.params.quizId;
    this.loadQuestions();
  }
  loadQuestions() {
    this.questionService.getQuestionsOfQuizUser(this.quizId).subscribe(
      (resp : Question[])=>{
        this.questions = resp;
        console.log(this.questions);

        this.questions.forEach((q)=>{
          q.givenAnswer = '';
        });
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
        // console.log('Got These')
        // console.log(this.questions);
        // this.router.navigate(['/start-quiz/'+this.quiz.id]);

        this.isSubmit = true;
        
        this.questions.forEach((q)=>{
          if(q.givenAnswer == q.answer){
            this.correctAnswers++;
            this.perQuestionMarks = +this.questions[0].quiz.maxMarks/this.questions.length;
          }
          if(q.givenAnswer.trim() != ''){
            this.attempted++;
          }
        });

        //makrs after two decimal points.
        this.marksGot = +(this.perQuestionMarks * this.correctAnswers).toFixed(2);

        
     

        console.log('Got Marks '+this.marksGot);
        console.log('Attempted '+this.attempted);
        console.log('Correct Answers '+this.correctAnswers);

      }
    });
  }

  preventBackButton(){
      history.pushState(null,'',location.href);
      this.locationSt.onPopState(()=>{
        history.pushState(null,'',location.href);
      });
  }

}
