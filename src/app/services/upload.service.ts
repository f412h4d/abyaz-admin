import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Product} from '../../types';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    updateProductPictureUrl = 'https://api.abyazshimi.ir/update-product-picture/';

    constructor(private https: HttpClient) {
    }

    updateProductPicture(file: File, productId: string) {
        const data: FormData = new FormData();
        data.append('productId', productId);
        data.append('productPicture', file);
        const newRequest = new HttpRequest('POST', this.updateProductPictureUrl, data, {
            reportProgress: true,
        });
        return this.https.request<Product>(newRequest);
    }
}
