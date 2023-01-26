import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './list-product/list-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ResolverProductResolver } from '../shared/services/resolver-product.resolver';

const routes: Routes = [
  {
    path: 'lista',
    component: ListProductComponent
  },
  {
    path: 'novo',
    component: AddProductComponent
  },
  {
    path: 'editar',
    component: EditProductComponent,
    resolve: {
      data: ResolverProductResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
