import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastr: ToastrService) { }

  showSuccess(msg: string, title: string) {
    this.toastr.success(msg, title);
  }

  showError(msg: string, title: string) {
    this.toastr.error(msg, title);
  }

  showWarning(msg: string, title: string) {
    this.toastr.warning(msg, title);
  }
}
