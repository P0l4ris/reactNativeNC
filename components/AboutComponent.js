import React, {Component }from 'react';
import { Text, ScrollView, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';


const mapStateToProps = state => {
    return{
        //only need partners from the props
        partners: state.partners
    };
};


class About extends Component {
   

static navigationOptions = {
        title: 'About Us'
    }


    render() {
        const renderPartner = ({item}) => {
            return (
                <ListItem
                title={item.name}
                subtitle={item.description}
                leftAvatar={{ source: {uri: baseUrl + item.image}}}
                />
            );
        };
        return(
        <ScrollView>
            <Mission />
            <Card title="Community Partners">
                <FlatList
                //partners.partners because the first one holds all the state for partners..loading etc. the second actually refers o the data array only
                data={this.props.partners.partners}
                renderItem={renderPartner}
                keyExtractor={item => item.id.toString()}
            />
            </Card>
        </ScrollView>
        )
    }
}

function Mission() {
    return (
        <Card
            title= "Our Mission">
            <Text style={{margin:10}}>
            We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
            </Text>
        </Card>
    )

}


//pass the state to About with connect and receives the partners props from the store.
export default connect(mapStateToProps)(About);