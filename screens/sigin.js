
import React, {useState} from 'react';
import { View, Button, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig} from "./config";
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }


function Login({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [deasses, setDeasses] = useState('');

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
        // firebase.auth().onAuthStateChanged(function(user) {
        //     if(user){
        //         console.log("Logedin");
        //     }else{
        //         console.log("Nope");
        //     }
        // });
        // const key = firebase.database().ref('users').push().key;
        // firebase.database().ref('users/'+ 126).set({
        //     name: name,
        //     email: email
        //   });
        // firebase.database().ref('UsersList/'+ 265).push({
        //     uid : key,
        //     name: name,
        //     email: email
        // });
        //   var mostViewedPosts = firebase.database().ref('users').orderByChild('MSmX-_ozoyCDy36XKWq/email');
        //   mostViewedPosts.on('value',(snap) => {
        //     console.log(snap.val());
        //   })
        // firebase.database().ref('UsersList/').on('value', function (snapshot) {
        //     console.log(snapshot.val())
        // });
          console.ignoredYellowBox = [3600];
        // if (password !== confirmPassword) {
        //     alert("Passwords don't match.")
        //     console.log("B");

        //     return;
        // }
        // firebase
        //     .auth()
        //     .createUserWithEmailAndPassword(email, password)
        //     .then((response) => {
        //         const uid = response.user.uid
        //         const data = {
        //             id: uid,
        //             email,
        //             name,
        //         };
        //         const usersRef = firebase.firestore().collection('users')
        //         usersRef
        //             .doc(uid)
        //             .set(data)
        //             .then(() => {
        //                 navigation.navigate('Home', {user: data})
        //             })
        //             .catch((error) => {
        //                 alert(error)
        //             });
        //     })
        //     .catch((error) => {
        //         alert(error)
        // });
        // console.log("H");
    }

    return (
        <View style={styles.container}>
            {/* <View>
                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/Images/blooddrop.jpg')}
                />
            </View> */}
            <View style={styles.mainContainer}>
                <Text style={styles.Heading}> Signup</Text>
                <View style={styles.InputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.Input}
                     placeholder={"Name"} 
                     onChangeText={(text) => setName(text)}
                    value={name}
                    />

                    <Text style={styles.label}>Email</Text>
                    <TextInput 
                    style={styles.Input} 
                    placeholder={"Email"} 
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    />

                    <Text style={styles.label}>Number</Text>
                    <TextInput 
                    style={styles.Input} 
                    placeholder={"Number"} 
                    onChangeText={(text) => setNumber(text)}
                    value={number}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput 
                    style={styles.Input} 
                    placeholder={"Password"}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    />

                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput 
                    style={styles.Input} 
                    placeholder={"ConfirmPassword"} 
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    secureTextEntry={true}
                    />

                    <Text style={styles.label}>Blood Type</Text>
                    <TextInput style={styles.Input} placeholder={"AB+"} />

                    <Text style={styles.label}>Any Deasses</Text>
                    <TextInput style={styles.Input} placeholder={"Any Deasses"} />


                    <View style={styles.buttonContainer}>


                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Details')}
                        >
                            <Text style={styles.butText}>LogIn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            // onPress={() => navigation.navigate('Details')}
                            onPress = {onRegisterPress}
                        >
                            <Text style={styles.butText} >SignIn</Text>
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
        justifyContent: 'space-between',
        flexDirection: "column",
        fontFamily: "LemonadaRegular",

    },
    mainContainer: {
        padding: 100,
        flex: 1,
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
});
export default Login;