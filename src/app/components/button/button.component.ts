import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() type: string | undefined;
  @Input() buttonType: string;
  @Input() reverse: string | undefined;
}
