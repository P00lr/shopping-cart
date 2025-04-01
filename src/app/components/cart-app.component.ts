import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { CartItems } from '../model/cart-items.model';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
/* agregado despues de instalarlo */
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ItemsState } from '../store/items.reducer';
import { add, remove, total } from '../store/items.actions';

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
  
  //inyectamos los services
  constructor(
    //en llaves colocamos el mismo nombre de appconfig y el tipo de dato del initialState es de itemsReducer
    private store: Store<{ items: ItemsState }>,
    private router: Router,
    private sharingDataService: SharingDataService,
  ) {
    //inicializamos los atributos desde el reducer
    this.store.select('items').subscribe(state => {
      this.cartItems = state.items;
      //cada que cambia el estado se guarda la session por que se dispara el store.select('items')
      this.saveSession();
      console.log('cambio el estado');
    })
  }


  ngOnInit(): void {
    //para que se haga esta accion que va al reducer y luego viene al constructor al select('items') y hace lo demas
    this.removeFromCart();
    this.addToCart();
    this.store.dispatch(total());
  }
  addToCart(): void {
    this.sharingDataService.productEventEmitter.subscribe(product => {
      //add({ product: newProduct }) si tiene el mismo nombre se puede omitir repetirlo como abajo
      //le estoy pasando por parametro el product a add
      this.store.dispatch(add({ product }))

      //este no tiene parametros
      this.store.dispatch(total());

      //para redirigir a otra ruta
      //con state tambien le paso los datos a la ruta al componente shopping-cart
      // las variables deben ser la misma que quien lo recibe en este caso shopping cart
      this.router.navigate(
        ['/shopping-cart']);

    });
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
          this.store.dispatch(remove({ id }));
          this.store.dispatch(total());

          this.router.navigate(['/shopping-cart']);

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
