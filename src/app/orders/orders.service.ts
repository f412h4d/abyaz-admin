import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

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

const UPDATE_ORDERS_STATUS = gql`
  mutation UpdateOrdersStatus($orderIds: [String]!, $status: Int!) {
    orders: updateOrdersStatus(orderIds: $orderIds, status: $status) {
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

const DELETE_SELECTED_ORDERS_MUTATION = gql`
  mutation DeleteOrders($orderIds: [String]!) {
    products: deleteOrders(orderIds: $orderIds) {
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

const DELETE_ORDER_MUTATION = gql`
  mutation DeleteOrder($orderId: String!) {
    products: deleteOrder(orderId: $orderId) {
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

  updateOrdersStatus(orderIds: string[], status: number) {
    return this.apollo.mutate<AllOrdersResponse>({
      mutation: UPDATE_ORDERS_STATUS,
      variables: {
        orderIds,
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

  deleteOrders(orderIds: string[]) {
    return this.apollo.mutate<AllOrdersResponse>({
      mutation: DELETE_SELECTED_ORDERS_MUTATION,
      variables: {
        orderIds,
      },
    });
  }
}
