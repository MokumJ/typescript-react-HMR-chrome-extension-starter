import gql from 'graphql-tag';
import { client } from '../lib/client';

const activePorts = {};

chrome.runtime.onInstalled.addListener(details => {
    // Clear the cache whenever the extension is updated
    chrome.storage.local.clear();
});

const getHost = gql`
    query GetHost($host: String) {
        brand(url: $host) {
            name
            url
            brandInfo
            sustainability
            priceclass
            category
            products
            foundedIn
            parent
        }
    }
`;

// Handle incoming connections from our content script
chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
    const tabId = port.sender && port.sender.tab && port.sender.tab.id;
    if (!tabId) {
        return;
    }
    activePorts[tabId] = port;
    // @ts-ignore
    port.onMessage.addListener((message: any, sender: any, sendResponse: any) => {
        if (message && message.host && message.host.length > 0) {
            const hostArray = message.host.split('.');
            const host = hostArray.length > 2 ? hostArray[1] : 'null';
            client
                .query({
                    query: getHost,
                    variables: { host },
                })
                .then(result => {
                    if (result?.data && !!result.data.brand) {
                        const rating = result.data.brand.sustainability;
                        if (rating === 1 || rating === 2) {
                            chrome.browserAction.setIcon({ tabId: tabId, path: '/images/Kami-favi-A.png' });
                        } else if (rating === 3 || rating === 4) {
                            chrome.browserAction.setIcon({ tabId: tabId, path: '/images/Kami-favi.png' });
                        } else if (rating === 5 || rating === 6) {
                            chrome.browserAction.setIcon({ tabId: tabId, path: '/images/Kam-favi-C.png' });
                        }
                    } else {
                        chrome.browserAction.setIcon({ path: '/images/Kami-favi-disabled.png' });
                    }
                })
                .catch(err => console.log(err));
        }
        sendResponse({});
        return true;
    });

    port.onDisconnect.addListener(() => {
        delete activePorts[tabId];
    });
});
