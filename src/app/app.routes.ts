import { Routes } from '@angular/router';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

/* aqui mapeamos los componentes y le damos una ruta*/
/* ahora en que parte de la aplicacion va a mostrar los compoentes que estan enrutados a las rutas */
export const routes: Routes = [
    { path: 'shopping-cart', component: ShoppingCartComponent }
];
