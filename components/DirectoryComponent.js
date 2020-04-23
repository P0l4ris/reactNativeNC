import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function Directory(props) {

    const renderDirectoryItem = ({item}) => {
        return (
            <ListItem
                title={item.name}
                subtitle={item.description}
                leftAvatar={{ source: require(`./images/react-lake.jpg`)}}
            />
        );
    };

    return (
        <FlatList 
            data={props.campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={item => item.id.toString()}
        />
    );
}

export default Directory;

//NOTES
//keyExtractor is like key id for react. 
//item is a parameter that gets passed. FlatList can work like map on the data prop
//and iterate through every item with renderDir.