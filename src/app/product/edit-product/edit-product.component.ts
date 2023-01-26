import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../shared/classes/product';
import { ProductService } from '../../shared/services/product.service';
import { MessageService } from '../../shared/services/message.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
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
  product: Product = {
    codigo: '',
    nome: '',
    categoria: ''
  };

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.data.subscribe(response => {
      this.product = response['data'];
      this.productFormGroup.patchValue({
        nome: this.product.nome,
        codigo: this.product.codigo,
        categoria: this.product.categoria,
      });
    });
  }

  ngOnInit(): void {

  }

  async update() {
    this.formSubmitted = true;
    if(this.formIsValid){
      const product = this.getBody();
      (await this.productService.update(product)).subscribe({
        next: (res) => {
          this.messageService.showSuccess('Sucesso', 'Produto atualizado com sucesso!');
          this.router.navigateByUrl('/produtos/lista');
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
      id: this.product.id,
      codigo: this.productFormGroup.value.codigo ? this.productFormGroup.value.codigo : '',
      nome: this.productFormGroup.value.nome ? this.productFormGroup.value.nome : '',
      categoria: this.productFormGroup.value.categoria ? this.productFormGroup.value.categoria : '',
    };
  }

  get form(): { [key: string]: AbstractControl } {
    return this.productFormGroup.controls;
  }
}
