import React, {Component }from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES} from '../shared/campsites';


//destructuring campsite so we can use array object as variables {{id, name}}
function RenderCampsite({campsite}) {
        if(campsite) {
            return (
                <Card
                    featuredTitle={campsite.name}
                    image={require('./images/react-lake.jpg')}>
                    <Text style={{margin:10}}>
                        {campsite.description}
                    </Text>
                </Card>
            );
        }
        //falsy
        return <View />;
}


class CampsiteInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
          campsites: CAMPSITES,
        };
    }

    static navigationOptions = {
        title: 'Campsite Information'
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');
        //where does it get the param campsiteId? how does it work with navigation?
        //does navigation just connect the item with ids?
        const campsite = this.state.campsites.filter(campsite => campsite.id === campsiteId)[0];
        return <RenderCampsite campsite={campsite} />;
     }
}

export default CampsiteInfo;