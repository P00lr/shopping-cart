import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product.model';
import { ListProductsComponent } from "./list-products/list-products.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { CartItems } from '../model/cart-items.model';
import { CartModalComponent } from './cart-modal/cart-modal.component';

@Component({
  selector: 'cart-app',
  imports: [
    ListProductsComponent,
    NavbarComponent,
    CartModalComponent,
  ],
    
  templateUrl: './cart-app.component.html',
  styles: ``
})
export class CartAppComponent implements OnInit{
  products: Product[] = [];
  showCart: boolean = false;
  cartItems: CartItems[] = [];
  total!: number;
  constructor(private productoService: ProductService) {}


  ngOnInit(): void {
    this.products = this.productoService.findAll();
    this.cartItems = JSON.parse(sessionStorage.getItem('cart') || '[]');
  }
  openCloseCart(): void {
    this.showCart = !this.showCart;
  }
  addToCart(newProduct: Product): void {
    const exists = this.cartItems.find(article => article.product.id === newProduct.id);
    if(exists) {
      this.cartItems = this.cartItems.map(article => {
        if(article.product.id === newProduct.id) {
          return {
            ... article,
            quantity: article.quantity + 1
          }
        }
        return article;
      })
    }else {
      this.cartItems = [
        ... this.cartItems,
        { product: {
          ... newProduct
        },
           quantity: 1
        }]
    }
    this.calculateTotal();
    this.saveSession();
  }
  calculateTotal(): void {
    this.total = this.cartItems.reduce((total, article) => total + (article.product.price * article.quantity), 0)
  }
  removeFromCart(id: number): void {
    this.cartItems = this.cartItems.filter(article => article.product.id !== id);
    this.calculateTotal();
    this.saveSession();
  }
  //el nombre 'cart' se lo doy aqui
  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
