import React, {useState} from 'react';
import { View, Button, Text, StyleSheet, TextInput, TouchableOpacity, Image,ActivityIndicator,Alert } from 'react-native';
import { useFonts } from 'expo-font';
import firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig} from "./config";
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }
 
 function auth({ navigation }) {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayMessage, setDisplayMessage] = useState('');
    const [isloading, setloading] = useState(false);
  

    const [loaded] = useFonts({
        LemonadaBold: require('../assets/fonts/static/Lemonada-Bold.ttf'),
        LemonadaLight: require('../assets/fonts/static/Lemonada-Light.ttf'),
        LemonadaMedium: require('../assets/fonts/static/Lemonada-Medium.ttf'),
        LemonadaRegular: require('../assets/fonts/static/Lemonada-Regular.ttf'),
        LemonadaSemiBold: require('../assets/fonts/static/Lemonada-SemiBold.ttf'),
    });

    if (!loaded) {
        return null;
    }
    const onRegisterPress = () =>{
        if(email === '' && password === '') {
            setDisplayMessage('Enter details to signup!');
        }else{
            setloading(true);
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then((res) => {
                setloading(false);
                    setDisplayMessage("");
                    navigation.navigate('setProfile', {
                        uid: res.user.uid,
                        email: email,
                       
                    });
            }).catch(ex => {
                setloading(false);
                setDisplayMessage(ex.message);

            });
            
        }
        
    }

    if(isloading){
        return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
        );
    }
    return (
        <View style={styles.container}>
            
            <View style={styles.mainContainer}>
                <Text style={styles.Heading}> UserSignup</Text>
                <Text style={{color:'#fff'}}> {displayMessage}</Text>
                <View style={styles.InputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.Input}
                     placeholder={"Email"} 
                     autoCapitalize = 'none'
                     onChangeText={(text) => setEmail(text)}
                    value={email}
                    />
                     <Text style={styles.label}>Password</Text>
                    <TextInput 
                    style={styles.Input} 
                    placeholder={"Password"}
                    autoCapitalize = 'none'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            // onPress={() => navigation.navigate('Details')}
                            onPress = {onRegisterPress}
                        >
                            <Text style={styles.butText} >Sign Up</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    );
 }
 const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D1001C",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
        fontFamily: "LemonadaRegular",

    },
    mainContainer: {
        padding: 100,
        flex: 1,
        justifyContent:"center",
        alignItems: 'center'
    },
    label: {
        fontSize: 10,
        fontFamily: "LemonadaRegular",
        padding: 0,
        margin: 0,
        color: '#f9f9f9',
        justifyContent: "flex-start",
    },
    InputContainer:{
        justifyContent:"flex-start",
    },
    Heading: {
        fontSize: 30,
        color: "#f9f9f9",
        fontFamily: "LemonadaBold",

    },
    Input: {
        backgroundColor: '#D1001C',
        borderColor: '#f9f9f9',
        borderWidth: 1,
        marginVertical: 20,
        width: 300,
        borderRadius: 20,
        padding: 3,
        paddingHorizontal: 15,
        color: '#f9f9f9',
        fontFamily: "LemonadaRegular",
    },
    butText: {
        fontFamily: "LemonadaRegular",
    },
    button: {
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 20,
        fontFamily: "LemonadaBold",
    },
    buttonContainer: {
        justifyContent: 'space-around',
        flexDirection: "row",
    },
    tinyLogo: {
        width: 400,
        height: 100,
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
      }
});
export default auth;