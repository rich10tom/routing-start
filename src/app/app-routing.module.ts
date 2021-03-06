import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user/user.component';
import {ServersComponent} from './servers/servers.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {ServerComponent} from './servers/server/server.component';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuardGuard} from './auth-guard.guard';
import {CanDeactivateGuard} from './servers/edit-server/can-deactivate.guard';
import {ErrorPageComponent} from './error-page/error-page.component';
import {ServerResolverService} from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  {path: 'users', canActivate: [AuthGuardGuard], component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent},
    ]},
  {path: 'servers', canActivateChild: [AuthGuardGuard], component: ServersComponent, children: [
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]},
      {path: ':id', component: ServerComponent, resolve: {server: ServerResolverService}},
    ]},
  {path: '', component: HomeComponent},
  // {path: 'not-found', component: PageNotFoundComponent},
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page Not Found'}},
  {path: '**', redirectTo: '/not-found'},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
