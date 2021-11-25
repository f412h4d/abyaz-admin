import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignedInGuard } from './guards/signed-in.guard';

const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./sign-in/sign-in.module').then((m) => m.SignInPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canLoad: [SignedInGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersPageModule),
    canLoad: [SignedInGuard],
  },
  {
    path: 'requests',
    loadChildren: () =>
      import('./requests/requests.module').then((m) => m.RequestsPageModule),
    canLoad: [SignedInGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersPageModule),
    canLoad: [SignedInGuard],
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsPageModule),
    canLoad: [SignedInGuard],
  },
  {
    path: 'edit-product/:productId',
    loadChildren: () =>
      import('./edit-product/edit-product.module').then(
        (m) => m.EditProductPageModule
      ),
    canLoad: [SignedInGuard],
  },
  {
    path: 'order-details/:orderId',
    loadChildren: () =>
      import('./order-details/order-details.module').then(
        (m) => m.OrderDetailsPageModule
      ),
    canLoad: [SignedInGuard],
  },
  {
    path: 'edit-user/:userId',
    loadChildren: () =>
      import('./edit-user/edit-user.module').then((m) => m.EditUserPageModule),
    canLoad: [SignedInGuard],
  },
  {
    path: 'new-product',
    loadChildren: () =>
      import('./new-product/new-product.module').then(
        (m) => m.NewProductPageModule
      ),
    canLoad: [SignedInGuard],
  },
  {
    path: 'print/:orderId',
    loadChildren: () =>
      import('./print/print.module').then((m) => m.PrintPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
