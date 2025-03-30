import { Component, Input, Output } from '@angular/core';
import { CartItems } from '../../model/cart-items.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() cartItems: CartItems[] = [];
  @Input() total: number = 0;
  

}
