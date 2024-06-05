import { Routes } from '@angular/router';
import {StartPageComponent} from "@app/pages/start/start-page/start-page.component";
import {NotFoundPageComponent} from "@app/pages/not-found/not-found-page/not-found-page.component";
import {DemoComponent} from "@app/pages/demo/demo/demo.component";
import {AccessDeniedComponent} from "@app/pages/access-denied/access-denied.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: StartPageComponent
  },
  {
    path: 'not-found',
    component: NotFoundPageComponent
  },
  {
    path: 'demo',
    component: DemoComponent
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  {
    path: 'hr',
    loadChildren: () => import('./layout/main-layout/main-layout.module').then(m => m.MainLayoutModule)
  }
];
