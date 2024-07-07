import '../styles/globals.css';
import Head from 'next/head';
// import React from 'react';


function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>To-do App</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
