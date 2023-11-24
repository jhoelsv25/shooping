import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLinkWithHref } from '@angular/router';
import { HeaderComponent } from '../../layouts/header/header.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  templateUrl: './filter.component.html',
  imports: [CommonModule, RouterLinkWithHref, HeaderComponent],
})
export class FilterComponent {
  private route = inject(Router);
  handleSearch(search: string) {
    this.route.navigate(['/'], { queryParams: { q: search } });
  }
}
