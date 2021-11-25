import { User } from './../../types';
import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';

import { Order } from '../../types';

const ALL_ORDERS_QUERY = gql`
  query AllOrders {
    orders: allOrdersSorted {
      id
      user {
        id
        FName
      }
      purchase {
        id
      }
      orderId
      status
      total
      created
    }
  }
`;

const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($orderId: String!, $status: Int!) {
    updateOrderStatus(orderId: $orderId, status: $status) {
      id
    }
  }
`;

const FIND_ORDER_BY_ID_QUERY = gql`
  query FindOrderById($orderId: String!) {
    order: findOrderById(orderId: $orderId) {
      id
      user {
        id
        FName
      }
      items {
        product {
          id
          name
          price
        }
        quantity
      }
      orderId
      status
      total
      address
      details
      city
      phoneNumber
      transit
      created
    }
  }
`;

const DELETE_ORDER_MUTATION = gql`
  mutation DeleteOrder($orderId: String!) {
    product: deleteOrder(orderId: $orderId) {
      id
      user {
        FName
      }
    }
  }
`;

interface AllOrdersResponse {
  orders: Order[];
}

interface OrderResponse {
  order: Order;
}

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private apollo: Apollo) {}

  allOrders() {
    return this.apollo.watchQuery<AllOrdersResponse>({
      query: ALL_ORDERS_QUERY,
    }).valueChanges;
  }

  updateOrderStatus(orderId: string, status: number) {
    return this.apollo.mutate({
      mutation: UPDATE_ORDER_STATUS,
      variables: {
        orderId,
        status,
      },
    });
  }

  findOrderById(orderId: string) {
    return this.apollo.watchQuery<OrderResponse>({
      query: FIND_ORDER_BY_ID_QUERY,
      variables: {
        orderId,
      },
    }).valueChanges;
  }

  deleteOrder(orderId: string) {
    return this.apollo.mutate<OrderResponse>({
      mutation: DELETE_ORDER_MUTATION,
      variables: {
        orderId,
      },
    });
  }
}
