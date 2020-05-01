import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

//in here we got rid of ListItem for Tile for stylistic changes


const mapStateToProps = state => {
    return{
        //only need these from the props when passed whole state
        campsites: state.campsites
    };
};

class Directory extends Component {

    
     //configuring navigator header title with static. on the class itself
    static navigationOptions = {
        title: 'Directory'
    };

    render() {
        //each item listed
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({item}) => {
            return (
                <Tile
                title={item.name}
                caption={item.description}
                //navigate routes to the defined screen and looks for the object id
                featured
                onPress={() => navigate('CampsiteInfo', { campsiteId: item.id})}
                imageSrc={{uri: baseUrl + item.image}}
                />
            );
        };
        
        //Loading or errMess
        if(this.props.campsites.isLoading) {
            return <Loading />;
        }

        if(this.props.campsites.errMess) {
            return(
                <View>
                    <Text>{props.campsites.errMess}</Text>
                </View>
            );aa
        }

        return (
            <FlatList 
                data={this.props.campsites.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Directory);

//NOTES
//keyExtractor is like key id for react. 
//item is a parameter that gets passed. FlatList can work like map on the data prop
//and iterate through every item with renderDir.


//navigation prop on here because it was configured in the navigation on Main