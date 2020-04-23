import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';


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


function CampsiteInfo(props) {
   return <RenderCampsite campsite={props.campsite} />;
}

export default CampsiteInfo;