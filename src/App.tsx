import * as React from 'react';
import clsx from 'clsx';
import styled from '@emotion/styled';
import { Navigate, Route, Routes } from 'react-router-dom';
import { openCreateColorDialog, toggleThemeMode, useThemeMode } from './state';
import { Header, Main } from './ui/components';
import { AllColorsView, ColorEditorDialog } from './views';

const AppRoot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;

  background: var(--color--background);
  color: var(--color--on-background);
`;

function App(): React.ReactElement | null {
  const mode = useThemeMode();

  React.useEffect(() => {
    document.body.className = clsx({
      'dark-mode': mode === 'dark',
      'light-mode': mode === 'light',
    });
  }, [mode]);

  return (
    <AppRoot>
      <Header>
        <Header.Title to="/">Color Builder</Header.Title>
        <Header.Actions>
          <button onClick={openCreateColorDialog} type="button">
            +
          </button>
          <button onClick={toggleThemeMode} type="button">
            Toggle Mode
          </button>
        </Header.Actions>
      </Header>
      <Main>
        <Routes>
          <Route path="/" element={<Navigate to="colors" />} />
          <Route path="/colors">
            <Route index element={<AllColorsView />} />
          </Route>
        </Routes>
      </Main>
      <ColorEditorDialog />
    </AppRoot>
  );
}

export default App;
