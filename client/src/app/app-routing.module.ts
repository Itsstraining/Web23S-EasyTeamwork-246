import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'hometask/:id',
    canActivate: [UserGuard],
    loadChildren: () =>
      import('./pages/hometask/hometask.module').then(
        (m) => m.HometaskModule
      ),
  },
  {
    path: 'viewallproject',
    canActivate: [UserGuard],
    loadChildren: () =>
      import('./pages/viewallproject/viewallproject.module').then(
        (m) => m.ViewallprojectModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'createaccount',
    loadChildren: () =>
      import('./pages/create-account/create-account.module').then(
        (m) => m.CreateAccountModule
      ),
  },
  { path: 'test', loadChildren: () => import('./pages/socket-test/socket-test.module').then(m => m.SocketTestModule) },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/error/error.module').then((m) => m.ErrorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
