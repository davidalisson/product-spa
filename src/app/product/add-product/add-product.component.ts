import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../shared/classes/product';
import { ProductService } from '../../shared/services/product.service';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

  productFormGroup: FormGroup = new FormGroup({
    codigo: new FormControl('', Validators.compose([
      Validators.required,
    ])),
    nome: new FormControl('', Validators.compose([
      Validators.required
    ])),
    categoria: new FormControl('', Validators.compose([
      Validators.required
    ])),
  });;

  formSubmitted = false;
  codeExists = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {

  }

  async getByCodigo(codigo: string){
    await this.productService.getByCodigo(codigo).subscribe(
      {
        next: (res: Product[])=>{
          if(res.length > 0){
            this.codeExists = true;
          }
        }
      }
    )
  }

  async create() {
    this.formSubmitted = true;
    if(this.formIsValid){
      const product = this.getBody();
        (await this.productService.create(product)).subscribe({
          next: (res) => {
            if (res){
              this.messageService.showSuccess('Sucesso', 'Produto criado com sucesso!');
              this.productFormGroup.reset()
            }
          }, error: (err) => {
            this.messageService.showSuccess('Falha ao salvar produto', 'Tente novamente mais tarde');
          }
        });
    } else {
      this.messageService.showWarning('Atenção', 'O dados informados são inválidos. Verifique-os e tente novamente.')
    }

  }

  get formIsValid(): boolean {
    // const addressForm = this.pfFormGroup.controls.nestedForm;
    // return (this.pfFormGroup.valid && addressForm.valid);
    return (this.productFormGroup.valid);
  }

  getBody(): Product {
    return {
      codigo: this.productFormGroup.value.codigo ? this.productFormGroup.value.codigo : '',
      nome: this.productFormGroup.value.nome ? this.productFormGroup.value.nome : '',
      categoria: this.productFormGroup.value.categoria ? this.productFormGroup.value.categoria : '',
    };
  }

  get form(): { [key: string]: AbstractControl } {
    return this.productFormGroup.controls;
  }
}
