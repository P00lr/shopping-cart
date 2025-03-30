import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
//uno emite y el otro se suscribe
export class SharingDataService {
  
  //como va a ser id le pongo de tipo number
  private _idProductEventEmitter: EventEmitter<number> = new EventEmitter();
  private _productEventEmitter: EventEmitter<Product> = new EventEmitter();

  constructor() { }

  //para eliminar el producto
  get idProductEventEmitter(): EventEmitter<number> {
    return this._idProductEventEmitter;
  }
  //para agregar al carrito
  get productEventEmitter(): EventEmitter<Product> {
    return this._productEventEmitter;
  }
}
