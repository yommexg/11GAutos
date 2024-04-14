export interface Address {
  houseNo?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface User {
  address?: Address;
  email?: string;
  phoneNumber?: string;
  status?: number;
  username?: string;
  avatar?: string;
}
