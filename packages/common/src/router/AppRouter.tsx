import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ReactElement} from 'react';
import {APP_ROUTES} from './Routes';
import {Settings} from '@Pages/settings/Settings';
import {Session} from '@Pages/session/Session';

export default function AppRouter(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_ROUTES.SETTINGS} element={<Settings />} />
        <Route path="*" element={<Session />} />
      </Routes>
    </BrowserRouter>
  );
}
