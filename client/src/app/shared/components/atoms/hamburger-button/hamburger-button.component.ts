import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hamburger-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hamburger-button.component.html',
  styleUrls: ['./hamburger-button.component.css']
})
export class HamburgerButtonComponent {
  @Input() isOpen = false;
  @Output() toggleMenu = new EventEmitter<void>();
}
