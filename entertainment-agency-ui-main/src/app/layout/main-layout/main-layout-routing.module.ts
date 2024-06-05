import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainLayoutComponent} from "@app/layout/main-layout/main-layout.component";
import {DashboardAngComponent} from "@app/layout/components/dashboard-ang/dashboard-ang.component";
import {ContractorComponent} from "@app/layout/components/contractor/contractor.component";
import {
  ContractorDetailsComponent
} from "@app/layout/components/contractor/contractor-details/contractor-details.component";
import {unsavedChangesGuard} from "@app/guard/unsaved-changes.guard";
import {UserDetailsComponent} from "@app/layout/components/user-details/user-details.component";
import {UsersComponent} from "@app/layout/components/users/users.component";
import {authGuard} from "@app/guard/auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardAngComponent,
        data: { icon: 'dashboard', text: 'sidenav.dashboard', sideNav: true, scope: []}
      },
      {
        path: 'contractor',
        component: ContractorComponent,
        data: { icon: 'groups', text: 'sidenav.contractors', sideNav: true,
          scope: ['CONTRACTORS_VIEW']},
        canActivate:[authGuard],
        canDeactivate: [unsavedChangesGuard]
      },
      {
        path: 'contractor/details/:id',
        component: ContractorDetailsComponent,
        data: { icon: 'groups', text: 'Contractors details', sideNav: false, scope: ['CONTRACTOR_MANAGEMENT']},
        canActivate: [authGuard],
        canDeactivate: [unsavedChangesGuard]
      },
      {
        path: 'users',
        component: UsersComponent,
        data: { icon: 'group', text: 'sidenav.users', sideNav: true,
        scope:['USER_VIEW']},
        canActivate:[authGuard],
        canDeactivate: [unsavedChangesGuard]
      },
      {
        path: 'user',
        component: UserDetailsComponent,
        data: { icon: 'manage_accounts', text: 'sidenav.user', sideNav: true, scope: []},
      }

    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
