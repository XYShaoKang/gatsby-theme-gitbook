import React, { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'

import { client } from './client'

export const wrapRootElement = ({
  element,
}: {
  element: ReactNode
}) => (
  <ApolloProvider client={client}>
    {element}
  </ApolloProvider>
)
