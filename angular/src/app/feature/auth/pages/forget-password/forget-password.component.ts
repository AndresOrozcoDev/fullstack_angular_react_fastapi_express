import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  forgetForm = new FormGroup({
    username: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private toastr: ToastrService) {}

  onForget() {
    const username = this.forgetForm.value.username || '';
    if (username) {
      this.router.navigate(['']);
      this.toastr.success('Operación exitosa', 'Éxito');
    } else {
      console.error('Form empty:', this.forgetForm.value);
      this.toastr.error('Error', 'Error');
    }
  }

}
