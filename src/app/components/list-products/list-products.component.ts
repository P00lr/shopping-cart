import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { ProductComponent } from './product/product.component';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'list-products',
  imports: [ProductComponent],
  templateUrl: './list-products.component.html',
})
export class ListProductsComponent implements OnInit {
  //si o si tiene que estar declarado de esta manera no con arrays vacio
  products!: Product[];
  
  constructor(
    //para poder mostrar los productos si no existen en OnInit
    private productService: ProductService,
    private sharingDataService: SharingDataService
  ) {
  }
  ngOnInit(): void {
      this.products = this.productService.findAll();
    
  }

  addToCart(newProduct: Product) {
    this.sharingDataService.productEventEmitter.emit(newProduct);
  }
  
}
