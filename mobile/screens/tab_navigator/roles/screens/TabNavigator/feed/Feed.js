import {
  Container, Header, Body,
  Content, Button, Icon,
  Card, CardItem, Text,
  Thumbnail, Left, Right,
} from "native-base";

import React, { Component } from "react";
import { View, StyleSheet, ScrollView, RefreshControl, } from "react-native";
import FeedItem from "./FeedItem";
class Feed extends Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
    this._refreshFeed();
  }

  state = {
    loading: true,
    roles: [],
    refreshing: false,
  };

  _refreshFeed = () => {
    this.setState({refreshing: true})
    fetch('http://209.97.153.172:8002/events/')
    .then(res => res.json())
    .then(roles =>{
      this.setState({ loading: false, roles })
      })
    .then( () => {this.setState({refreshing: false}) })
    .catch((error) => {
      this.setState({
        loading: false
      });
      console.error(error);
    });
  }

  render() {

    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <View>

        <ScrollView style={styles.scroll}
          refreshControl={
            <RefreshControl
              refreshing = {this.state.refreshing}
              onRefresh = {this._refreshFeed}
            />
          }
        >

          {
            this.state.roles.map((role,index) => <FeedItem key={index} imgRole={role.photo} nomeRole={role.event_name} org={role.owner} />)
          }
        </ScrollView>
      </View> 

    );
  }//end render ()
}//end class

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  mb: {
    marginBottom: 15
  }
});

export default Feed;