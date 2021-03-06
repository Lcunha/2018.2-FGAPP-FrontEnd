import { Button, Icon, Card, CardItem, Text, Thumbnail } from 'native-base';

import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import Divider from '../../EventProfile/components/Divider';
import GeralDetails from '../../EventProfile/components/GeralDetails'
import * as helpers from '../../../utils/helpers';

const noPic = require('../../../static/noPic.png');

class FeedItem extends Component {
    state = {
        commentsLength: 0
    };

    _getCommentsLength() {
        return fetch(
            'http://roles-comments.herokuapp.com/comment/?eventID=' +
                this.props.idRole
        )
            .then(res => res.json())
            .then(resJson => {
                if (resJson.length) {
                    this.setState({ commentsLength: resJson.length });
                }
            })
            .catch(() => {});
    }

    componentDidMount() {
        this._getCommentsLength();
    }

    render() {
        const uri = this.props.imgRole;
        const { state } = this.props.navigation;
        const token = state.params ? state.params.token : undefined;
        return (
            <Card style={styles.mb}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Profile', {
                            idRole: this.props.idRole
                        });
                    }}
                >
                    <View flexDirection="row">
                        <View
                            style={{
                                width: '50%',
                                alignItems: 'center',
                                paddingTop: 20
                            }}
                        >
                            <Thumbnail
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'grey',
                                    borderRadius: 125,
                                    width: 140,
                                    height: 140
                                }}
                                large
                                source={
                                    this.props.imgRole == null //Se o valor de imgRole for null
                                        ? noPic //então exibe imagem "noPic.png"
                                        : { uri: uri } //caso contrário, exibe a imagem
                                }
                            />
                        </View>
                        <View
                            style={{
                                width: '50%',
                                alignItems: 'center',
                                alignContent: 'center',
                                justifyContent: 'center',
                                paddingTop: 20,
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 30,
                                    textAlign: 'center'
                                }}
                            >
                                {this.props.nomeRole}
                            </Text>

                            <Divider />

                            <Text style={{ textAlign: 'center' }} note>
                                Criado por: {this.props.org}
                            </Text>

                            <GeralDetails
                                iconName="calendar"
                                text={
                                    helpers.formatDate(this.props.eventDate)
                                        .formatted
                                }
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                <Button
                    style={{
                        width: '100%',
                        height: 60,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                    transparent
                    onPress={() => {
                        this.props.navigation.navigate('Comments', {
                            idRole: this.props.idRole,
                            eventName: this.props.nomeRole,
                            token: token
                        });
                    }}
                >
                    <Icon name="chatbubbles" style={{ color: 'gray' }} />
                    <Text
                        style={{
                            textAlign: 'center',
                            color: 'gray',
                            fontWeight: 'bold'
                        }}
                    >
                        {this.state.commentsLength} Comentários
                    </Text>
                </Button>
            </Card>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF'
    },
    mb: {
        marginBottom: 15,
        justifyContent: 'space-between'
    },
    cardBtn: {
        width: 100
    }
});

export default withNavigation(FeedItem);
