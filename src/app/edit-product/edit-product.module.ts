import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {EditProductPageRoutingModule} from './edit-product-routing.module';

import {EditProductPage} from './edit-product.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditProductPageRoutingModule
    ],
    providers: [DecimalPipe],
    declarations: [EditProductPage]
})
export class EditProductPageModule {
}
