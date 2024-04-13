export interface Address {
  address: string;
  city: string;
  country: string;
  houseNo: string;
  state: string;
  street: string;
}

export interface User {
  address: Address;
  email: string;
  phoneNumber: string;
  status: number;
  username: string;
  avatar: string;
}
