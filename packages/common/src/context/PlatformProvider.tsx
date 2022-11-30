import {createElement, ReactElement} from 'react';
import {ContextValue, PlatformContext} from './PlatformContext';

interface ProviderProps {
  implementation: ContextValue;
  children: React.ReactNode;
}

function PlatformProvider({
  implementation,
  children,
}: ProviderProps): ReactElement {
  return createElement(
    PlatformContext.Provider,
    {
      value: implementation,
    },
    children
  );
}

export default PlatformProvider;
