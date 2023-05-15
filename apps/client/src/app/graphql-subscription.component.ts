import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'apollo-ng-hydration-issue-repro-gql-sub',
  template: ` <div>{{ val | async | json }}</div>`,
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
})
export class GraphqlSubscriptionComponent {
  readonly val = this.apollo.subscribe({
    query: gql`
      subscription postsAdded {
        postAdded {
          id
        }
      }
    `,
  });

  constructor(private readonly apollo: Apollo) {}
}
