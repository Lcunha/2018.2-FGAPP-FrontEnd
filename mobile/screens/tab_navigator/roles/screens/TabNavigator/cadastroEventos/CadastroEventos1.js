import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  TimePickerAndroid,
  DatePickerAndroid,
  Button,
  Image
} from "react-native";
import { ImagePicker } from "expo";
import {
  DefaultTheme,
  TextInput,
  Provider as PaperProvider
} from "react-native-paper";

import { Foundation } from "@expo/vector-icons";
import Input from "./components/Input";
import Title from "./components/Title";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default class CadastroEventos1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      eventDescription: "",
      owner: "",
      linkReference: "",
      organizer: "",
      organizerTel: "",
      value: "",
      address: "",
      linkAddress: "",
      eventDate: "",
      eventHour: "",
      adultOnly: false,
      drinks: "",
      foods: "",
      photo: null
    };
  }

  imprimeRole() {
    this.props.navigation.navigate("Feed");
  }

  async datePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        console.log(year);
        console.log(month);
        console.log(day);
        this.setState({
          //eventDate: `${day}/${month + 1}/${year}`
          eventDate: year + "-" + month + "-" + day
        });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  }

  async timePicker() {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: true
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        console.log(hour);
        console.log(minute);
        this.setState({
          eventHour: `${hour}:${minute}:00`
        });
      }
    } catch ({ code, message }) {
      console.warn("Cannot open time picker", message);
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ photo: result.uri });
      console.log(this.state.photo);
    }
  };

  validacao = async blocked => {
    if (this.state.eventName == "") {
      alert("Campo de nome do evento inválido!");
    } else if (this.state.eventDescription == "") {
      alert("Campo de descrição do evento inválido!");
    } else if (this.state.linkReference == "") {
      alert("Campo de link de referência do evento inválido!");
    } else if (this.state.organizer == "") {
      alert("Campo de organizer do evento inválido!");
    } else if (this.state.organizerTel == "") {
      alert("Campo de organizerTel do evento inválido!");
    } else if (this.state.value == "") {
      alert("Campo de value do evento inválido!");
    } else if (this.state.address == "") {
      alert("Campo de address do evento inválido!");
    } else if (this.state.linkAddres == "") {
      alert("Campo de linkAddres do evento inválido!");
    } else if (this.state.eventDate == "") {
      alert("Campo de eventDate do evento inválido!");
    } else if (this.state.eventHour == "") {
      alert("Campo de eventHour do evento inválido!");
    } else if (this.state.drinks == "") {
      alert("Campo de drinks do evento inválido!");
    } else if (this.state.foods == "") {
      alert("Campo de foods do evento inválido!");
    } else {
      Alert.alert(
        "Rolê criado com sucesso!",
        "Seu rolê foi cadastrado com sucesso!\n" + "Boa sorte!",
        [
          {
            text: "OK"
          }
        ],
        {
          cancelable: false
        }
      );
      this.props.navigation.navigate("Feed");
      blocked = true;
    }
  };

  cadastrarRole = async () => {
    let blocked = false;
    this.validacao(blocked);
    console.log(blocked);

    if (blocked) {
      alert("Cadastro inválido, informações incompletas");
      return false;
    }

    console.log(this.state.linkAddres);
    fetch("http://209.97.153.172:8002/events/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        eventName: this.state.eventName,
        eventDescription: this.state.eventDescription,
        linkReference: "https://www." + this.state.linkReference + ".com",
        organizer: this.state.organizer,
        organizerTel: this.state.organizerTel,
        owner: this.state.organizer,
        value: this.state.value,
        address: this.state.address,
        linkAddress: "https://www." + this.state.linkAddres + ".com",
        eventDate: this.state.eventDate,
        eventHour: this.state.eventHour,
        adultOnly: this.state.adultOnly,
        foods: this.state.foods,
        drinks: this.state.drinks,
        photo: this.state.photo
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        //Verifica se o cadastro foi bem sucedido
        console.log(responseJson);

        //Sucesso
        if ((responseJson = !undefined)) {
          console.log(responseJson);
        }
      })
      .catch(err => {
        if (typeof err.text === "function") {
          err.text().then(errorMessage => {
            alert(errorMessage);
            console.log(errorMessage);
          });
        } else {
          Alert.alert("Erro na conexão.");
          console.log(err);
        }
      });
  };

  render() {
    let { photo } = this.state;

    return (
      <ScrollView style={{ alignContent: "center" }}>
        <View style={styles.container}>
          <Title titleText="Cadastro de Novo Role" />
          <Input
            label="Nome do Rolê"
            iconName="title"
            onChangeText={eventName => this.setState({ eventName })}
          />

          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Button 
            style={{margin: 20, padding: 20}}
            title="Adicionar imagem" onPress={this._pickImage} />
            {photo && (
              <Image
                source={{ uri: photo }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>

          <Input
            iconName="description"
            label="Descrição"
            returnKeyType=""
            multiline={true}
            onChangeText={eventDescription =>
              this.setState({ eventDescription })
            }
          />

          <Input
            iconName="insert-link"
            label="Link de Referência"
            onChangeText={linkReference => this.setState({ linkReference })}
          />

          <Input
            iconName="person"
            label="Nome para Contato"
            onChangeText={organizer => this.setState({ organizer })}
          />

          <Input
            iconName="phone"
            label="Telefone para Contato"
            onChangeText={organizerTel => this.setState({ organizerTel })}
            keyboardType="numeric"
          />

          <Input
            iconName="attach-money"
            label="Valor do Ingresso"
            onChangeText={value => this.setState({ value })}
            keyboardType="numeric"
          />

          <Input
            iconName="place"
            label="Local"
            onChangeText={address => this.setState({ address })}
          />

          <Input
            iconType="MaterialCommunityIcons"
            iconName="google-maps"
            label="Link Localização Google Maps"
            onChangeText={linkAddress => this.setState({ linkAddress })}
          />

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View>
              <TouchableOpacity
                style={styles.time}
                onPress={() => this.datePicker()}
              >
                <MaterialIcons style={styles.icon} name={"today"} size={26} />
                <Text>{this.state.eventDate || "Data"}</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.time}
                onPress={() => this.timePicker()}
              >
                <MaterialIcons
                  style={styles.icon}
                  name={"access-time"}
                  size={26}
                />
                <Text>{this.state.eventHour || "Horário"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Input
            iconType="Entypo"
            iconName="drink"
            label="Bebidas"
            onChangeText={drinks => this.setState({ drinks })}
          />

          <Input
            iconType="MaterialCommunityIcons"
            iconName="food-fork-drink"
            label="Comidas"
            onChangeText={foods => this.setState({ foods })}
          />

          <View style={styles.inputContainerSwitch}>
            <Foundation style={styles.icon} name="prohibited" size={30} />
            <Switch
              style={styles.switch}
              value={this.state.adultOnly}
              onValueChange={adultOnly => {
                this.setState({ adultOnly });
              }}
            />
          </View>

          <View style={styles.submitButton}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.cadastrarRole()}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );

    console.log(this.state.photo);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  button: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 350,
    borderRadius: 30,
    backgroundColor: "limegreen"
  },
  submitButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  buttonText: {
    color: "white",
    fontSize: 20
  },
  inputTime: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "limegreen",
    width: 150,
    marginBottom: 10
  },
  image: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "limegreen"
  },
  switch: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff"
  },
  inputContainerSwitch: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingRight: 150,
    paddingLeft: 140
  },
  icon: {
    padding: 5,
    alignContent: "center",
    alignItems: "center"
  },
  time: {
    borderBottomWidth: 1,
    //marginLeft: 10,
    //marginRight: 10,
    minWidth: "40%",
    justifyContent: "center",
    alignItems: "center"
  }
});