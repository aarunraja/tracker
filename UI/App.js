import React from 'react';
import { getPersistor, getStore } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import Main from './Main';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './helpers/theme';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <PaperProvider theme={theme}>
        <Provider store={getStore()}>
          <PersistGate loading={null} persistor={getPersistor()}>
            <Main />
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </PersistGate>
        </Provider>
      </PaperProvider>

    </>
  );
}