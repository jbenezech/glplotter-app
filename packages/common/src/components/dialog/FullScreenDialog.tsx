import React, {ReactElement} from 'react';
import {Dialog, IconButton} from '@mui/material';
import {Close} from '@mui/icons-material';

interface FullScreenDialogProps {
  children: React.ReactNode;
  onClose: () => void;
}

export function FullScreenDialog({
  children,
  onClose,
}: FullScreenDialogProps): ReactElement {
  return (
    <Dialog fullScreen={true} open={true} onClose={onClose}>
      <div
        className={'container-fluid g-0 d-flex flex-column min-vh-100 z-100'}
      >
        <IconButton
          color="secondary"
          component="label"
          className="ms-auto px-5 pt-2"
          onClick={onClose}
        >
          <Close />
        </IconButton>

        <div>{children}</div>
      </div>
    </Dialog>
  );
}
