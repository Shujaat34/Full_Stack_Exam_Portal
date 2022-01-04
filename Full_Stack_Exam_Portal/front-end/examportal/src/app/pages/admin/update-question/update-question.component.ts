import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/question';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css'],
})
export class UpdateQuestionComponent implements OnInit {
  question: Question = new Question();
  questionId: number = 0;
  quizName: string = '';
  quizId : number = 0;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.questionId = this.route.snapshot.params.questionId;
    this.quizName = this.route.snapshot.params.quizTitle;
    this.quizId = this.route.snapshot.params.quizId;

    if (this.questionId != 0) {
      this.questionService.getQuestionById(this.questionId).subscribe(
        (resp : Question)=>{
          this.question = resp;
        },(error : HttpErrorResponse)=>{
          console.log('something went wrong '+error.message);
        }
      );
    }
  }

  onUpdateQuestion() {
    this.questionService.updateQuestion(this.question).subscribe(
      (resp: Question) => {
        Swal.fire('Success',' Question Updated', 'success').then(
          (e) => {this.router.navigate(['/admin-dashboard/view-questions/'+this.quizId+'/'+this.quizName])}
        );
      },
      (error: HttpErrorResponse) => {
        console.log('Some Error Occured ' + error.message);
      }
    );

  }
}
