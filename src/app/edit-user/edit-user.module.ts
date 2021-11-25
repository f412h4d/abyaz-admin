import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {EditUserPageRoutingModule} from './edit-user-routing.module';

import {EditUserPage} from './edit-user.page';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EditUserPageRoutingModule,
        SharedModule
    ],
    providers: [DecimalPipe],
    declarations: [EditUserPage]
})
export class EditUserPageModule {
}
