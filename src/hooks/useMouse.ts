import {useState} from 'react';

interface Position {
  positionX: number;
  positionY: number;
}

interface Movement extends Position {
  movementX: number;
  movementY: number;
}

interface MouseHookProps {
  containerRect: DOMRect | null;
  onMouseDown?: (position: Position) => void;
  onMouseMove?: (movement: Movement) => void;
  onMouseDrag?: (movement: Movement) => void;
  onMouseUp?: () => void;
  onMouseWheel?: (movement: Movement) => void;
  onTrackballMove?: (movement: Movement) => void;
}

interface MouseHook {
  handleMouseDown: (event: React.MouseEvent<HTMLElement>) => void;
  handleMouseUp: (event: React.MouseEvent<HTMLElement>) => void;
  handleMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave: (event: React.MouseEvent<HTMLElement>) => void;
  handleMouseWheel: (event: React.WheelEvent<HTMLElement>) => void;
}

const layerX = (
  event: React.MouseEvent<HTMLElement>,
  containerRect: DOMRect | null
): number => {
  return event.clientX - (containerRect?.x || 0);
};

const layerY = (
  event: React.MouseEvent<HTMLElement>,
  containerRect: DOMRect | null
): number => {
  return event.clientY - (containerRect?.y || 0);
};

export const useMouse = ({
  containerRect,
  onMouseDown,
  onMouseMove,
  onMouseDrag,
  onMouseUp,
  onMouseWheel,
  onTrackballMove,
}: MouseHookProps): MouseHook => {
  const [isDraging, setIsDraging] = useState(false);
  const [lastMovingX, setLastMovingX] = useState(0);
  const [lastMovingY, setLastMovingY] = useState(0);

  const handleMouseDown = (event: React.MouseEvent<HTMLElement>): void => {
    setIsDraging(true);
    const positionX = layerX(event, containerRect);
    const positionY = layerY(event, containerRect);
    setLastMovingX(positionX);
    setLastMovingY(positionY);
    onMouseDown?.({positionX, positionY});
  };

  const handleMouseUp = (): void => {
    setIsDraging(false);
    setLastMovingX(0);
    setLastMovingY(0);
    onMouseUp?.();
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>): void => {
    //Do not use movementX as implementation
    //is inconsistent across browsers

    const positionX = layerX(event, containerRect);
    const positionY = layerY(event, containerRect);
    const movementX = positionX - lastMovingX;
    const movementY = positionY - lastMovingY;
    setLastMovingX(positionX);
    setLastMovingY(positionY);
    onMouseMove?.({movementX, movementY, positionX, positionY});
    if (isDraging) {
      onMouseDrag?.({movementX, movementY, positionX, positionY});
    }
  };

  const handleMouseLeave = (): void => {
    setIsDraging(false);
  };

  const handleMouseWheel = (event: React.WheelEvent<HTMLElement>): void => {
    const positionX = layerX(event, containerRect);
    const positionY = layerY(event, containerRect);
    const movementX = event.deltaX;
    const movementY = event.deltaY;

    if (event.deltaX && event.deltaX > event.deltaY) {
      onTrackballMove?.({movementX, movementY, positionX, positionY});
    } else {
      onMouseWheel?.({movementX, movementY, positionX, positionY});
    }
  };

  return {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleMouseLeave,
    handleMouseWheel,
  };
};
