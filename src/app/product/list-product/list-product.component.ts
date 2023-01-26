import { Component } from '@angular/core';
import { Product } from 'src/app/shared/classes/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { MessageService } from '../../shared/services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProductComponent } from '../delete-product/delete-product.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent {
  products: Product[] = [];
  displayedColumns = ['codigo', 'nome', 'categoria', "acao"];
  searchText: string = '';
  categorySelected: string = 'TODOS';

  constructor(private productService: ProductService,
    private messageService: MessageService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
    this.productService.getAll().subscribe(data => {
      this.products = data;
    })
  }

  deleteProduct(id: number): void {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      width: '450px',
      data: {id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
     });
  }

  findProducts(event: any){
    this.productService.getByCodigoAndCategoria(this.searchText, this.categorySelected).subscribe(
      {
        next: (res: Product[])=>{
          this.products = res;
        }, error: (err)=>{

        }
      }
    )
  }
}
