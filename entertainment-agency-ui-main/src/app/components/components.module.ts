import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SideBarComponent} from "@app/components/side-bar/side-bar.component";
import {MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule} from "@angular/material/sidenav";
import {MatListItem, MatListItemIcon, MatListItemTitle, MatNavList} from "@angular/material/list";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatLine} from "@angular/material/core";
import {TranslateModule} from "@ngx-translate/core";
import {HasRoleDirective} from "@app/directives/has-role.directive";



@NgModule({
  declarations: [SideBarComponent],
    imports: [
        CommonModule,
        MatSidenavContent,
        MatSidenav,
        MatSidenavContainer,
        MatNavList,
        MatListItem,
        RouterLink,
        MatToolbar,
        MatIcon,
        MatIconButton,
        MatSidenavModule,
        MatLine,
        MatListItemIcon,
        MatListItemTitle,
        RouterLinkActive,
        TranslateModule,
        HasRoleDirective
    ],
  exports: [
    SideBarComponent
  ]
})
export class ComponentsModule { }
