import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app/app-routing.module';
import { AppComponent } from '../app/app.component';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/cart/cart.component';
import { CartModalComponent } from './component/cart-modal/cart-modal.component';
import { MenuItemModalComponent } from './component/menuItem-modal/menuItem-modal.component';
import { ProductsComponent } from './component/products/products.component';
import { provideHttpClient } from '@angular/common/http';
import { FilterPipe } from './shared/filter.pipe';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    CartModalComponent,
    MenuItemModalComponent,
    ProductsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot(),
    NgxSmartModalModule.forChild()
  ],
  providers: [provideHttpClient(), NgxSmartModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
