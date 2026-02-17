import { Popover, Button, Badge} from '@mantine/core';
import { CartItem } from './CartItem/CartItem';
import { useAppContext } from '../../../context';


export function Cart() {
 const {cart, addToCart, removeToCart, total} = useAppContext()

  return (
    <Popover width={444} position="bottom" withArrow shadow="md">
      
      <Popover.Target>
        
        <Button color="#54B46A">{Boolean(cart.length) && <Badge mr={10} size="xs" circle variant="white" color='black'>{cart.length}</Badge>}Cart  <img src="src/cart.png" alt=""/></Button>
      </Popover.Target>
      
      <Popover.Dropdown>
        <div>
          {cart.map((item) => (
            <CartItem
              key={item.vegetable.id}
              item={item}
              removeToCart={removeToCart}
              addToCart={addToCart}
            />
          ))}
        </div>
        {Boolean(total) && 
        <div style={{display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'}}>
          <p>Total</p>
           <div>
           $ {total}
            </div>
          </div>}
      </Popover.Dropdown>
    </Popover>
  );
}
