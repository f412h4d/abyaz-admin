import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

import { User } from '../../types';

const ALL_USERS_QUERY = gql`
  query AllUsers($fName: String!) {
    users: allUsers(fName: $fName) {
      id
      FName
      debt
      totalOrders
      created
    }
  }
`;

const FIND_USER_BY_ID_QUERY = gql`
  query findUserById($userId: String!) {
    user: findUserById(userId: $userId) {
      id
      FName
      debt
      orders {
        id
        orderId
        purchase {
          price
        }
        created
      }
    }
  }
`;

const UPDATE_USER_DEBT = gql`
  mutation UpdateUserDebt($userId: String!, $debt: Long!) {
    user: updateUserDebt(userId: $userId, debt: $debt) {
      id
      debt
    }
  }
`;

interface AllUsersResponse {
  users: User[];
}

interface Response {
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apollo: Apollo) {}

  allUsers(fName: string) {
    return this.apollo.watchQuery<AllUsersResponse>({
      query: ALL_USERS_QUERY,
      variables: {
        fName,
      },
    }).valueChanges;
  }

  findUserById(userId: string) {
    return this.apollo.watchQuery<Response>({
      query: FIND_USER_BY_ID_QUERY,
      variables: {
        userId,
      },
    }).valueChanges;
  }

  updateUserDebt(userId: string, debt: number) {
    return this.apollo.mutate<Response>({
      mutation: UPDATE_USER_DEBT,
      variables: {
        debt,
        userId,
      },
    });
  }
}
