import {useState} from 'react';

interface Position {
  positionX: number;
  positionY: number;
}

interface Movement extends Position {
  movementX: number;
  movementY: number;
}

interface MouseMoveHookProps {
  containerRect: DOMRect | null;
  onMouseDown: (position: Position) => void;
  onMouseMove: (movement: Movement) => void;
  onMouseUp?: () => void;
}

interface MouseMoveHook {
  handleMouseDown: (event: React.MouseEvent<HTMLElement>) => void;
  handleMouseUp: (event: React.MouseEvent<HTMLElement>) => void;
  handleMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
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

export const useMouseMove = ({
  containerRect,
  onMouseDown,
  onMouseMove,
  onMouseUp,
}: MouseMoveHookProps): MouseMoveHook => {
  const [isMoving, setIsMoving] = useState(false);
  const [lastMovingX, setLastMovingX] = useState(0);
  const [lastMovingY, setLastMovingY] = useState(0);

  const handleMouseDown = (event: React.MouseEvent<HTMLElement>): void => {
    setIsMoving(true);
    const positionX = layerX(event, containerRect);
    const positionY = layerY(event, containerRect);
    setLastMovingX(positionX);
    setLastMovingY(positionY);
    onMouseDown({positionX, positionY});
  };

  const handleMouseUp = (): void => {
    setIsMoving(false);
    setLastMovingX(0);
    setLastMovingY(0);
    onMouseUp?.();
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>): void => {
    if (!isMoving) {
      return;
    }
    //Do not use movementX as implementation
    //is inconsistent across browsers

    const positionX = layerX(event, containerRect);
    const positionY = layerY(event, containerRect);
    const movementX = positionX - lastMovingX;
    const movementY = positionY - lastMovingY;
    setLastMovingX(positionX);
    setLastMovingY(positionY);
    onMouseMove({movementX, movementY, positionX, positionY});
  };

  return {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  };
};
