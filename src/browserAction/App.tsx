import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

// @ts-ignore
import logo from '../assets/logo-kami.png';
import styled from 'styled-components';
import CurrentBrand from './CurrentBrand';

interface Source {
    name: string;
    brandInfo: string;
}

interface State {
    source: string | undefined;
}

interface Props {}
class App extends Component<Props, State> {
    state = {
        // @ts-ignore
        source: undefined,
    };

    componentDidMount() {
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true,
            },
            (tabs: any) => {
                // ...and send a request for the DOM info...
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    // @ts-ignore
                    { from: 'popup', subject: 'sourceInfo', currentHost: 'test' },
                    // ...also specifying a callback to be called
                    //    from the receiving end (content script).
                    response => {
                        if (response) {
                            this.setState({ source: response });
                        }
                    }
                );
            }
        );
    }
    render() {
        return (
            <Popup>
                {this.state.source ? <CurrentBrand host={this.state.source} /> : <Logo src={logo} alt="logo" />}
            </Popup>
        );
    }
}

const Popup = styled.div`
    text-align: left;
    min-height: 800px;
    min-width: 500px;
    display: flex;
    flex-direction: column;
    background-color: white;
`;

const Header = styled.div`
    background-color: #e1f7d5;
    min-height: 400px;
    min-width: 500px;
    display: flex;
    flex-direction: column;
    font-size: calc(10px + 2vmin);
    color: black;
`;

const Logo = styled.img`
    height: 40vmin;
    pointer-events: none;
`;

export default hot(App);
