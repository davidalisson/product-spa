import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../classes/product';
import { EMPTY, empty, Observable, of } from 'rxjs';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { EMPTY_OBSERVER } from 'rxjs/internal/Subscriber';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient, private messageService: MessageService) {}

  async create(p: Product): Promise<Observable<Product>> {
    let codeExists = false;
    const p1 = await new Promise((resolve, reject)=>{
      this.getByCodigo(p.codigo).subscribe({
        next: (res: Product[])=>{
          if(res.length>0){
            codeExists = true;
            resolve(codeExists);
          } else {
            codeExists = false;
            resolve(codeExists);
          }
        }
      });
    }).then(val=>{});
    if(!codeExists){
      return this.http.post<Product>(this.baseUrl, p);
    }
    else{
      this.messageService.showWarning('Código de produto já existente.', 'Atenção')
      return EMPTY;
    }

  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getByCodigo(codigo: string): Observable<Product[]> {
    let url = `${this.baseUrl}?codigo=${codigo}`;
    return this.http.get<Product[]>(url);
  }

  getByCodigoAndCategoria(codigo: string, categoria: string): Observable<Product[]> {
    let url;
    if(codigo && categoria && !categoria.includes('TODOS')){
      url = `${this.baseUrl}?codigo=${codigo}&categoria=${categoria}`;
    } else if(!codigo && categoria && !categoria.includes('TODOS')){
      url = `${this.baseUrl}?categoria=${categoria}`;
    } else if(!codigo && categoria && categoria.includes('TODOS')){
      url = `${this.baseUrl}`;
    }else{
      url = `${this.baseUrl}?codigo=${codigo}`;
    }
    return this.http.get<Product[]>(url);
  }

  getById(id: number): Observable<Product[]> {
    let url = `${this.baseUrl}?id=${id}`;
    return this.http.get<Product[]>(url);
  }

  async update(produto: Product): Promise<Observable<Product>> {
    let url = `${this.baseUrl}/${produto.id}`;
    let codeExists = false;
    const p1 = await new Promise((resolve, reject)=>{
      this.getByCodigo(produto.codigo).subscribe({
        next: (res: Product[])=>{
          if(res.length>0){
            if(res[0].id === produto.id){
              codeExists = false;
              resolve(codeExists);
            } else {
              codeExists = true;
              resolve(codeExists);
            }
          } else {
            codeExists = false;
            resolve(codeExists);
          }
        }
      });
    }).then(val=>{});
    if(!codeExists){
      return this.http.put<Product>(url, produto);
    }
    else{
      this.messageService.showWarning('Código de produto já existente.', 'Atenção')
      return EMPTY;
    }
  }

  delete(id: number): Observable<Product> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url);
  }
}
