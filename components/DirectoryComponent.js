import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';

class Directory extends Component {

    constructor(props) {
        super(props);
        this.state = {
          campsites: CAMPSITES
        };
    }
     //configuring navigator header title with static. on the class itself
    static navigationOptions = {
        title: 'Directory'
    };

    render() {
        //each item listed
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({item}) => {
            return (
                <ListItem
                title={item.name}
                subtitle={item.description}
                //navigate routes to the defined screen and looks for the object id
                onPress={() => navigate('CampsiteInfo', { campsiteId: item.id})}
                leftAvatar={{ source: require('./images/react-lake.jpg')}}
                />
            );
        };

        return (
            <FlatList 
                data={this.state.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default Directory;

//NOTES
//keyExtractor is like key id for react. 
//item is a parameter that gets passed. FlatList can work like map on the data prop
//and iterate through every item with renderDir.


//navigation prop on here because it was configured in the navigation on Main