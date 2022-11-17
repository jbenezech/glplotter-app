import {useState} from 'react';

export interface Position {
  positionX: number;
  positionY: number;
  withControl: boolean;
}

export interface Movement extends Position {
  movementX: number;
  movementY: number;
}

interface MouseHookProps {
  containerRect: DOMRect | null;
  onMouseDown?: (position: Position) => void;
  onMouseMove?: (movement: Movement) => void;
  onMouseDrag?: (movement: Movement) => boolean | void;
  onMouseUp?: (position: Position) => void;
  onMouseWheel?: (movement: Movement) => void;
  onTrackballMove?: (movement: Movement) => void;
  onDoubleClick?: (position: Position) => void;
}

interface MouseHook {
  handleMouseDown: (event: React.MouseEvent<HTMLElement>) => void;
  handleMouseUp: (event: React.MouseEvent<HTMLElement>) => void;
  handleMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave: (event: React.MouseEvent<HTMLElement>) => void;
  handleMouseWheel: (event: React.WheelEvent<HTMLElement>) => void;
  handleDoubleClick: (event: React.MouseEvent<HTMLElement>) => void;
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
  onDoubleClick,
}: MouseHookProps): MouseHook => {
  const [isDraging, setIsDraging] = useState(false);
  const [lastMovingX, setLastMovingX] = useState(0);
  const [lastMovingY, setLastMovingY] = useState(0);

  const handleMouseDown = (event: React.MouseEvent<HTMLElement>): void => {
    setIsDraging(true);
    const positionX = layerX(event, containerRect);
    const positionY = layerY(event, containerRect);
    const withControl = event.ctrlKey;

    setLastMovingX(positionX);
    setLastMovingY(positionY);
    onMouseDown?.({positionX, positionY, withControl});
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLElement>): void => {
    const positionX = layerX(event, containerRect);
    const positionY = layerY(event, containerRect);
    const withControl = event.ctrlKey;

    setIsDraging(false);
    setLastMovingX(0);
    setLastMovingY(0);

    onMouseUp?.({positionX, positionY, withControl});
  };

  const handleDoubleClick = (event: React.MouseEvent<HTMLElement>): void => {
    const positionX = layerX(event, containerRect);
    const positionY = layerY(event, containerRect);
    const withControl = event.ctrlKey;
    setIsDraging(false);
    setLastMovingX(0);
    setLastMovingY(0);

    onDoubleClick?.({positionX, positionY, withControl});
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>): void => {
    //Do not use movementX as implementation
    //is inconsistent across browsers

    const positionX = layerX(event, containerRect);
    const positionY = layerY(event, containerRect);
    const movementX = positionX - lastMovingX;
    const movementY = positionY - lastMovingY;
    const withControl = event.ctrlKey;

    setLastMovingX(positionX);
    setLastMovingY(positionY);
    onMouseMove?.({movementX, movementY, positionX, positionY, withControl});
    if (isDraging) {
      const propagate = onMouseDrag?.({
        movementX,
        movementY,
        positionX,
        positionY,
        withControl,
      });
      propagate === false && event.stopPropagation();
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
    const withControl = event.ctrlKey;

    if (event.deltaX && event.deltaX > event.deltaY) {
      onTrackballMove?.({
        movementX,
        movementY,
        positionX,
        positionY,
        withControl,
      });
    } else {
      onMouseWheel?.({movementX, movementY, positionX, positionY, withControl});
    }
  };

  return {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleMouseLeave,
    handleMouseWheel,
    handleDoubleClick,
  };
};
