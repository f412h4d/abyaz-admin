import {Apollo, gql} from 'apollo-angular';
import { Injectable } from '@angular/core';


import { Product } from '../../types';

const ALL_PRODUCTS_QUERY = gql`
  query AllProducts {
    products: allProducts {
      id
      name
      details
      isColor
      price
    }
  }
`;

const FIND_PRODUCT_BY_ID_QUERY = gql`
  query ProductById($productId: String!) {
    product: findProductById(productId: $productId) {
      id
      name
      details
      isColor
      price
      picture {
        id
        path
      }
    }
  }
`;

const ADD_PRODUCT_MUTATION = gql`
  mutation AddProduct(
    $name: String!
    $details: String!
    $price: Long!
    $isColor: Boolean!
  ) {
    product: addProduct(
      name: $name
      details: $details
      price: $price
      isColor: $isColor
    ) {
      id
      name
      details
      isColor
      price
      picture {
        id
        path
      }
    }
  }
`;

const EDIT_PRODUCT_MUTATION = gql`
  mutation EditProduct(
    $productId: String!
    $name: String!
    $details: String!
    $price: Long!
    $isColor: Boolean!
  ) {
    product: editProduct(
      productId: $productId
      name: $name
      details: $details
      price: $price
      isColor: $isColor
    ) {
      id
      name
      details
      isColor
      price
      picture {
        id
        path
      }
    }
  }
`;

const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($productId: String!) {
    product: deleteProduct(productId: $productId) {
      id
      name
    }
  }
`;

interface AllProductsResponse {
  products: Product[];
}

interface ProductResponse {
  product: Product;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apollo: Apollo) {}

  allProducts() {
    return this.apollo.watchQuery<AllProductsResponse>({
      query: ALL_PRODUCTS_QUERY,
    }).valueChanges;
  }

  findProductById(productId: string) {
    return this.apollo.watchQuery<ProductResponse>({
      query: FIND_PRODUCT_BY_ID_QUERY,
      variables: {
        productId,
      },
    }).valueChanges;
  }

  addProduct(name: string, details: string, price: number, isColor: boolean) {
    return this.apollo.mutate<ProductResponse>({
      mutation: ADD_PRODUCT_MUTATION,
      variables: {
        name,
        details,
        price,
        isColor,
      },
    });
  }

  editProduct(
    productId: string,
    name: string,
    details: string,
    price: number,
    isColor: boolean
  ) {
    return this.apollo.mutate<ProductResponse>({
      mutation: EDIT_PRODUCT_MUTATION,
      variables: {
        productId,
        name,
        details,
        price,
        isColor,
      },
    });
  }

  deleteProduct(productId: string) {
    return this.apollo.mutate<ProductResponse>({
      mutation: DELETE_PRODUCT_MUTATION,
      variables: {
        productId,
      },
    });
  }
}
