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

export interface NewCar {
  _id: string;
  carName: string;
  carBrand: string;
  year: number;
  gearType: string;
  energyType: string;
  price: number;
  quantity: number;
  discount: number;
  description: string;
  engineType: string;
  engineNumber: string;
  carColor: string;
  status: number;
  carImage: [string];
}

export interface CarLocation {
  busStop: string;
  city: string;
  state: string;
  country: string;
}
export interface UsedCar {
  _id: string;
  user?: User;
  userId: string;
  carName: string;
  carBrand: string;
  carLocation: CarLocation;
  year: number;
  gearType: string;
  energyType: string;
  price: number;
  quantity: number;
  discount: number;
  description: string;
  engineType: string;
  engineNumber: string;
  carColor: string;
  status: number;
  plateNumber: string;
  carImage: [string];
  createdAt: string;
}

export interface CarAss {
  _id: string;
  itemName: string;
  price: number;
  quantity: number;
  discount: number;
  description: string;
  status: number;
  itemImage: [string];
  createdAt: string;
}
