import { Component, Input } from '@angular/core';

@Component({
  selector: 'CartModal',
  template: `<h2>Hello {{name}}!</h2><p>I'm a component showing dynamic data!</p>`,
  styles: [],
})
export class CartModalComponent {
  @Input() name: string | undefined;
}
