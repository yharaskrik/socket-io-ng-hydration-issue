import { ApplicationRef, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'apollo-ng-hydration-issue-repro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, RouterLink],
})
export class AppComponent {
  constructor() {
    inject(ApplicationRef).isStable.subscribe(console.warn);
  }
}
