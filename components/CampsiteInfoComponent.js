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
        //navigate is a native component of navigation passed as props and it gets 'campsiteId from "navigate" function. Takes it as a second argument besides the screen name. 2 more advanced exist.
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.state.campsites.filter(campsite => campsite.id === campsiteId)[0];
        return <RenderCampsite campsite={campsite} />;
     }
}

export default CampsiteInfo;