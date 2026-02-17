import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { beforeEach, afterEach, test, expect, vi } from 'vitest';
import App from './App';

// Мок для matchMedia (Mantine)
beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Создаём контейнер для портала
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
  vi.resetAllMocks();
});

const mockLaunch = {
  flight_number: 1,
  mission_name: 'Test Mission',
  launch_year: '2020',
  rocket: { rocket_name: 'Falcon 9' },
  details: 'Test details',
  links: {
    mission_patch_small: 'test.jpg',
    mission_patch: 'test_big.jpg',
  },
};

beforeEach(() => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [mockLaunch],
  });
});

test('отображает карточки после загрузки', async () => {
  render(
    <MantineProvider>
      <App />
    </MantineProvider>
  );
  expect(await screen.findByText('Test Mission')).toBeInTheDocument();
  expect(screen.getByText('Falcon 9')).toBeInTheDocument();
});

test('открывает модальное окно с деталями по клику See more', async () => {
  render(
    <MantineProvider>
      <App />
    </MantineProvider>
  );
  const seeMoreButton = await screen.findByRole('button', { name: /see more/i });
  await userEvent.click(seeMoreButton);
  expect(await screen.findByText('Rocket name: Falcon 9')).toBeInTheDocument();
  expect(screen.getByText('Details: Test details')).toBeInTheDocument();
});

test('закрывает модальное окно при клике на оверлей', async () => {
  render(
    <MantineProvider>
      <App />
    </MantineProvider>
  );
  const seeMoreButton = await screen.findByRole('button', { name: /see more/i });
  await userEvent.click(seeMoreButton);
  expect(await screen.findByText('Details: Test details')).toBeInTheDocument();

  const overlay = screen.getByTestId('modal-overlay');
  await userEvent.click(overlay);

  await waitFor(() => {
    expect(screen.queryByText('Details: Test details')).not.toBeInTheDocument();
  });
});

test('показывает заглушку, если у запуска нет details', async () => {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [{ ...mockLaunch, details: null }],
  });

  render(
    <MantineProvider>
      <App />
    </MantineProvider>
  );
  const seeMoreButton = await screen.findByRole('button', { name: /see more/i });
  await userEvent.click(seeMoreButton);
  expect(await screen.findByText('Details: No details available.')).toBeInTheDocument();
});