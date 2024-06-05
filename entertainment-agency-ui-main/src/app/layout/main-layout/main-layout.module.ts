import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import {MainLayoutComponent} from "@app/layout/main-layout/main-layout.component";
import {ComponentsModule} from "@app/components/components.module";
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NavBarComponent} from "@app/components/nav-bar/nav-bar.component";


@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    ComponentsModule,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavModule,
    MatIcon,
    MatIconButton,
    MatToolbar,
    MatListItem,
    MatNavList,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatButton,
    NavBarComponent
  ],
  exports: [MainLayoutComponent]
})
export class MainLayoutModule { }
