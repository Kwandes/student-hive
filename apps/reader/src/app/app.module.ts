import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { authInterceptorProviders } from './shared/helpers/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
