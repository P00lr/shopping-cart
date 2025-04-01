import { createReducer, on } from "@ngrx/store";
import { load } from "./items.actions";

//por eso usamos el tipo any en list-products
const products: any = [];

const initialState = {
    //products: products si tienen el mismo nombre se deja solo uno
    products
} 

export const productsReducer = createReducer(
    initialState,
    on(load, (state, {products}) => {
        return {
            products: [... products]
        }
    })
)