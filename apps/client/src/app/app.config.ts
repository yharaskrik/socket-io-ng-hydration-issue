import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { SocketIoComponent } from './socket-io.component';
import { NgxStripeModule } from 'ngx-stripe';
import { NgxStripeComponent } from './ngx-stripe.component';
import { GraphqlSubscriptionComponent } from './graphql-subscription.component';
import { InMemoryCache } from '@apollo/client/core';
import { ApolloClientOptions } from '@apollo/client/core/ApolloClient';
import { isPlatformServer } from '@angular/common';
import { split } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { HttpLink } from 'apollo-angular/http';
import { createClient } from 'graphql-ws';
import { Operation } from '@apollo/client/link/core/types';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    importProvidersFrom(
      ApolloModule,
      HttpClientModule,
      NgxStripeModule.forRoot('test_123')
    ),
    provideRouter([
      {
        path: 'socket-io',
        component: SocketIoComponent,
      },
      {
        path: 'ngx-stripe',
        component: NgxStripeComponent,
      },
      {
        path: 'gql',
        component: GraphqlSubscriptionComponent,
      },
    ]),
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink): ApolloClientOptions<unknown> {
        // Create an http link:
        const http = httpLink.create({
          uri: 'http://localhost:3000/graphql',
        });

        const isSSR = isPlatformServer(inject(PLATFORM_ID));

        const test: (op: Operation) => boolean = ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        };

        if (isSSR) {
          const ws = () => null;

          return {
            link: split(test, ws, http),
            cache: new InMemoryCache(),
            ssrMode: isSSR,
          };
        }

        // Create a WebSocket link:
        const ws = new GraphQLWsLink(
          createClient({
            url: 'ws://localhost:3000/graphql',
            lazy: true,
            keepAlive: 10_000,
            connectionParams: (...args: any[]) => {
              console.log('Connection params', args);

              return {};
            },
            on: {
              connected: (socket, payload) => {
                console.log(socket, payload);
              },
              closed: (...args: any[]) => {
                console.log('closed', args);
              },
              ping: (...args: any[]) => {
                console.log('ping', args);
              },
              pong: (...args: any[]) => {
                console.log('pong', args);
              },
            },
          })
        );

        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        const link = split(test, ws, http);

        return {
          link,
          cache: new InMemoryCache(),
          ssrMode: isSSR,
        };
      },
      deps: [HttpLink],
    },
  ],
};
