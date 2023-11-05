import React, {useState} from 'react';
import { Provider,useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import RootNavigator from './src/routes/RootNavigator';
import { registerRootComponent } from "expo"
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import useFonts from './src/hooks/useFonts';
import AuthContextProvider from './src/store/auth-context';



const App = () => {
  const [IsReady, SetIsReady] = useState(false);
  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }
  
  return (
    <AuthContextProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
    </AuthContextProvider>
  );
};
registerRootComponent(App)
export default App;