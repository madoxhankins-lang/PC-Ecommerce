import { create } from 'zustand';

export interface UserProfile {
  name: string;
  email: string;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
}

interface UserState {
  profile: UserProfile;
  addresses: Address[];
  orders: Order[];
  updateProfile: (profile: Partial<UserProfile>) => void;
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  addOrder: (order: Order) => void;
}

const initialProfile: UserProfile = {
  name: 'Alex Carter',
  email: 'alex.carter@example.com',
};

const initialAddresses: Address[] = [
  {
    id: 'home',
    label: 'Home',
    street: '1200 Main St',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
  },
];

const initialOrders: Order[] = [
  { id: 'ORD-1001', date: '2025-09-28', total: 1299.99, status: 'Delivered' },
  { id: 'ORD-1002', date: '2025-10-01', total: 879.5, status: 'Shipped' },
];

export const useUserStore = create<UserState>((set) => ({
  profile: initialProfile,
  addresses: initialAddresses,
  orders: initialOrders,
  updateProfile: (profile) =>
    set((state) => ({
      profile: {
        ...state.profile,
        ...profile,
      },
    })),
  addAddress: (address) =>
    set((state) => ({
      addresses: [...state.addresses, address],
    })),
  removeAddress: (id) =>
    set((state) => ({
      addresses: state.addresses.filter((address) => address.id !== id),
    })),
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
}));
