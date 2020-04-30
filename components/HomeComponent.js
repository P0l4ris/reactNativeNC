import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return{
        campsites: state.campsites,
        promotions: state.promotions,
        partners: state.partners
    };
};
//again each item listed
function RenderItem({item}) {
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}>
                <Text
                    style={{margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        //each featured is the ones we set to true to appear. ScrollView doesn't ned an array explicitly + separators.
        return (
            <ScrollView>
                <RenderItem 
                    item={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]} />
                <RenderItem 
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]} />
                <RenderItem 
                    item={this.props.partners.partners.filter(partner => partner.featured)[0]} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);

//FlatList uses Lazy loading- only renders part of list on screen the other parts scrolled through are removed from memory. More efficient. ScrollView loads all items or children