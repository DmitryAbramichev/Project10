import { AppShell, Text } from '@mantine/core';
import { LaunchesCard } from './components/VegetableCard/LaunchCard'
import { useAppContext } from '../../context';
import React from 'react';


export function Main() {
  const {launches} = useAppContext()
  return (
    <React.StrictMode>
    <AppShell.Main bg={'#F3F5FA'} px={'80px'}>
      <Text fw={600} size={'32px'} py={'60px'} ta="center">
        SpaceX Launches 2020
      </Text>
      <div
        style={{
          display: 'grid',
          rowGap: '28px',
          columnGap: '24px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(302px, 1fr))',
        }}
      >
        {launches.map((launches) => {
          return <LaunchesCard launches={launches} />;
        })}
      </div>
    </AppShell.Main>
    </React.StrictMode>
  );
}