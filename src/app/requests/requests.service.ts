import {Apollo, gql} from 'apollo-angular';
import { Injectable } from '@angular/core';


import { Request } from '../../types';

const ALL_REQUESTS_QUERY = gql`
  query AllRequests {
    requests: allRequestsSorted {
      id
      user {
        id
        FName
      }
      status
      created
    }
  }
`;

interface AllRequestsResponse {
  requests: Request[];
}

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private apollo: Apollo) {}

  allRequests() {
    return this.apollo.watchQuery<AllRequestsResponse>({
      query: ALL_REQUESTS_QUERY,
    }).valueChanges;
  }
}
