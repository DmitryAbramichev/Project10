import { useEffect, useState } from 'react';
import type { Launches } from '../types';

const API_URL =
  'https://api.spacexdata.com/v3/launches?launch_year=2020';

export function useDataLoad() {
  const [launches, setLaunches] = useState<Launches[]>([]);

  const loadPost = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Ошибка');
      }
      const data = (await response.json()) as Launches[];
      setLaunches(data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    loadPost();
  }, []);

  return { launches };
}

