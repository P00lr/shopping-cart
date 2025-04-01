import { Component, OnInit } from '@angular/core';
import { CartItems } from '../../model/cart-items.model';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { ItemsState } from '../../store/items.reducer';
import { total } from '../../store/items.actions';

@Component({
  selector: 'shopping-cart',
  imports: [],
  templateUrl: './shopping-cart.component.html',
})
//este componente es hermano de cart-app y navbar e igual se puede pasar informacion sin ser hijo o padre
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItems[] = [];  
  total: number = 0;


  //aqui le estamos pasando los cartItems mediante el estado de las rutas "pasando datos mediante ruta"
  // ya no depende de @input
  constructor(
    private sharingDataService:  SharingDataService,
    private store: Store<{items: ItemsState}>
  ) {
    //aqui obtenemos los datos desde el reducer
    this.store.select('items').subscribe(state => {
      this.cartItems = state.items;
      this.total = state.total;
    });
    //pasando el total de navbar a shoppingCart 
  }
  ngOnInit(): void {
    //para que no se borre el total al actualizar
   // this.store.dispatch(total());
  }

  removeFromCart(id: number): void {
    //el idProductEventEmitter llama al metodo get que esta en SharingDataService
    //esto emite para quien quiera usarlo
    this.sharingDataService.idProductEventEmitter.emit(id);
  }
}
