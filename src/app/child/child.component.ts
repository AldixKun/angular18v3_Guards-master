import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-child',
  template: `<p (click)="notifyParent()">👤 {{ message }}</p>`
})
export class ChildComponent {
  @Input() message = '';
  @Input() userId!: number;
  @Output() send = new EventEmitter<number>();

  notifyParent() {
    this.send.emit(this.userId);
  }
}
