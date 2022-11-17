import {Text} from '@Components/typography/Text';
import {ApplicationStateContext} from '@Context/StateContext';
import {ReactElement, useContext} from 'react';

export function Info(): ReactElement {
  const {glInfo} = useContext(ApplicationStateContext);
  const pointsPerWindow = Math.round(glInfo.pointsPerWindow);

  return <Text variant={'caption'}>{`${pointsPerWindow} ppw`}</Text>;
}
