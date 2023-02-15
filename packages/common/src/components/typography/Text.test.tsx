import {ThemeProvider} from '@mui/material';
import {render} from '@testing-library/react';
import {LightTheme} from '../../themes';
import {Text} from './Text';
import {describe, it, expect} from 'vitest';

describe('Text', () => {
  it('renders without crashing', () => {
    const {container} = render(
      <ThemeProvider theme={LightTheme}>
        <Text>Test</Text>
      </ThemeProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('renders the correct component', () => {
    const {container} = render(
      <ThemeProvider theme={LightTheme}>
        <Text component={'label'}>Test</Text>
      </ThemeProvider>
    );
    expect(container.querySelector('label')).not.toBeNull();
  });
  it('applies correct css', () => {
    const {container} = render(
      <ThemeProvider theme={LightTheme}>
        <Text className="test-class" weight="bold">
          Test
        </Text>
      </ThemeProvider>
    );
    expect(container.querySelector('.test-class')).not.toBeNull();
    expect(container.querySelector('.test-class')).toHaveStyle({
      fontWeight: LightTheme.typography.fontWeightBold,
    });
  });
});
