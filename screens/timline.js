import * as React from 'react';
import { View, Button, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart, Path, Grid } from 'react-native-svg-charts';
import { Line } from 'react-native-svg';
import * as shape from 'd3-shape'
import firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "./config";
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}
// import HomeScreen from "./screens/login";
const requests = [
  {
    id: 1,
    bloodType: "B+",
    name: "Nabeel Naeem",
    age: 21,
    gender: "Male",
    distance: 28,
    time: 12,
    priority: "urgent",
  },
  {
    id: 14,
    bloodType: "B+",
    name: "Nabeel Naeem",
    age: 21,
    gender: "Male",
    distance: 28,
    time: 12,
    priority: "urgent",
  },
  {
    id: 4,
    bloodType: "B+",
    name: "Nabeel Naeem",
    age: 21,
    gender: "Male",
    distance: 28,
    time: 12,
    priority: "urgent",
  },
  {
    id: 5,
    bloodType: "B+",
    name: "Nabeel Naeem",
    age: 21,
    gender: "Male",
    distance: 28,
    time: 12,
    priority: "urgent",
  },
  {
    id: 2,
    bloodType: "0+",
    name: "Maaz ali",
    age: 21,
    gender: "Male",
    distance: 28,
    time: 32,
    priority: "urgent",
  },
  {
    id: 3,
    bloodType: "AB+",
    name: "Ali Usama",
    age: 24,
    gender: "Male",
    distance: 28,
    time: 12,
    priority: "urgent",
  },
];
const chart = [
  1.1,
  3,
  1.5,
  2.5,
  1.1,
  3,
  1.5,
  2.5,
  1.1,
  5,
  1.5,
  2.5,
  1.1,
  7,
  1.5,
  2.5,
];

const renderRequest = (request) => {
  return (
    <View style={styles.request}>
      <View style={styles.requestStatus}>
        <View style={{ flex: 0.25, alignItems: "center", justifyContent: "center", backgroundColor: "#D6181F", }} >
          <Text style={{ color: "#fff", fontSize: 8, textTransform: "uppercase" }}>{request.priority}</Text>
        </View>
        <View style={{ flex: 0.7, alignItems: "center", justifyContent: "center", }} >
          <Text style={{ fontSize: 26, color: "#fff", }}>{request.bloodType}</Text>
        </View>
      </View>
      <View style={{ flex: 0.75, alignItems: "center", justifyContent: "center", }}>
        <Text style={{ fontSize: 18, paddingVertical: 8, }} >{request.name}</Text>
        <Text style={{ fontSize: 12, fontWeight: '500', }}>
          {request.age}  •  {request.gender}  •  {request.distance}km  •  {request.time}hrs
    </Text>
      </View>

    </View>
  );
}


function Timeline({ route, navigation }) {
  var mostViewedPosts = firebase.database().ref('bloodBank');
          mostViewedPosts.on('value',(snap) => {
            const main = snap.val();
            console.log(main[1]);
            // requests.push(snap.val());
          })
  const { uid, email } = route.params;
  const onDonatePress = () => {
    navigation.navigate('Need', {
      uid: uid,
      email: email,
    });

} 
  
return (
  <SafeAreaView style={styles.safe}>
    <View style={styles.header}>
      <View style={styles.row}>
        <View style={{ alignItems: "center", justifyContent: 'center', flex: 1, }}>
          <Text style={{ fontSize: 18, marginTop: 10, color: '#fff', }}>Blood Requests</Text>
        </View>

      </View>
      <View style={styles.headerchart}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 30, }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', }} >
            <Text style={{ fontSize: 32 }}>291</Text>
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#ED6004", paddingHorizontal: 10 }}>-12%</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: "center", }} >
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#D6181F", paddingHorizontal: 10 }}>+49%</Text>
            <Text style={{ fontSize: 32, }} >481</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 30, }}>
          <Text style={{ fontSize: 12, fontWeight: '200', }}>Available</Text>
          <Text style={{ fontSize: 12, fontWeight: '200', }}>Requests</Text>
        </View>

        <View >
          <LineChart
            style={{ height: 100 }}
            data={chart}
            svg={{ stroke: 'rgb(214, 24, 31)', strokeWidth: 1.25, }}
            contentInset={{ top: 20, bottom: 20 }}
          >
            {/* <Grid /> */}
            <Line
              key={'zero-axis'}
              x1={'0%'}
              x2={'100%'}
              y1={'50%'}
              y2={'50%'}
              curve={shape.curveMonotoneX}
              belowchart={true}
              stroke={"#D9D2D2"}
              strokeDasharray={[2, 10]}
              strokeWidth={2}
            />
          </LineChart>
        </View>
      </View>
    </View >

    {/* header ends */}

    <View style={styles.requests}>
      <View style={styles.requestsHeader} >
        <Text>Recent Updates</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={onDonatePress} >
          <Text style={{ fontWeight: '500', backgroundColor: "#D6181F", color: "#fff", padding: 10, borderRadius: 10 }}>Need</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {requests.map(request => (
          <TouchableOpacity activeOpacity={0.5} key={`request-${request.id}`}>
            {renderRequest(request)}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>



  </SafeAreaView>
);
}
const styles = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: "#D6181F",
    marginTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 0.42,
    paddingHorizontal: 15,
    flexDirection: 'column',


  },

  row: {
    flex: 0,
    flexDirection: 'row',
    paddingVertical: 15,
  },
  headerchart: {

    backgroundColor: "#fff",
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    zIndex: 1,
  },
  requests: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F6F5F5",
    marginTop: -40,
    paddingTop: 55 + 20,
    paddingHorizontal: 25,
    zIndex: -1,

  },
  requestsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    paddingHorizontal: 20,
    paddingBottom: 15,

  },
  request: {
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    backgroundColor: "#fff"
  },
  requestStatus: {
    flex: 0.25,
    borderRadius: 10,
    flexDirection: 'column',
    backgroundColor: "#3A3232",
    marginRight: 20,
    overflow: 'hidden',
    height: 90,

  },

});

export default Timeline;