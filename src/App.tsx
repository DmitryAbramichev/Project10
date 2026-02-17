import { AppShell } from '@mantine/core';
import { useReducer } from 'react';
import { useDataLoad } from './hooks';
import { Main } from './components';
import { ModalPortal } from './components/ModalPortal';
import type { Launches } from './types';
import { AppContext } from './context';

// Состояние модалки
type State = {
  modalOpen: boolean;
  selectedLaunch: Launches | null;
};

type Action =
  | { type: 'OPEN_MODAL'; payload: Launches }
  | { type: 'CLOSE_MODAL' };

const initialState: State = {
  modalOpen: false,
  selectedLaunch: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { modalOpen: true, selectedLaunch: action.payload };
    case 'CLOSE_MODAL':
      return { modalOpen: false, selectedLaunch: null };
    default:
      return state;
  }
}

function App() {
  const { launches } = useDataLoad();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOpenModal = (launch: Launches) => {
    dispatch({ type: 'OPEN_MODAL', payload: launch });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppContext.Provider value={{ launches, openModal: handleOpenModal }}>
        <Main />
      </AppContext.Provider>

      <ModalPortal isOpen={state.modalOpen} onClose={handleCloseModal}>
        {state.selectedLaunch && (
          <>
            {/* Здесь содержимое модалки: большая эмблема, название, ракета, детали */}
            <div style={{ textAlign: 'start' }}>
              <h2>{state.selectedLaunch.mission_name}</h2>
              {state.selectedLaunch.links?.mission_patch && (
                <img
                  src={state.selectedLaunch.links.mission_patch}
                  alt={state.selectedLaunch.mission_name}
                  style={{ height: 120, width: 120, objectFit: 'contain' }}
                />
              )}
              <p>Mission name: <br /> {state.selectedLaunch.mission_name}</p>
              <p>Rocket name: <br />{state.selectedLaunch.rocket?.rocket_name}</p>
              <p>Details: <br />{state.selectedLaunch.details || 'No details available.'}</p>
            </div>
          </>
        )}
      </ModalPortal>
    </AppShell>
  );
}

export default App;