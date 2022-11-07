import {Footer} from '@Components/layout/Footer';
import {Header} from '@Components/layout/Header';
import {MainWindow} from '@Components/layout/MainWindow';
import {ReactElement} from 'react';
export function Root(): ReactElement {
  return (
    <div className="vw-100 vh-100 d-flex flex-column justify-content-around">
      <Header drawingMode={'ROTATING'}></Header>
      <MainWindow />
      <Footer drawingMode={'ROTATING'}></Footer>
    </div>
  );
}
