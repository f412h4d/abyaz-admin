import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { Order, Request } from "../../types";

const HOME_QUERY = gql`
  query HomeQuery {
    isActive: appActive
    orders: allPendingOrders {
      id
    }
    #    requests: allPendingRequests {
    #      id
    #    }
  }
`;

const SWITCH_IS_ACTIVE_MUTATION = gql`
  mutation SwitchIsActive {
    isActive: switchIsActive
  }
`;

interface HomeResponse {
  isActive: boolean;
  orders: Order[];
  requests: Request[];
}

interface SwitchResponse {
  isActive: boolean;
}

@Injectable({
  providedIn: "root",
})
export class HomeService {
  constructor(private apollo: Apollo) {}

  homeData() {
    return this.apollo.watchQuery<HomeResponse>({
      query: HOME_QUERY,
      fetchPolicy: "network-only",
    }).valueChanges;
  }

  switchIsActive() {
    return this.apollo.mutate<SwitchResponse>({
      mutation: SWITCH_IS_ACTIVE_MUTATION,
      fetchPolicy: "no-cache",
    });
  }
}
