import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditProductPage} from './edit-product.page';

const routes: Routes = [
    {
        path: '',
        component: EditProductPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EditProductPageRoutingModule {
}
