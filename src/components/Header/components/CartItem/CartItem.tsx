import type { Vegetables } from '../../../../types';
import { Text } from '@mantine/core';

interface CartItem {
  vegetable: Vegetables;
  qty: number;
}

interface CartItemProps {
  item: CartItem;
  removeToCart: (id: number, qty: number) => void;
  addToCart: (vegetable: Vegetables, qty: number) => void;
}

export function CartItem({ item, removeToCart, addToCart }: CartItemProps) {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {/* Изображение */}
      <div>
        <img
          src={item.vegetable.image}
          alt={item.vegetable.name}
          style={{ width: '64px', height: '64px', borderRadius: '8px' }}
        />
      </div>

      {/* Информация */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Название */}
        <Text size="sm" fw={700}>
          {item.vegetable.name}
        </Text>

        {/* Цена - теперь под названием */}
        <Text size="sm" fw={700}>
          ${item.vegetable.price}
        </Text>

        {/* Трекер - в правом нижнем углу */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',

              width: '90px',
              height: '30px',
            }}
          >
            <button
              className="counter"
              onClick={() => {
                removeToCart(item.vegetable.id, 1);
              }}
            >
              -
            </button>
            <text>{item.qty}</text>
            <button
              className="counter"
              onClick={() => {
                addToCart(item.vegetable, 1);
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
