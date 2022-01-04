import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = environment.localBaseUrl;

  constructor(private http: HttpClient) { }

  public addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/category/`, category);
  }

  public updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/category/`, category);
  }

  public getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/category/${categoryId}`);
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/category/`);
  }

  public deleteCategory(id: number): void {
    this.http.delete<void>(`${this.baseUrl}/category/${id}`);
  }

}
