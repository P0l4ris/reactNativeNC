import React from 'react';
import Main from './components/MainComponent';
import { YellowBox }  from 'react-native';

YellowBox.ignoreWarnings(['Warning: ...'])
console.disableYellowBox= true

export default function App() {
    return (
        <Main />
    );
}
