import {AppMenu} from '@Components/menu/AppMenu';
import {ReactElement, ReactNode} from 'react';

interface RootProps {
  children: ReactNode;
}

export function Base({children}: RootProps): ReactElement {
  return (
    <>
      <AppMenu />
      {children}
    </>
  );
}
