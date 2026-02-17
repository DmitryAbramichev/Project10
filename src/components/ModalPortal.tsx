import type { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { Box, Paper, ActionIcon } from '@mantine/core';

interface ModalPortalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const ModalPortal = ({ isOpen, onClose, children }: ModalPortalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Box
     data-testid="modal-overlay" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <Paper
        shadow="lg"
        p="xl"
        radius="md"
        withBorder
        style={{ maxWidth: '500px', width: '90%', position: 'relative' }}
        onClick={(e) => e.stopPropagation()}
      >
        <ActionIcon
          onClick={onClose}
          style={{ position: 'absolute', top: '10px', right: '10px' }}
          variant="subtle"
        >
        </ActionIcon>
        {children}
      </Paper>
    </Box>,
    document.getElementById('modal-root')!
  );
};