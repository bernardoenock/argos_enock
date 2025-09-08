import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.css']
})
export class StatisticsCardComponent {
  @Input() title: string = '';
  @Input() count: number = 0;
  @Input() color: 'blue' | 'green' | 'purple' = 'blue';
}
