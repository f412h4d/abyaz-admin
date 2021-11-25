export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Built-in scalar representing an instant in time */
  Date: any;
  /** Unrepresentable type */
  UNREPRESENTABLE: any;
  /** Long type */
  Long: any;
};

export type Audit = {
  created?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  updated?: Maybe<Scalars['Date']>;
  verified: Scalars['Boolean'];
};

export type Cart = {
  __typename?: 'Cart';
  product?: Maybe<Product>;
  quantity?: Maybe<Scalars['Int']>;
};

export type File = Audit & {
  __typename?: 'File';
  created?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  updated?: Maybe<Scalars['Date']>;
  verified: Scalars['Boolean'];
};

/** Mutation root */
export type Mutation = {
  __typename?: 'Mutation';
  addProduct?: Maybe<Product>;
  deleteProduct?: Maybe<Product>;
  editProduct?: Maybe<Product>;
  signIn?: Maybe<User>;
  signUp?: Maybe<User>;
  submitOrder?: Maybe<Order>;
  submitRequest?: Maybe<User>;
  updateOrderStatus?: Maybe<Order>;
  updateRequestStatus?: Maybe<Request>;
  updateUserBillFile?: Maybe<User>;
  updateUserDebt?: Maybe<User>;
};

/** Mutation root */
export type MutationAddProductArgs = {
  details: Scalars['String'];
  isColor: Scalars['Boolean'];
  name: Scalars['String'];
  price: Scalars['Long'];
};

/** Mutation root */
export type MutationDeleteProductArgs = {
  productId: Scalars['String'];
};

/** Mutation root */
export type MutationEditProductArgs = {
  details?: Maybe<Scalars['String']>;
  isColor?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Long']>;
  productId: Scalars['String'];
};

/** Mutation root */
export type MutationSignInArgs = {
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
};

/** Mutation root */
export type MutationSignUpArgs = {
  companyName: Scalars['String'];
  fName: Scalars['String'];
  nationalId: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
};

/** Mutation root */
export type MutationSubmitOrderArgs = {
  address: Scalars['String'];
  city: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  productsInput: Array<Maybe<OrdersProductsInput>>;
  purchaseId: Scalars['String'];
  transit?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

/** Mutation root */
export type MutationSubmitRequestArgs = {
  userId: Scalars['String'];
};

/** Mutation root */
export type MutationUpdateOrderStatusArgs = {
  orderId: Scalars['String'];
  status: Scalars['Int'];
};

/** Mutation root */
export type MutationUpdateRequestStatusArgs = {
  requestId: Scalars['String'];
  status: Scalars['Int'];
};

/** Mutation root */
export type MutationUpdateUserBillFileArgs = {
  fileId: Scalars['String'];
  userId: Scalars['String'];
};

/** Mutation root */
export type MutationUpdateUserDebtArgs = {
  debt: Scalars['Long'];
  userId: Scalars['String'];
};

export type Order = Audit & {
  __typename?: 'Order';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['Date']>;
  details?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<Cart>>>;
  orderId?: Maybe<Scalars['Long']>;
  phoneNumber?: Maybe<Scalars['String']>;
  purchase?: Maybe<Purchase>;
  status?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
  transit?: Maybe<Scalars['String']>;
  updated?: Maybe<Scalars['Date']>;
  user?: Maybe<User>;
  verified: Scalars['Boolean'];
};

export type Product = Audit & {
  __typename?: 'Product';
  created?: Maybe<Scalars['Date']>;
  details?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isColor?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<File>;
  price?: Maybe<Scalars['Long']>;
  updated?: Maybe<Scalars['Date']>;
  verified: Scalars['Boolean'];
};

export type Purchase = Audit & {
  __typename?: 'Purchase';
  authority?: Maybe<Scalars['String']>;
  checked: Scalars['Boolean'];
  created?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  paid: Scalars['Boolean'];
  price?: Maybe<Scalars['Int']>;
  updated?: Maybe<Scalars['Date']>;
  userId?: Maybe<Scalars['String']>;
  verified: Scalars['Boolean'];
};

/** Query root */
export type Query = {
  __typename?: 'Query';
  allColors?: Maybe<Array<Maybe<Product>>>;
  allEssences?: Maybe<Array<Maybe<Product>>>;
  allOrders?: Maybe<Array<Maybe<Order>>>;
  allOrdersThisMonth?: Maybe<Array<Maybe<Order>>>;
  allPendingOrders?: Maybe<Array<Maybe<Order>>>;
  allProducts?: Maybe<Array<Maybe<Product>>>;
  allPurchases?: Maybe<Array<Maybe<Purchase>>>;
  allRequests?: Maybe<Array<Maybe<Request>>>;
  allUsers?: Maybe<Array<Maybe<User>>>;
  findFileById?: Maybe<File>;
  findOrderById?: Maybe<Order>;
  findProductById?: Maybe<Product>;
  findPurchaseById?: Maybe<Purchase>;
  findRequestById?: Maybe<Request>;
  findUserById?: Maybe<User>;
  findUserByNationalId?: Maybe<User>;
  findUserByPhoneNumber?: Maybe<User>;
};

/** Query root */
export type QueryFindFileByIdArgs = {
  fileId: Scalars['String'];
};

/** Query root */
export type QueryFindOrderByIdArgs = {
  orderId: Scalars['String'];
};

/** Query root */
export type QueryFindProductByIdArgs = {
  productId: Scalars['String'];
};

/** Query root */
export type QueryFindPurchaseByIdArgs = {
  purchaseId: Scalars['String'];
};

/** Query root */
export type QueryFindRequestByIdArgs = {
  requestId: Scalars['String'];
};

/** Query root */
export type QueryFindUserByIdArgs = {
  userId: Scalars['String'];
};

/** Query root */
export type QueryFindUserByNationalIdArgs = {
  nationalId: Scalars['String'];
};

/** Query root */
export type QueryFindUserByPhoneNumberArgs = {
  phoneNumber: Scalars['String'];
};

export type Request = Audit & {
  __typename?: 'Request';
  created?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  updated?: Maybe<Scalars['Date']>;
  user?: Maybe<User>;
  verified: Scalars['Boolean'];
};

export type User = Audit & {
  __typename?: 'User';
  FName?: Maybe<Scalars['String']>;
  bill?: Maybe<File>;
  companyName?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['Date']>;
  debt?: Maybe<Scalars['Long']>;
  id?: Maybe<Scalars['String']>;
  isRequestPending?: Maybe<Scalars['Boolean']>;
  nationalId?: Maybe<Scalars['String']>;
  orders?: Maybe<Array<Maybe<Order>>>;
  password?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  totalOrders?: Maybe<Scalars['Long']>;
  updated?: Maybe<Scalars['Date']>;
  verified: Scalars['Boolean'];
};

export type OrdersProductsInput = {
  productId?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
};
