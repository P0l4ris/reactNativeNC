import React, {Component }from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return{
        //only need these from the props when passed whole state
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites
    };
};

//its a dispatch in creators
const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId)),
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text))
};


//destructuring campsite so we can use array object as variables {{id, name}}
function RenderCampsite(props) {
    //instead of passing campsite to RenderCampsite, we pass all props and specify specific props here on const {campsite} = props;
     const{campsite} = props;

    //we use a react 'ref' to have a animatable animation?
    //refs here are similar to 'ref' in HTML for javaScript
    const view = React.createRef();

    const recognizeComment = ({dx}) => (dx > 200) ? true : false;

    //dx is a property distance across x axis
     const recognizeDrag = ({dx}) => (dx < -200) ? true : false;
    //pan responder monitors gestures and here we specified what direction to track to activate our function panResponder
     const panResponder = PanResponder.create({
         onStartShouldSetPanResponder: () => true,
         //when a gesture is first recognize it's grant for handler
         onPanResponderGrant: ()=> {
             //animatable current animation passed as method
            view.current.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
         },
         onPanResponderEnd:(e, gestureState) => {
             console.log('pan responder end', gestureState);
             if (recognizeDrag(gestureState)) {
                 Alert.alert(
                     'Add Favorite',
                     'Are You Sure You Wish To Add' + campsite.name + 'To Favorite?',
                     [
                         {
                             text: 'Cancel',
                             style: 'cancel',
                             onPress: () => console.log('Cancel Pressed')
                         },
                         {
                             text: 'OK',
                             onPress: () => props.favorite ? console.log('Already set as favorite') : props.markFavorite()
                         }
                     ],
                     {cancelable: false}
                 );
             }

            else if (recognizeComment(gestureState)) {
                props.onShowModal();
            }
             return true;
         }
     })

        if(campsite) {
            return (
                <Animatable.View 
                animation='fadeInDown' 
                duration={2000} 
                delay={1000}
                ref={view} //from a top ref we made into a component

                // we spread the object of panResponder and use handlers 
                {...panResponder.panHandlers}>
                    <Card
                        featuredTitle={campsite.name}
                        image={{uri: baseUrl + campsite.image}}>
                        <Text style={{margin:10}}>
                            {campsite.description}
                        </Text>
                        <View style={styles.cardRow}>
                        {/* icon has an on press component too ? ternary operator */}
                            <Icon
                                name={props.favorite ? 'heart' : 'heart-o'}
                                type='font-awesome'
                                color='#f50'
                                raised
                                reverse
                                onPress={() => props.favorite ?
                                    console.log('Already set as a favorite') : props.markFavorite()}
                            />
                            <Icon style={styles.cardItem}
                                name= 'pencil'
                                type= 'font-awesome'
                                color='#5637DD'
                                raised
                                reverse
                                onPress={() => props.onShowModal()}
                            />
                        </View>
                    </Card>
                </Animatable.View>
            );
        }
        //falsy
        return <View />;
}

function RenderComments({comments}) {

    //final form
const renderCommentItem = ({item}) => {
    return (
        <View style={{margin: 10}}>
            <Text style={{fontSize: 14}}>{item.text}</Text>
            <Rating
                readonly
                style={{
                    fontSize: 12,
                    alignItems: 'flex-start',
                    paddingVertical: '5%'
                }}
                startingValue={item.rating}
                imageSize={10}
            />
            <Text style={{fontSize: 12}}>{`--${item.author}, ${item.date}`}</Text>
        </View>
    );
};

    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title= 'Comments'>
                <FlatList  
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class CampsiteInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        };
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleComment(campsiteId) {
        this.props.postComment(campsiteId, this.state.rating, this.state.author, this.state.text);
        this.toggleModal();
    }
    resetForm() {
        this.setState({
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        });
    }

    markFavorite(campsiteId) {
        this.props.postFavorite(campsiteId);
    }

    static navigationOptions = {
        title: 'Campsite Information'
    }

    render() {
        //navigate is a native component of navigation passed as props and it gets 'campsiteId from "navigate" function. Takes it as a second argument besides the screen name. 2 more advanced exist.
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];

        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);

        return ( 
        <ScrollView>
            <RenderCampsite campsite={campsite} 
                //includes passes boolean 
                favorite={this.props.favorites.includes(campsiteId)}
                markFavorite={() => this.markFavorite(campsiteId)}
                onShowModal={() => this.toggleModal()}
            />
            <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    //closes modal on backspace
                    onRequestClose={() => this.toggleModal()}>
                        <View style={styles.modal}>
                            <Rating
                                showRating
                                startingValue={this.state.rating}
                                imageSize= {40}
                                onFinishRating={(rating)=>this.setState({rating: rating})} 
                                styles={{paddingVertical: 10}}
                            />
                            <Input
                                placeholder='Author'
                                value={this.author}
                                leftIcon={{
                                    type:'font-awesome', 
                                    name:'user-o'}}
                                leftIconContainerStyle={{
                                    paddingRight: 10
                                }}
                                onChangeText={author => this.setState({ author: author })}
                            />
                            <Input
                                 placeholder='Comment'
                                 value={this.text}
                                 leftIcon={{
                                     type:'font-awesome', 
                                     name:'comment-o'}}
                                 leftIconContainerStyle={{
                                     paddingRight: 10
                                 }}
                                 onChangeText={text => this.setState({ text: text })}
                            ></Input>
                        </View>
                        <View>
                            <Button 
                                title= 'Submit'
                                color= '#5637DD'
                                onPress={() => {
                                    this.handleComment(campsiteId);
                                    this.resetForm();
                                }}
                            />
                        </View>
                        <View style={{margin:10}}>
                            <Button
                                onPress={() => this.toggleModal()}
                                color='#808080'
                                title='cancel'
                            />
                        </View>
                </Modal>

            <RenderComments comments={comments} />
        </ScrollView>
        );
     }
}


const styles= StyleSheet.create({
    cardRow:{
        alignItems:'center',
        justifyContent:'center',
        flex: 1,
        flexDirection:'row',
        margin:20
    },
    cardItem: {
        flex: 1,
        margin: 10
    },
    modal: {
        justifyContent:'center',
        margin: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);