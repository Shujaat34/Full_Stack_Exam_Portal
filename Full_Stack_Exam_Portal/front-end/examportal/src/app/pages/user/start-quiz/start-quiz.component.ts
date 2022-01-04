import { LocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  constructor(private locationSt : LocationStrategy,private route : ActivatedRoute,
    private questionService : QuestionService) { }
  quizId : number = 0;

  questions : Question[] = [];

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
      },(error : HttpErrorResponse)=>{
        console.log('Error Loading Questions of Quiz '+error.message);
      }
    );
  }

  preventBackButton(){
      history.pushState(null,'',location.href);
      this.locationSt.onPopState(()=>{
        history.pushState(null,'',location.href);
      });
  }

}
