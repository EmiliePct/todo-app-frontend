import '../styles/globals.css';
import Head from 'next/head';


//pour store redux
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";
import displaying from "../reducers/displaying";

//Imports pour pouvoir utiliser les calendriers dans tout le site
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import 'moment/locale/fr' //Pour mettre les heures et dates au format GB similaire à FR

const reducers = combineReducers({ user, displaying });
const persistConfig = { key: "todo-app", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="fr">
          <Head>
            <title>Todo-app</title>
            <meta name="description" content="creer ses listes de taches" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Component {...pageProps} />
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
