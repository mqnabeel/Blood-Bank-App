
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TextInput, TouchableOpacity, Image, Platform, ScrollView, StatusBar, SafeAreaView, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import firebase from "firebase";
import "@firebase/auth";
import { firebaseConfig } from "./config";
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

function login({ navigation }) {
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
    const onLoginPress = () => {
        if (email === '' && password === '') {
            setDisplayMessage('Enter details to signup!');
        } else {
            setloading(true);
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((res) => {
                    setloading(false);
                    setDisplayMessage("");
                    navigation.navigate('Timeline', {
                        uid: res.user.uid,
                        email: email,
                       
                    });
                }).catch(ex => {
                    setloading(false);
                    console.log(ex);
                    setDisplayMessage(ex.message);
                });
            
        }

    }
    const MyStatusBar = ({backgroundColor, ...props}) => (
        <View style={[styles.statusBar, { backgroundColor }]}>
          <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
      );
      
    if (isloading) {
        return (
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#f9f9f9" />
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
        <MyStatusBar backgroundColor="#D1001C" barStyle="light-content" />
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../assets/Images/blooddrop.jpg')}
                        />
                    </View>
                    <View style={styles.mainContainer}>
                        <Text style={styles.Heading}> Log In</Text>
                        <Text style={{ color: '#fff' }}> {displayMessage}</Text>
                        <TextInput
                            style={styles.Input}
                            placeholder={"Email"}
                            autoCapitalize='none'
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                        <TextInput
                            style={styles.Input}
                            placeholder={"Password"}
                            autoCapitalize='none'
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            secureTextEntry={true}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={onLoginPress}
                            >
                                <Text style={styles.butText}>LogIn</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate('Auths')}
                            >
                                <Text style={styles.butText} >Sign Up</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D1001C",
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "column",
        fontFamily: "LemonadaRegular",
        
    },
    mainContainer: {
        padding: 100,
        flex: 1,
        alignItems: 'center'
    },
    Heading: {
        fontSize: 40,
        color: "#f9f9f9",
        fontFamily: "LemonadaBold",
        
    },
    Input: {
        backgroundColor: '#D1001C',
        borderBottomColor: '#f9f9f9',
        borderBottomWidth: 1,
        marginVertical: 20,
        width: 200,
        color: "#fff",
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
        marginTop: StatusBar.currentHeight,
        width: 400,
        height: 300,
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D1001C'
    }
});
export default login;