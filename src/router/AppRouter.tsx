import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ReactElement} from 'react';
import {Root} from '@Pages/Root';
import {APP_ROUTES} from './Routes';

export default function AppRouter(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_ROUTES.ROOT} element={<Root />} />
      </Routes>
    </BrowserRouter>
  );
}
