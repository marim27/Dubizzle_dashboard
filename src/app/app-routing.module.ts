import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LoginComponent } from './Components/login/login.component';
import { LogoutComponent } from './Components/logout/logout.component';
import { authGuard } from './Guards/auth.guard';
import { MainComponent } from './Components/main/main.component';

const routes: Routes = [

  {path:'', component:MainComponent, children:[
    {path: '',redirectTo: '/Home',pathMatch: 'full'},
    { path: 'Home', component: DashboardComponent, title: "Home" ,canActivate: [authGuard]},
    { path: 'logout', component: LogoutComponent, title: "logout" },
    {
      path: 'packages' ,canActivate: [authGuard],
      loadChildren: () => import('./Components/packages/packages.module').then(m => m.PackagesModule)
    },
    {
      path: 'locations' ,canActivate: [authGuard],
      loadChildren: () => import('./Components/locations/locations.module').then(m => m.LocationsModule)
    },
    {
      path: 'Categories' ,canActivate: [authGuard],
      loadChildren: () => import('src/app/Components/categories/categories.module').then(m => m.CategoriesModule)
    }, {
      path: 'subcategories' ,canActivate: [authGuard],
      loadChildren: () => import('./Components/sub-categories/sub-categories.module').then(m => m.SubCategoriesModule)
    },
     {
        path: 'users' ,canActivate: [authGuard],
        loadChildren: () => import('./Components/users/users.module').then(m => m.UsersModule)
    },
    {
       path: 'products',canActivate: [authGuard],
       loadChildren: () => import('./Components/product/product.module').then(m => m.ProductModule)
   },
    {
      path: 'admins' ,canActivate: [authGuard],
      loadChildren: () => import('./Components/admins/admins.module').then(m => m.AdminsModule)
    },
  ]},
  { path: 'login', component: LoginComponent, title: "login" },
    { path: '**', component: NotFoundComponent, title: 'Page not found' },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

