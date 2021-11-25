import {Apollo, gql} from 'apollo-angular';
import { Injectable } from '@angular/core';


import { Order, Request } from '../../types';

const HOME_QUERY = gql`
  query HomeQuery {
    orders: allPendingOrders {
      id
    }
    requests: allPendingRequests {
      id
    }
  }
`;

interface HomeResponse {
  orders: Order[];
  requests: Request[];
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private apollo: Apollo) {}

  homeData() {
    return this.apollo.watchQuery<HomeResponse>({
      query: HOME_QUERY,
    }).valueChanges;
  }
}
