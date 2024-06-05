import {Component, Input, OnInit} from '@angular/core';
export type ButtonType = 'button' | 'submit';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements OnInit {

  @Input() type: ButtonType;

  constructor() {
    this.type = 'button';
  }

  ngOnInit(): void {
  }
}
