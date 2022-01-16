import { Category } from "./category";

export class Quiz {
  id: number = 0 ;
  title: string = '';
  description: string= '';
  maxMarks: string= '';
  numberOfQuestions: string= '';
  isActive: boolean= false;
  category : Category = new Category();
  quizLogo : string = '';
}