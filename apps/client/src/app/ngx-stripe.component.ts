import { ApplicationRef, Component, inject } from '@angular/core';
import { StripeService } from 'ngx-stripe';
import { filter } from 'rxjs';

@Component({
  selector: 'apollo-ng-hydration-issue-repro-ngx-stripe',
  template: ``,
  standalone: true,
})
export class NgxStripeComponent {
  readonly stripe = inject(StripeService);

  constructor() {
    performance.mark('stripe');

    inject(ApplicationRef)
      .isStable.pipe(filter((stable) => stable))
      .subscribe(() => {
        console.log(
          'Injecting stripe caused stable to take:',
          performance.mark('stripe').duration
        );
      });
  }
}
