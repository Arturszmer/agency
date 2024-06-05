import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {routes} from "@app/layout/main-layout/main-layout-routing.module";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit{

  isHandset: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.Handset)
        .subscribe(result => {
          this.isHandset = result.matches;
        });
  }

  protected readonly routes = routes;
}
