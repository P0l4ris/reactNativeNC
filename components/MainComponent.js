import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { View } from 'react-native';
import { CAMPSITES } from '../shared/campsites';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          campsites: CAMPSITES,
          selectedCampsite: null
        };
    }

    //pass state when clicked or selected
    onCampsiteSelect(campsiteId) {
        this.setState({selectedCampsite: campsiteId});
    }

    //onPress is passed to directory component with the campsites Id's
    render() {
        return (
            <View style={{flex: 1}}>
                <Directory 
                    campsites={this.state.campsites} 
                    onPress={campsiteId => this.onCampsiteSelect(campsiteId)} 
                />
                <CampsiteInfo 
                    campsite={this.state.campsites.filter(campsite => 
                    campsite.id === this.state.selectedCampsite)[0]} 
                />
            </View>
        );
    }
}

export default Main;