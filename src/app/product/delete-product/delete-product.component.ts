import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/shared/classes/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { MessageService } from '../../shared/services/message.service';
@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss'],
})
export class DeleteProductComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe({
      next: (res) => {
        this.messageService.showSuccess(
          'Sucesso',
          'Produto deletado com sucesso'
        );
       this.close();
      },
      error: (err) => {
        this.messageService.showSuccess(
          'Falha ao deletar produto',
          'Tente novamente mais tarde'
        );
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
