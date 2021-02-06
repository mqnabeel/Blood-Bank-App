import React ,{ useState}  from 'react';
import { View, Button, Text, StyleSheet, YellowBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "./config";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
// import HomeScreen from "./screens/login";



function DashboardRoute({ route, navigation }) {
  const [useremail, setUserEmail] = useState('');
  const [username, setUserName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const { uid, email } = route.params;
  const onprofile = () => {
  const key = uid;
    firebase.database().ref('usersProfile/' + uid).update({
      gender: "male",
      // email: email,
      // BloodGroup: "AB+"
    });
    console.ignoredYellowBox = [false];

  }
  const onlogout = () => {
    firebase.auth().signOut().then(() => {
      navigation.navigate('Home');
    })
      .catch(error => { console.log(error) });
  }
  const onshow = () => {
    var mostViewedPosts = firebase.database().ref('usersProfile/'+ uid);
    mostViewedPosts.once('value',(snap) => {
          setBloodGroup(snap.val().BloodGroup);
          setUserEmail(snap.val().email);
          setUserName(snap.val().name);
          // console.log();

        });
    console.ignoredYellowBox = [false];
  }
  return (
    <View style={styles.container}>
      <Text>Details Screen - {username} - {useremail} - {bloodGroup}</Text>
      <Button title="Enter Blood Profile" onPress={onprofile}></Button>
      <Button title="Logout" onPress={onlogout}></Button>
      <Button title="show" onPress={onshow}></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DashboardRoute;