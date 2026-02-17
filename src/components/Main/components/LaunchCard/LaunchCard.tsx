import { Card, Group, Button, Text, Image} from '@mantine/core';
import type { Launches} from '../../../../types';
import { useAppContext } from '../../../../context';

interface LaunchesCardProps {
  launches: Launches;
}

export function LaunchesCard({ launches }: LaunchesCardProps) {
 const { openModal } = useAppContext();

  return (
    <Card
      padding="md" 
      w={302}
      h={412}
      shadow="sm"
      radius="md"
      withBorder
      
      style={{
        width: '302px',
        height: '412px',
        display: 'grid',
        placeItems: 'center'
      }}
    >
      <Card.Section style={{ marginBottom: 16 }}>
        {' '}
        <Image
          src={launches.links.mission_patch_small}
          height={140}
          width={140}
          style={{
            width: '140px',
            height: '140px',
            margin: '10px',
          }}
        />
      </Card.Section>

      <Group justify="center">
        {' '}
        <Text fw={500}>{launches.mission_name}</Text>
      </Group>

        <Text fw={100} style={{ fontSize: '18px' }}>
          {launches.rocket.rocket_name}
        </Text>

        <Button
          color={"#294cf9ff"}
          radius="md"
          style={{
            width: '204px',
            height: '44px',
            color: '#E7FAEB'
          }}
          onClick={() => openModal(launches)}
        >
          See more
        </Button>
    </Card>
  );
}
