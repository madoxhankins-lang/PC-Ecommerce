import { beforeEach, describe, expect, it } from 'vitest';
import { useUserStore } from '../useUserStore';

beforeEach(() => {
  useUserStore.setState({
    profile: {
      name: 'Alex Carter',
      email: 'alex@example.com',
    },
    addresses: [
      { id: 'home', label: 'Home', street: '1200 Main St', city: 'Seattle', state: 'WA', zipCode: '98101' },
    ],
    orders: [
      { id: 'ORD-1001', date: '2025-09-28', total: 1299.99, status: 'Delivered' },
    ],
  });
});

describe('useUserStore', () => {
  it('updates the profile and adds addresses', () => {
    useUserStore.getState().updateProfile({ name: 'Sam Lee', email: 'sam@example.com' });
    useUserStore.getState().addAddress({
      id: 'work',
      label: 'Work',
      street: '440 Pike St',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
    });

    expect(useUserStore.getState().profile).toMatchObject({
      name: 'Sam Lee',
      email: 'sam@example.com',
    });
    expect(useUserStore.getState().addresses).toHaveLength(2);
  });

  it('adds an order to the history', () => {
    useUserStore.getState().addOrder({
      id: 'ORD-2002',
      date: '2025-10-02',
      total: 899.0,
      status: 'Processing',
    });

    const latestOrder = useUserStore.getState().orders[useUserStore.getState().orders.length - 1];
    expect(latestOrder).toMatchObject({ id: 'ORD-2002', status: 'Processing' });
  });
});
