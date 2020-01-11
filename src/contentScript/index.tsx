import { sources } from './sources';
import { client } from '../lib/client';
import gql from 'graphql-tag';

export const comPort = chrome.runtime.connect({ name: 'kami-port-1' });

let currentUrl = '';
// @ts-ignore
chrome.runtime.onMessage.addListener((message, sender, response) => {
    // First, validate the message's structure.
    if (message.from === 'popup' && message.subject === 'sourceInfo' && message.currentHost !== location.hostname) {
        const hostArray = location.hostname.split('.');
        const host = hostArray.length > 2 ? hostArray[1] : 'null';
        response(host);
        return true;
    }
});

chrome.runtime.sendMessage('hello');

const search = () => {
    setInterval(() => {
        // eslint-disable-next-line no-restricted-globals
        if (location.href !== currentUrl) {
            // eslint-disable-next-line no-restricted-globals
            currentUrl = location.href;
            // eslint-disable-next-line no-restricted-globals
            comPort.postMessage({ host: location.hostname });
        }
    }, 50);
};

search();
