import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { NavbarComponent } from "./navbar/navbar.component";
import { CartItems } from '../model/cart-items.model';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
/* agregado despues de instalarlo */
import Swal from 'sweetalert2';

@Component({
  selector: 'cart-app',
  imports: [
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  /* estos atributos lo vamos a compartir con los compoentes que esten enrutados */
  cartItems: CartItems[] = [];
  total!: number;
  //inyectamos los services
  constructor(
    private router: Router,
    private sharingDataService: SharingDataService,
  ) { }


  ngOnInit(): void {
    this.cartItems = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
    //no se ejecuta cuando se crea el componente si no que esta aqui para que se suscriba "escuche"
    //cuando ocurra algo recien va a hacer lo que esta en el metodo, solo escucha
    this.removeFromCart();
    this.addToCart();
  }
  addToCart(): void {
    this.sharingDataService.productEventEmitter.subscribe(newProduct => {
      const exists = this.cartItems.find(article => article.product.id === newProduct.id);
      if (exists) {
        this.cartItems = this.cartItems.map(article => {
          if (article.product.id === newProduct.id) {
            return {
              ...article,
              quantity: article.quantity + 1
            }
          }
          return article;
        })
      } else {
        this.cartItems = [
          ... this.cartItems,
          {
            product: {
              ...newProduct
            },
            quantity: 1
          }]
      }
      this.calculateTotal();
      this.saveSession();
      //para redirigir a otra ruta
      //con state tambien le paso los datos a la ruta al componente shopping-cart
      // las variables deben ser la misma que quien lo recibe en este caso shopping cart
      this.router.navigate(
        ['/shopping-cart'], {
        state: { cartItems: this.cartItems, total: this.total }
      });
      Swal.fire({
        title: "Carito de compra",
        text: "se agrego correctamente al carrito",
        icon: "success"
      });
    });
  }
  calculateTotal(): void {
    this.total = this.cartItems.reduce((total, article) => total + (article.product.price * article.quantity), 0)
  }
  //solo se suscribio "escuchando" cuando hagan algo den click en los otros compontes aqui llega el id y hace su trabajo
  removeFromCart(): void {
    //obtenemos el id y nos suscribimos aqui recibimos el id cuando se emite en la otra parte y lo usamos abajo
    this.sharingDataService.idProductEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Estas seguro que desea eliminar?",
        text: "el producto se borrara del carrito!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          /* -------------------------------------- */
          //solo se ejecuta cuando se hace clic en el boton eliminar en el otro componente
          console.log(id + ' se ejecuto el evento idProductEventEmitter');
          this.cartItems = this.cartItems.filter(article => article.product.id !== id);
          this.calculateTotal();
          this.saveSession();

          //se hace esto para que refresque la pagina y se vea que se elimino el articulo
          //como no puede redireccionar a la misma pagina, esto lo que hace es ir a la pagina base
          //y volver en automatico nuevamente a la urta shopping-cart y que se vea el cambio al eliminar
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            //es exactamente lo mismo que en addToCart
            //no se puede redireccionar asi misma por eso se necesita lo de arriba
            this.router.navigate(
              ['/shopping-cart'], {
              state: { cartItems: this.cartItems, total: this.total }
            });
          })
          /* ------------------------------------------- */
          Swal.fire({
            title: "Eliniando!",
            text: "Eliminado correctamente",
            icon: "success"
          });
        }
      });


    })
  }
  //el nombre 'cart' se lo doy aqui, el mismo nombre debo usar en OnInit
  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
