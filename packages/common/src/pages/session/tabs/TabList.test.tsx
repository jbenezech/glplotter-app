import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {renderWithTestProviders} from 'src/test/utils/ProviderWrapper';
import '@testing-library/jest-dom';
import {TabList} from './TabList';
import assert from 'assert';

describe('TabList', () => {
  it('renders without crashing', () => {
    const {container} = renderWithTestProviders(<TabList />);
    expect(container).toMatchSnapshot();
  });

  it('displays initial tab and buttons', () => {
    const {container} = renderWithTestProviders(<TabList />);
    expect(container.querySelectorAll('.MuiTab-root').length).toEqual(1);
    expect(screen.getByTestId('AddCircleIcon')).toBeInTheDocument();
    expect(screen.getByTestId('RemoveCircleIcon')).toBeInTheDocument();
    expect(screen.getByTestId('ContentCopyIcon')).toBeInTheDocument();
  });

  it('adds and removes tabs when clicking on plus and minus', () => {
    const {container} = renderWithTestProviders(<TabList />);
    const addButton = screen.getByTestId('AddCircleIcon').parentElement;
    const removeButton = screen.getByTestId('RemoveCircleIcon').parentElement;

    assert(addButton !== null);
    assert(removeButton !== null);

    userEvent.click(addButton);
    expect(container.querySelectorAll('.MuiTab-root').length).toEqual(2);
    expect(screen.getByText('tab')).toBeInTheDocument();

    userEvent.click(removeButton);
    expect(container.querySelectorAll('.MuiTab-root').length).toEqual(1);
  });

  it('duplicates tabs when clicking on icon', () => {
    const {container} = renderWithTestProviders(<TabList />);
    const addButton = screen.getByTestId('ContentCopyIcon').parentElement;
    const removeButton = screen.getByTestId('RemoveCircleIcon').parentElement;

    assert(addButton !== null);
    assert(removeButton !== null);

    userEvent.click(addButton);
    expect(container.querySelectorAll('.MuiTab-root').length).toEqual(2);
    expect(screen.getByText('c1 (copy)')).toBeInTheDocument();

    userEvent.click(removeButton);
    expect(container.querySelectorAll('.MuiTab-root').length).toEqual(1);
  });

  it('changes active tab', () => {
    renderWithTestProviders(<TabList />);
    const addButton = screen.getByTestId('AddCircleIcon').parentElement;

    assert(addButton !== null);

    userEvent.click(addButton);
    userEvent.click(screen.getByText('tab'));

    expect(screen.getByText('tab')).toHaveClass('Mui-selected');
  });

  it('handles no tab edge case without error', () => {
    const {container} = renderWithTestProviders(<TabList />);
    const addButton = screen.getByTestId('ContentCopyIcon').parentElement;
    const removeButton = screen.getByTestId('RemoveCircleIcon').parentElement;

    assert(addButton !== null);
    assert(removeButton !== null);

    userEvent.click(removeButton);
    userEvent.click(addButton);
    expect(container.querySelectorAll('.MuiTab-root').length).toEqual(0);
    userEvent.click(removeButton);
    expect(container.querySelectorAll('.MuiTab-root').length).toEqual(0);
  });
});
