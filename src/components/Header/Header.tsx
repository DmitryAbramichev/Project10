import { AppShell, Flex, Badge, Text } from '@mantine/core';
import { Cart } from './components';


export function Header() {

  return (
    <AppShell.Header>
      <Flex justify={'space-between'} align={'center'} p={'xs'}>
        <Flex columnGap="xs" align={'center'}>
          <Text fw={600} size={'22px'}>
            Vegetable
          </Text>
          <Badge color="green" size="xl">
            Badge
          </Badge>
        </Flex>
        <Cart />
      </Flex>
    </AppShell.Header>
  );
}
