import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity,TextInput } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { Alert } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default class SettingScreen extends Component{
  constructor(){
    super()
    this.state={
        emailId:'',
        firstName:'',
        lastName:'',
        address:'',
        contact:'',
        docId:''
    }
  }

  getUserDetails=()=>{
      var email=firebase.auth().currentUser.email;
      db.collection('users').where('email_ID','==',email).get()
      .then(snapshot=>{
          snapshot.forEach(doc=>{
              var data=doc.data()
              
              this.setState({
                  emailId:data.email_id,
                  firstName:data.firstName,
                  lastName:data.lastName,
                  address:data.address,
                  contact:data.contact,
                  docId:docId
              })
          })
      })
  }
  componentDidMount(){
      getUserDetails()
  }

  updateUserDetails=()=>{
      db.collection('users').doc(this.state.docId)
      .update({
          "first_name":this.state.firstName,
           "last_name":this.state.lastName,
           "address":this.state.address,
           "contact":this.state.contact
      })
      Alert.alert("File updated successfully")
  }
  render(){
      return(
          <View
          style={StyleSheet.container}
          >
            <Header title="Settings" 
            navigation={this.props.navigation}
            />
            <View>
                <TextInput
                style={StyleSheet.formTextInput}
                placeholder={"First Name"}
                maxLength={8}
                onChangeText={(text)=>{
                    this.setState({
                        firstName:text
                    })
                }}
                value={this.state.firstName}
                />


                <TextInput
                style={StyleSheet.formTextInput}
                placeholder={"Last Name"}
                maxLength={8}
                onChangeText={(text)=>{
                    this.setState({
                        lastName:text
                    })
                }}
                value={this.state.lastName}
                />

                <TextInput
                style={StyleSheet.formTextInput}
                placeholder={"Address"}
                maxLength={8}
                onChangeText={(text)=>{
                    this.setState({
                        address:text
                    })
                }}
                value={this.state.address}
                />

                <TextInput
                style={StyleSheet.formTextInput}
                placeholder={"Contact"}
                maxLength={8}
                onChangeText={(text)=>{
                    this.setState({
                        contact:text
                    })
                }}
                value={this.state.contact}
                />    
            </View>
          </View>
      )
  }
}