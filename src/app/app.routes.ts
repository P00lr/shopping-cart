import { Routes } from '@angular/router';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ListProductsComponent } from './components/list-products/list-products.component';

/* aqui mapeamos los componentes y le damos una ruta*/
/* ahora en que parte de la aplicacion va a mostrar los componentes que estan enrutados a estas rutas */
export const routes: Routes = [
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'list-products', component: ListProductsComponent},
    /*va a redirigir solo cuando la ruta sea vacia a list-products */
    {path: '', redirectTo: '/list-products', pathMatch:'full'}
];
