import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() text: string = '';
  @Input() centered: boolean = false;

  getSpinnerClasses(): string {
    const baseClasses = 'flex items-center';
    const centerClass = this.centered ? 'justify-center' : '';

    return `${baseClasses} ${centerClass}`.trim();
  }
}
