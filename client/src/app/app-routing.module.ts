import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'hometask', loadChildren: () => import('./pages/hometask/hometask.module').then(m => m.HometaskModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'viewallproject', loadChildren: () => import('./pages/viewallproject/viewallproject.module').then(m => m.ViewallprojectModule) },
  { path: 'createaccount', loadChildren: () => import('./pages/create-account/create-account.module').then(m => m.CreateAccountModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
