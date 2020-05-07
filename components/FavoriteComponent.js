import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';

//this connects properties from a redux store
const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        favorites: state.favorites
    };
};


const mapDispatchToProps = {    deleteFavorite: campsiteId => (deleteFavorite(campsiteId))};

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    }

    render() {
        //make sure to be able to navigate from this item to the correct campsite, so we pass the props navigation to correctly go there. doesn't have to be passed. it's in all components. it gets called in onPress here
        const { navigate } = this.props.navigation;
        //the ({item}) comes from the return below that filters the picks the specific item with its campsiteId
        const renderFavoriteItem = ({item}) => {
            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => this.props.deleteFavorite(item.id)
                }
            ];

            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <ListItem
                        title={item.name}
                        subtitle={item.description}
                        leftAvatar={{source: {uri: baseUrl + item.image}}}
                        onPress={() => navigate('CampsiteInfo', {campsiteId: item.id})}
                    />
                </Swipeout>
            );
        };


//first loads, then checks for error, and then returns the listed Item

        if (this.props.campsites.isLoading) {
            return <Loading />;
        }
        if (this.props.campsites.errMess) {
            return (
                <View>
                    <Text>{this.props.campsites.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.campsites.campsites.filter(
                    campsite => this.props.favorites.includes(campsite.id)
                )}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);