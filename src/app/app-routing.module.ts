import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'account',
        loadChildren: './auth/auth.module#AuthModule'
    },
    {
        path: 'categories',
        loadChildren: './categories/categories.module#CategoriesModule'
    },
    {
        path: 'products',
        loadChildren: './products/products.module#ProductsModule'
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
