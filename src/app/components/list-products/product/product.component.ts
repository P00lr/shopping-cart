import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../model/product.model';

@Component({
  selector: 'product',
  imports: [],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() addToCartEventEmitter = new EventEmitter();

  addToCart(product: Product): void {
    this.addToCartEventEmitter.emit(product);
  }
}
