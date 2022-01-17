import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Quiz } from '../quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}
  private baseUrl = environment.localBaseUrl;

  public getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/quiz/`);
  }

  public addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.baseUrl}/quiz/`, quiz);
  }

  public deleteQuiz(quizId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/quiz/${quizId}`);
  }

  public getQuizById(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.baseUrl}/quiz/${id}`);
  }

  public updateQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.baseUrl}/quiz/`, quiz);
  }

  public getQuizzesOfCategory(cateId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/quiz/category/${cateId}`);
  }

  public getActiveQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/quiz/active/`);
  }

  public getActiveQuizzesOfCategory(cateId: number): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/quiz/category/active/${cateId}`);
  }

  public upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const req = new HttpRequest('POST', `${this.baseUrl}/file/uploadFile`, formData, {
      reportProgress: false,
      responseType: 'json'
    });
    return this.http.request(req);
  }

}
