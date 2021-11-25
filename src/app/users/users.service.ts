import {gql, Apollo} from 'apollo-angular';
import { Injectable } from '@angular/core';


import { User } from '../../types';

const ALL_USERS_QUERY = gql`
  query AllUsers {
    users: allUsers {
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

  allUsers() {
    return this.apollo.watchQuery<AllUsersResponse>({
      query: ALL_USERS_QUERY,
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
