import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../model/product.model';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'list-products',
  imports: [ProductComponent],
  templateUrl: './list-products.component.html',
  styles: ``
})
export class ListProductsComponent {
  @Input() products: Product[] = [];
  @Output() addToCartEventEmitter = new EventEmitter();

  addToCart(product: Product): void {
    this.addToCartEventEmitter.emit(product);
  }
}
