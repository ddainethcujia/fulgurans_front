import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { ViewComponent } from './componentes/view/view.component';
import { CrearPostComponent } from './componentes/crear-post/crear-post.component';

export const routes: Routes = [
    {
        path: 'home',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'feed',
        component: ViewComponent
    },
    {
        path: 'myposts',
        component: ViewComponent
    },
    {
        path: 'saved',
        component: ViewComponent
    },
    {
        path: 'createpost',
        component: CrearPostComponent
    },
    {
        path: 'editpost/:id',
        component: CrearPostComponent
    }
];
