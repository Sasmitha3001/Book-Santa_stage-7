import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class MyDonationScreen extends Component{
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            allDonations:[],
            donorName:''
        }
    }

    getUserDetails=()=>{
        db.collection('users').where('email_id','==',this.state.userId).get()
        .then((snapshot)=>{
            snapshot.forEach(doc=>{var document=doc.data();this.setState({donorName:document.first_name+" "+document.last_name})})
        })
    }

    getAllDonations=()=>{
        db.collection('all_donations').where('donor_id','==', this.state.userId).onSnapshot((snapshot)=>{
            var allDonations=[]
            snapshot.docs.map((doc)=>{var document=doc.data();
            document["doc_id"]=doc.id
            allDonations.push(document)
        })
        this.setState({
            allDonations:allDonations
        })
        })
    }

    componentDidMount(){
        this.getAllDonations();
        this.getUserDetails()
    }

    keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <View>
    <Text>{item.book_name}</Text>
     <ListItem
     key={i}
     title={item.book_name}
     subtitle={"Requested By: " +item.requestedBy}
     titleStyle={{color:"black",fontWeight:"bold"}}
     rightElement={
       <TouchableOpacity
       style={styles.button}
       >
         <Text style={{color:"#fffff"}}>Send Book</Text>
       </TouchableOpacity>
     }
     bottomDivider
     >

     </ListItem>
     </View>
    )
  }
    render(){
        return(
            <View>
                <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allDonations}
                renderItem={this.renderItem}
              />
            </View>
        )
    }
}