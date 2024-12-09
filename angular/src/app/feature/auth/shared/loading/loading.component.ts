import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingService } from '@auth/services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

  isLoading = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe((state) => {
      this.isLoading = state;
    });
  }

}
