import React ,{Component} from 'react';
import {View, Text, StyleSheet, Image, Alert, TextInput, AsyncStorage, ScrollView, FlatList, useState, KeyboardAvoidingView, NativeModules, DeviceEventEmitter} from 'react-native';
// import {FloatingAction} from 'react-native-floating-action'
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
// import ReactNativeAN from 'react-native-alarm-notification';
import PushNotification from 'react-native-push-notification';
import {ReactNativeAN} from 'react-native-alarm-notification';


const alarmNotifData = {
	title: 'Alarm',
	message: 'Wake up',
	vibrate: true,
	play_sound: true,
	schedule_type: 'once',
	channel: 'wakeup',
	data: {content: 'my notification id is 1'},
	loop_sound: true,
	has_button: true,
};

const repeatAlarmNotifData = {
	title: 'Alarm',
	message: 'Stand up',
	vibrate: true,
	play_sound: true,
	channel: 'wakeup',
	data: {content: 'my notification id is 1'},
	loop_sound: true,
	schedule_type: 'repeat',
	repeat_interval: 'minutely',
	interval_value: 5, 
};




// export default class Alarm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             time: moment().format("LTS"),
//             date: moment().format("LL"),
//             Alarmhour: 0,
//             AlarmMinute: 0,
//             alarmHour: [ ],
//             alarmMinute: [ ],
//             alarm: '',
//             fireDate: ReactNativeAN.parseDate(new Date(Date.now())),
//             update: [],
//             futureFireDate: '1000',
//             alarmId: null,
//         };
//     }

//     async setAlarm() {
//         const {fireDate, update} = this.state;

//         const details = {...alarmNotifData, fire_date: fireDate};

//         try{
//             const alarm = await ReactNativeAN.scheduleAlarm(details);
//             if(alarm) {
//                 this.setState({
//                     update: [...update, {date: `alarm set: ${fireDate}`,id: alarm.id }],
//                 });
//             }
//         }
//         catch (e) {
//             Alert.alert(e);
//         }
//     };

//     async setRepeatAlarm() {
//         const {fireDate, update} = this.state;

//         const details = {...repeatAlarmNotifData, fire_date: fireDate};

//         try{
//             const alarm = await ReactNativeAN.scheduleAlarm(details);
//             if(alarm) {
//                 this.setState({
//                     update: [...update, {date: `alarm set: ${fireDate}`, id: alarm.id}],
//                 });
//             }
//         }
//         catch(e) {
//             Alert.alert(e);
//         }
//     };

//     async setFutureAlarm() {
//         const{futureFireDate, update} = this.state;

//         const fire_date = ReactNativeAN.parseDate(new Date(Date.now()) + parseInt(futureFireDate, 10));
//         const details = {...alarmNotifData, fire_date};

//         try{
//             const alarm = await ReactNativeAN.scheduleAlarm(details);
            
//             if(alarm) {
//                 this.setState({
//                     update: [...update, {date: `alarm set: ${fire_date}`, id: alarm.id}],
//                 });
//             }
//         }
//         catch(e) {
//             Alert.alert(e);
//         }
//     };

//     async stopAlarmSound() {
// 		ReactNativeAN.stopAlarmSound();
// 	};

// 	sendNotification() {
// 		const details = {
// 			...alarmNotifData,
// 			data: {content: 'hello'},
// 		};
// 		console.log(details);
// 		ReactNativeAN.sendNotification(details);
// 	};

   
//         async componentDidMount() {
//         const alarms = await AsyncStorage.getItem('alarms');
//         if(alarms && alarms.length > 0) {
//             this.setState({
//                 alarms: JSON.parse(alarms)
//             })
//         }

//         DeviceEventEmitter.addListener('OnNotificationDismissed', async (e) => {
// 			const obj = JSON.parse(e);
// 			console.log(`Notification id: ${obj.id} dismissed`);
// 		});

// 		DeviceEventEmitter.addListener('OnNotificationOpened', async (e) => {
// 			const obj = JSON.parse(e);
// 			console.log(obj);
// 		});

// 		if (Platform.OS === 'ios') {
// 			this.showPermissions();

// 			ReactNativeAN.requestPermissions({
// 				alert: true,
// 				badge: true,
// 				sound: true,
// 			}).then(
// 				(data) => {
// 					console.log('RnAlarmNotification.requestPermissions', data);
// 				},
// 				(data) => {
// 					console.log('RnAlarmNotification.requestPermissions failed', data);
// 				},
// 			);
// 		}

//     };

//     showPermissions() {
// 		ReactNativeAN.checkPermissions((permissions) => {
// 			console.log(permissions);
// 		});
// 	};

// 	async viewAlarms() {
// 		const list = await ReactNativeAN.getScheduledAlarms();

// 		const update = list.map((l) => ({
// 			date: `alarm: ${l.day}-${l.month}-${l.year} ${l.hour}:${l.minute}:${l.second}`,
// 			id: l.id,
// 		}));

// 		this.setState({update});
// 	};

// 	async deleteAlarm() {
// 		const {alarmId} = this.state;
// 		if (alarmId !== '') {
// 			console.log(`delete alarm: ${alarmId}`);

// 			const id = parseInt(alarmId, 10);
// 			ReactNativeAN.deleteAlarm(id);
// 			this.setState({alarmId: ''});

// 			ToastAndroid.show('Alarm deleted!', ToastAndroid.SHORT);

// 			await this.viewAlarms();
// 		}
//     };
    
//     componentWillUnmount() {
// 		DeviceEventEmitter.removeListener('OnNotificationDismissed');
// 		DeviceEventEmitter.removeListener('OnNotificationOpened');
// 	}

//     render() {
//         const {Alarmhour, AlarmMinute,update, fireDate, futureFireDate, alarmId} = this.state
//         setInterval(() => {
//             this.setState({
//                 time: moment().format("LTS"),
//                 date: moment().format("LL"),
//             })
//         },1000)
//         return(
            
//             <View style = {styles.Container}>
//                 <Text style = {styles.time} >
//                     {this.state.time}
//                 </Text>
//                 <Text style = {styles.date}>
//                     {this.state.date}
//                 </Text>
//                 <View style = {styles.wrapper}>
//                 <View>
//                     <TextInput
//                     style = {styles.date}
//                     onChangeText = {(text) => this.setState({fireDate: text})}
//                     value = {fireDate} />
//                 </View>
//                 <View>
//                     <Text style = {{color: "#ffffff"}}> Alarm Time from now</Text>
//                     <TextInput 
//                     style = {styles.date}
//                     onChangeText = {(text) => this.setState({futureFireDate: text})}
//                     value = {futureFireDate}/>
//                 </View>
//                 <View style = {styles.margin}>
//                     <TouchableOpacity
//                     onPress = {this.setAlarm} >
//                         <Text style = {{color: "#ffffff"}}>Set alarm</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style = {styles.margin}>
//                     <TouchableOpacity
//                     onPress = {this.setFutureAlarm}>
//                         <Text style = {{color:"#ffffff"}}>Set Future Alarm</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style = {styles.margin}>
//                     <TouchableOpacity
//                     onPress = {this.setRepeatAlarm}>
//                         <Text style = {{color:"#ffffff"}}>Set Alarm with repeat </Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style = {styles.margin}>
//                     <TouchableOpacity
//                     onPress = {this.sendNotification}>
//                         <Text style = {{color:"#ffffff"}}>Set Notification now </Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style = {styles.margin}>
//                     <TouchableOpacity
//                     onPress = {this.stopAlarmSound}>
//                         <Text style = {{color:"#ffffff"}}>Stop alarm sound </Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View>
//                     <TextInput
//                     style = {styles.date}
//                     onChangeText = {(text) => this.setState({ alarmId: text})}
//                     value = {alarmId} />
//                 </View>
//                 <View style = {styles.margin}>
//                     <TouchableOpacity
//                     onPress = {this.deleteAlarm}>
//                         <Text>Delete alarm</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style = {styles.margin}>
//                     <TouchableOpacity
//                     onPress = {this.viewAlarms}>
//                         <Text style = {{color:"#ffffff"}}> See all active alarms</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <Text>{JSON.stringify(update, null, 2)}</Text>
//                 </View>
//                     </View>
//         );
//     }
// } 

export default class Alarm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: moment().format("LTS"),
            date: moment().format("LL"),

        };
    }
    render() {
        setInterval(() => {
                         this.setState({
                             time: moment().format("LTS"),
                             date: moment().format("LL"),
                         })
                     },1000)
        
        return(
            <View style = {styles.Container}>
                 <Text style = {styles.time} >
                     {this.state.time}
                 </Text>
                 <Text style = {{color: "#ffffff",fontSize: 50}}>
                     {this.state.date}
               </Text>
               </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 25,
    },
    time: {
        color: "#ffffff",
        fontSize: 50,
    },
    date: {
        color: "#ffffff",
        fontSize: 40
    },
    roundButton: {
        flexDirection: "row",
        width: 90,
        height: 90,
        borderRadius: 45,
        alignItems: 'flex-end',
        justifyContent: "center",
        alignSelf: "flex-end"
    },
    AlarmTime: {
        fontSize: 40,
        color: "#ffffff",
        fontWeight: '300',
    },
    buttonBorder: {
        height: 40,
        width: 40,
        borderRadius: 20,
        borderWidth: 2,
    },
    input: {
        width: 50,
        height: 30,
        paddingTop: 10,
        color: "#ffffff",
        fontSize: 20,
        backgroundColor: "#50D167",
        marginHorizontal: 20,
        marginVertical: 100,

    },
    floatingButton: {
        flex: 1,
        alignItems: "center",
    },
    alarm: {

    },
    alarmText: {
        color: "#ffffff"
    },
    footer: {
        position: 'absolute',
        width: '100%',
        height: 100,
        bottom: 0,
    },
    footerInner: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    btn: {
        zIndex: 1,
        position: 'absolute',
        right: 20,
        top: -50,
        width: 100,
        height: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: '#fa3664'
    },
    btnText: {
        color: '#fff',
        fontSize: 40,
    },
    textInput: {
        zIndex: 0,
        flex: 1,
        padding: 20,
        fontSize: 16,
        color: '#ffffff',
        backgroundColor: '#262526'
    },
    container: {
        flex: 1,
        position: 'relative'
    },
    scrollView: {
        maxHeight: '82%',
        marginBottom: 100,
        backgroundColor: '#fff'
    },
    alarm: {
        margin: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        backgroundColor: '#f9f9f9',
        borderColor: '#ddd',
        borderRadius: 10,
    },
    alarmText: {
        fontSize: 14,
        padding: 20,
    },
    wrapper: {
        flex: 1,
        padding: 20,
    },
    date: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    margin: {
        marginVertical: 8,
    }
});

