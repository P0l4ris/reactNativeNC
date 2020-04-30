import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return{
        campsites: state.campsites,
        promotions: state.promotions,
        partners: state.partners
    };
};
//again each item listed- actually passed all props NO curly braces! and de-structured item. Could have done that to isLoading/errMess but we did not since its only used once
function RenderItem(props) {
    const {item} = props;

    if(props.isLoading) {
        return <Loading />;
    }
    if(props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }

    if(item) {
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
                    item={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                />
                <RenderItem
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess} 
                />
                <RenderItem
                    item={this.props.partners.partners.filter(partner => partner.featured)[0]}
                    isLoading={this.props.partners.isLoading}
                    errMess={this.props.partners.errMess} 
                />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);

//FlatList uses Lazy loading- only renders part of list on screen the other parts scrolled through are removed from memory. More efficient. ScrollView loads all items or children