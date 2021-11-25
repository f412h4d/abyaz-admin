import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NewProductPageRoutingModule} from './new-product-routing.module';

import {NewProductPage} from './new-product.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NewProductPageRoutingModule
    ],
    providers: [DecimalPipe],
    declarations: [NewProductPage]
})
export class NewProductPageModule {
}
