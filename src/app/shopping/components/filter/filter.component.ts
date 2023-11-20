import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  private route = inject(Router);
  handleSearch(search: string) {
    this.route.navigate(['/'], { queryParams: { q: search } });
  }
}
