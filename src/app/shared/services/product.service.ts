import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../classes/product';
import { EMPTY, Observable } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = 'http://localhost:3000/produtos';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /**
   * Essa função cria um novo produto na base, verificando antes da criação se o código é único ou não
   * @param p objeto de produto
   * @returns retorna sucesso caso o produto seja inserido, ou retorna vazio caso o código já exista na base
   */
  async create(p: Product): Promise<Observable<Product>> {
    let codeExists = false;
    const p1 = await new Promise((resolve, reject) => {
      this.getByCodigo(p.codigo).subscribe({
        next: (res: Product[]) => {
          if (res.length > 0) {
            codeExists = true;
            resolve(codeExists);
          } else {
            codeExists = false;
            resolve(codeExists);
          }
        },
      });
    }).then((val) => {});
    if (!codeExists) {
      return this.http.post<Product>(this.baseUrl, p);
    } else {
      this.messageService.showWarning(
        'Código de produto já existente.',
        'Atenção'
      );
      return EMPTY;
    }
  }
  /**
   * Essa função get retorna todos os produtos
   * @returns retorna todos os produtos
   */
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  /**
   * Essa função get retorna um produtos pelo código
   * @param codigo código do produto
   * @returns retorna o produto pelo código
   */
  getByCodigo(codigo: string): Observable<Product[]> {
    let url = `${this.baseUrl}?codigo=${codigo}`;
    return this.http.get<Product[]>(url);
  }

  /**
   * Essa função get retorna produtos de acordo com os parâmetros passados
   * @param codigo código do produto
   * @param categoria categoria do produto
   * @returns retorna uma lista de produtos de acordo com o código e a categoria informada
   */
  getByCodigoAndCategoria(
    codigo: string,
    categoria: string
  ): Observable<Product[]> {
    let url;
    if (codigo && categoria && !categoria.includes('TODOS')) {
      url = `${this.baseUrl}?codigo=${codigo}&categoria=${categoria}`;
    } else if (!codigo && categoria && !categoria.includes('TODOS')) {
      url = `${this.baseUrl}?categoria=${categoria}`;
    } else if (!codigo && categoria && categoria.includes('TODOS')) {
      url = `${this.baseUrl}`;
    } else {
      url = `${this.baseUrl}?codigo=${codigo}`;
    }
    return this.http.get<Product[]>(url);
  }

  /**
   * Essa função get retorna um produtos pelo id
   * @param id id do produto
   * @returns retorna o produto pelo id
   */
  getById(id: number): Observable<Product[]> {
    let url = `${this.baseUrl}?id=${id}`;
    return this.http.get<Product[]>(url);
  }

  /**
   * Essa função atualiza o produto na base, verificando antes da atualização se o código é único ou não
   * @param produto objeto de produto
   * @returns retorna sucesso caso o produto seja inserido, ou retorna vazio caso o código já exista na base
   */
  async update(produto: Product): Promise<Observable<Product>> {
    let url = `${this.baseUrl}/${produto.id}`;
    let codeExists = false;
    const p1 = await new Promise((resolve, reject) => {
      this.getByCodigo(produto.codigo).subscribe({
        next: (res: Product[]) => {
          if (res.length > 0) {
            if (res[0].id === produto.id) {
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
        },
      });
    }).then((val) => {});
    if (!codeExists) {
      return this.http.put<Product>(url, produto);
    } else {
      this.messageService.showWarning(
        'Código de produto já existente.',
        'Atenção'
      );
      return EMPTY;
    }
  }

  /**
   * Essa função deleta o produto na base
   * @param id id do produto
   * @returns retorna sucesso caso o produto seja deletado
   */
  delete(id: number): Observable<Product> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url);
  }
}
