import '../styles/global.css'

import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { ApolloProvider } from '@apollo/client';
import '@fortawesome/fontawesome-svg-core/styles.css'
import React from 'react'
config.autoAddCss = false

import { client } from '../lib/clients/apolloClient'
import { ToastProvider } from '../lib/context/toastContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </ApolloProvider>
  )
}

export default MyApp
