import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Question } from '../question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private baseUrl = environment.localBaseUrl;

  constructor(private http: HttpClient) {}

  public getQuestionsOfQuizUser(qid: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/question/quiz/${qid}`);
  }

  public getQuestionOfQuizAdmin(quizId : number) : Observable<Question[]>{
    return this.http.get<Question[]>(`${this.baseUrl}/question/quiz/all/${quizId}`)
  }

  public addQuestionToQuiz(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.baseUrl}/question/`,question);
  }

  public getQuestionById(id : number) : Observable<Question>{
    return this.http.get<Question>(`${this.baseUrl}/question/${id}`);
  }

  public updateQuestion(question : Question) : Observable<Question>{
    return this.http.put<Question>(`${this.baseUrl}/question/`,question);
  }

  public deleteQuestion(questionId : number) : Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/question/${questionId}`);
  }
}
