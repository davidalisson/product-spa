import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from '../classes/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ResolverProductResolver implements Resolve<boolean> {
  product: Product = {
    codigo: '',
    nome: '',
    categoria: ''
  };

  constructor(private router: Router, public productService: ProductService) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    let p1 = await new Promise((resolve, reject) => {
      const id = +route.queryParams['id'];
      this.productService.getById(id).subscribe({
        next: (res: Product[]) => {
          if (res?.length > 0) {
            this.product = res[0];
            resolve(this.product);
          }
        },
        error: (err) => {
          reject();
        },
      });
    }).then((val) => {});
    return this.product;
  }
}
