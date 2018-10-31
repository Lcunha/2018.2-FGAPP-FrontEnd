import React, { Component } from "react";
import {
  StyleSheet
} from "react-native";
import {
  Container,
  Item,
  Picker
} from 'native-base'

export default class CategorySelect extends Component{

  constructor(props){
    super(props);
    this.state={
      selected: undefined
    };
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  render() {

    return (
      <Container style={styles.container}>
        <Item
          style={styles.form}
          picker
          regular
        >
          <Picker
            mode="dropdown"
            placeholder="Categoria"
            selectedValue={this.state.selected}
            onValueChange={this.onValueChange.bind(this)}
          >
            <Picker.Item label="Restaurante" value='1'/>
            <Picker.Item label="Hookah" value='2'/>
            <Picker.Item label="Bar" value='3'/>
            <Picker.Item label="Papelaria" value='4'/>
          </Picker>
        </Item>
      </Container>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: "white",
    padding: 20,
    top:0,
    bottom:0,
    left:0,
    right:0
  },
  form:{
    marginBottom: 10
  }
});
