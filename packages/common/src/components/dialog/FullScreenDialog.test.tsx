import {FullScreenDialog} from './FullScreenDialog';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('FullScreenDialog', () => {
  it('renders without crashing', () => {
    const {container} = render(
      <FullScreenDialog onClose={(): void => undefined}>Test</FullScreenDialog>
    );
    expect(container).toMatchSnapshot();
  });
  it('renders children correctly', () => {
    render(
      <FullScreenDialog onClose={(): void => {}}>
        <div data-testid="test">Test</div>
      </FullScreenDialog>
    );
    expect(screen.getByTestId('test').innerHTML).toEqual('Test');
  });
  it('calls onClose when closing', () => {
    const onClose = jest.fn();
    render(<FullScreenDialog onClose={onClose}>Test</FullScreenDialog>);
    userEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalled();
  });
});
