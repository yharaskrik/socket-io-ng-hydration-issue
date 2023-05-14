import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { ApolloModule } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { SocketIoComponent } from './socket-io.component';
import { NgxStripeModule } from 'ngx-stripe';
import { NgxStripeComponent } from './ngx-stripe.component';

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
    ]),
  ],
};
