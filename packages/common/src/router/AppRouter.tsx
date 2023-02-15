import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ReactElement} from 'react';
import {APP_ROUTES} from './Routes';
import {Settings} from '@Pages/settings/Settings';
import {Session} from '@Pages/session/Session';

export default function AppRouter(): ReactElement {
  const basename = (import.meta.env.BASE_URL || '/').replace(
    //remove starting ./ if any like when bunded as electron
    /^\.\/(.*)$/,
    '$1'
  );
  console.log('BASE', import.meta.env.BASE_URL, basename);
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path={APP_ROUTES.SETTINGS} element={<Settings />} />
        <Route path="*" element={<Session />} />
      </Routes>
    </BrowserRouter>
  );
}
