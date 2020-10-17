import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BugsComponent } from './bugs/bugs.component';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'bugs/:project', component: BugsComponent},
  {path: '**', redirectTo:"/projects"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
