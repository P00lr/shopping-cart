import { createAction, props } from "@ngrx/store";
import { Product } from "../model/product.model";

//en el props lleva () por que es una funcion
export const add = createAction('add', props<{product: Product}>() );
export const remove = createAction('remove', props<{id: number}>());
export const total = createAction('total');
//para varias en lugar de props<{products: Product}>() usamos any mas generico
export const load = createAction('load', props<{products: any}>());

