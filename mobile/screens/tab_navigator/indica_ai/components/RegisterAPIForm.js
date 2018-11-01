import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import {
  Container,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Textarea,
  Button
} from 'native-base'
import CategorySelect from './CategorySelect.js';

export default class RegisterAPIForm extends Component{

  constructor(props){
    super(props);
    this.state={
      selected: undefined,
      jsonForm: {
        name: null,
        description: null
      }
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
        <CategorySelect/>
        <Item
          style={styles.pickerForm}
          regular
        >
        <Input placeholder='Nome'
        />
        </Item>
        <Textarea
          rowSpan={5}
          bordered
          placeholder='Descrição'
        />
        <View style = {styles.button }>
        <Button block info>
            <Text style = {{color: "white"}}>Confirmar</Text>
          </Button>
        </View>
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
    right:0,
  },
  pickerForm:{
    top: 65,
    marginBottom: 74
  },
  button: {
    padding: 10,
  }
});
