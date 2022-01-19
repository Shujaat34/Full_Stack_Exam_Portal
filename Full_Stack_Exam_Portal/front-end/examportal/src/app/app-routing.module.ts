import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { ShowQuizzesComponent } from './pages/admin/show-quizzes/show-quizzes.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalUserGuard } from './services/normal-user.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'categories', component: ViewCategoriesComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'quizzes', component: ShowQuizzesComponent },
      { path: 'add-quiz', component: AddQuizComponent },
      { path: 'quiz/:id', component: UpdateQuizComponent },
      { path: 'view-questions/:quizId/:quizTitle', component: ViewQuestionsComponent },
      { path: 'add-question/:quizId/:quizTitle', component: AddQuestionComponent },
      { path: 'update-question/:quizId/:quizTitle/:questionId', component: UpdateQuestionComponent },
    ],
  },
  {
    //by default we fire all the quizes that is why we pass 0 in url
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalUserGuard],
    children :[
      { path: 'profile', component: ProfileComponent },
      { path: ':catId', component: LoadQuizComponent },
      { path: 'instructions/:quizId', component: InstructionsComponent },
      
    ]
  },
  { path: 'start-quiz/:quizId', component: StartQuizComponent,canActivate: [NormalUserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
