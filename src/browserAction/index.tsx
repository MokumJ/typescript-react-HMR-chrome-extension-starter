import * as React from 'react';
import { render } from 'react-dom';
import App from './App';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from '../lib/client';

const root = document.createElement('div');
document.body.appendChild(root);

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    root
);
