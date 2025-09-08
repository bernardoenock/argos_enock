import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled: boolean = false;
  @Input() loading: boolean | null = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() fullWidth: boolean = false;

  @Output() clicked = new EventEmitter<MouseEvent>();

  ngOnInit(): void {}

  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }

  getButtonClasses(): string {
    const baseClasses = 'btn';
    const variantClass = `btn-${this.variant}`;
    const sizeClass = this.getSizeClass();
    const widthClass = this.fullWidth ? 'w-full' : '';

    return `${baseClasses} ${variantClass} ${sizeClass} ${widthClass}`.trim();
  }

  private getSizeClass(): string {
    switch (this.size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  }
}
