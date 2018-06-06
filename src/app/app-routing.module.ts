import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { TodoComponent } from './todo/todo.component';

import { IsLoggedInGuard} from './shared/guards/is-logged-in.guard'


const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
    canActivate: [IsLoggedInGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
