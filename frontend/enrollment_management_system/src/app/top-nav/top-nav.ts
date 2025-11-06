import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  imports: [],
  templateUrl: './top-nav.html',
  styleUrls: ['./top-nav.scss'],
})
export class TopNav {
  constructor(private router: Router) {}

  onSelect(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value) {
      this.router.navigate([value]);
    }
  }
}
