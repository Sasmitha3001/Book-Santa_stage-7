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

export default class NotificationScreen extends Component{
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            allNotification:[]
        }
    }

    getNotifications=()=>{
        db.collection('notification').where('notificationStatus','==','unread').where('donor_id','==',this.state.userId)
        .onSnapshot((snapshot)=>{
            var allNotification=[]
            snapshot.docs.map((doc)=>{var document=doc.data();
            document["doc_id"]=doc.id
            allNotification.push(document)
        })
        this.setState({
           allNotification:allNotification
        })
        })
    }

    componentDidMount(){
        this.getNotifications()
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
                data={this.state.allNotification}
                renderItem={this.renderItem}
              />
            </View>
        )
    }
}