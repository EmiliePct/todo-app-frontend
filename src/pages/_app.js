import '../styles/globals.css';
import Head from 'next/head';

//pour store redux
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";

const reducers = combineReducers({ user });
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
        {/* <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="fr"> */}
          <Head>
            <title>Todo-app</title>
            <meta name="description" content="creer ses listes de taches" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <Component {...pageProps} />
        {/* </LocalizationProvider> */}
      </PersistGate>
    </Provider>
  );
}

export default App;
