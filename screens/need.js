
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView, StatusBar, YellowBox } from 'react-native';
import { useFonts } from 'expo-font';
import firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "./config";
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


function Profile({ route, navigation }) {
    const [priority, setPriority] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [distance, setDistance] = useState('');
    const [time, setTime] = useState(false);
    const { uid, email } = route.params;

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

    const onNeedPress = () => {
        const key = uid;
        if (name === '' && number === '' && bloodType === '' && deasses === '') {

        } else {


            firebase.database().ref('bloodBank/').push({
                id: uid,
                name: name,
                bloodType: bloodType,
                age: age,
                gender: gender,
                distance: distance,
                time: time,
                priority: priority,
                
            });

            navigation.navigate('Timeline', {
                uid: uid,
                email: email,

            });

            console.ignoredYellowBox = [false];
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>

                <View style={styles.mainContainer}>
                    <Text style={styles.Heading}> Need</Text>
                    {/* <Text style={{ color: '#f9f9f9', }}>{displayMessage}</Text> */}
                    <View style={styles.InputContainer}>


                        <Text style={styles.label}>Name</Text>
                        <TextInput style={styles.Input}
                            placeholder={"Name"}
                            onChangeText={(text) => setName(text)}
                            value={name}
                        />

                        <Text style={styles.label}>Periority</Text>
                        <TextInput style={styles.Input}
                            placeholder={"Name"}
                            onChangeText={(text) => setPriority(text)}
                            value={priority}
                        />

                        <Text style={styles.label}>Age</Text>
                        <TextInput
                            style={styles.Input}
                            placeholder={"Age"}
                            onChangeText={(text) => setAge(text)}
                            value={age}
                        />

                        <Text style={styles.label}>Gender</Text>
                        <TextInput
                            style={styles.Input}
                            placeholder={"Gender"}
                            onChangeText={(text) => setGender(text)}
                            value={gender}
                        />

                        <Text style={styles.label}>Blood Group</Text>
                        <TextInput
                            style={styles.Input}
                            placeholder={"AB+"}
                            onChangeText={(text) => setBloodType(text)}
                            value={bloodType}
                        />

                        <Text style={styles.label}>Distance</Text>
                        <TextInput
                            style={styles.Input}
                            placeholder={"Any Deasses"}
                            onChangeText={(text) => setDistance(text)}
                            value={distance}
                        />

                        <Text style={styles.label}>Time</Text>
                        <TextInput
                            style={styles.Input}
                            placeholder={"Any Deasses"}
                            onChangeText={(text) => setTime(text)}
                            value={time}
                        />

                        <View style={styles.buttonContainer}>



                            <TouchableOpacity
                                style={styles.button}
                                // onPress={() => navigation.navigate('Details')}
                                onPress={onNeedPress}
                            >
                                <Text style={styles.butText} >Need</Text>
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
        justifyContent: 'center',
        // flexDirection: "column",
        fontFamily: "LemonadaRegular",
        marginTop: StatusBar.currentHeight,

    },
    mainContainer: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: "center",
    },
    label: {
        fontSize: 15,
        fontFamily: "LemonadaRegular",
        padding: 0,
        margin: 0,
        color: '#f9f9f9',
        justifyContent: "flex-start",
    },
    InputContainer: {
        justifyContent: "flex-start",
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
        backgroundColor: '#D1001C'
    }
});
export default Profile;