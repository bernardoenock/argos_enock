import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Address } from '../../../../core/models/api.models';

@Component({
  selector: 'app-user-address',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent {
  @Input() address!: Address;
}
