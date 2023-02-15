import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import assert from 'assert';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import {DrawingMode} from './DrawingMode';
import {describe, it, expect} from 'vitest';

describe('DrawingMode', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(<DrawingMode />);
    expect(container).toMatchSnapshot();
  });

  it('switches icons when changing mode', async () => {
    const {container} = renderWithTestProviders(<DrawingMode />);

    expect(screen.getByTestId('PauseCircleIcon')).toBeInTheDocument();

    const button = container.querySelector('label');
    assert(button !== null);

    await userEvent.click(button);

    expect(screen.getByTestId('PlayCircleIcon')).toBeInTheDocument();
  });
});
