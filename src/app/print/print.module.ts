import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/shared/shared.module';
import { PrintPageRoutingModule } from './print-routing.module';
import { PrintPage } from './print.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrintPageRoutingModule,
    SharedModule,
  ],
  declarations: [PrintPage],
})
export class PrintPageModule {}
