import { createReducer, on } from "@ngrx/store";
import { CartItems } from "../model/cart-items.model";
import { add, remove, total } from "./items.actions";

//simplemente le damos un modelo "clase" le damos un tipado o igual funciono pero seria de tipo any
export interface ItemsState {
    items: CartItems[];
    total: number;
}

export const initialState: ItemsState = {
    //lo sacamos de OnInit, este va a ser el estado inicial
    items: JSON.parse(sessionStorage.getItem('cart') || '[]') as CartItems[],// <-- Convertir explícitamente a array
    total: 0,

}
//(item: CartItems) entre "()" por que se esta emitiendo y le decimos de que tipo es,
// que es de cartItem la variable item

// y esto ahora devolveria un objeto de tipo ItemsState para que todo encaje que lleva el total y items
//por eso todo el return se envuelve en {items: aqui va todo el contenido } y el total por que es de tipo ItemsState
export const itemsReducer = createReducer(
    initialState,
    on(add, (state, { product }) => {
        const hasItems = state.items.find((item: CartItems) => item.product.id === product.id);
        if (hasItems) {
            return {
                items: state.items.map((item: CartItems) => {
                    if (item.product.id === product.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                    return item;
                }),
                total: state.total
            }//aqui cierra la llave para completar el tipo 
        } else {
            return {//aqui tambien envuelvo para devolver el tipo de dato ItemsState
                items: [...state.items, { product: { ...product }, quantity: 1 }],
                total: state.total
            };

        }
    }),
    //lo desestructuramos el payload y simplemente usamos llaves {id}
    //usando payload seria (state, payload.id)
    on(remove, (state, {id}) => {
        return {
            items: state.items.filter(article => article.product.id !== id),
            total: state.total
        }
    }),
    on(total, state => {
        return {
            items: state.items,
            total: state.items.reduce((accumulator, item) => accumulator + (item.product.price * item.quantity), 0)
        }
    })
)

//NOTA: CON EL TOTAL NO SE HACE NADA EN addToCart ni en removeFromCart, SOLO LO TRABAJAMOS EN TOTA AL FINAL
//AQUI NO SE DEBE GUARDAR LA SESSION, SOLO MANEJO DE ESTADO