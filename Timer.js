import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Icon, TextInput, Picker, TouchableNativeFeedbackBase } from 'react-native';
// import    from 'react-native-vector-icons';

import moment from 'moment';


function RoundButton({ title, color, background, onPress, disabled }) {
    return(
        <TouchableOpacity 
        style = {[styles.roundButton, {backgroundColor: background}]}
        onPress = {() => onPress()}>
            <View style = {styles.buttonBorder} >

            <Text style = {[ styles.buttonTitle, {color}]}>{title}</Text>
            </View>
            </TouchableOpacity>
           );
}

function Iconbutton({start, onPress}) {
    if (start === 1){
        return(
            <TouchableOpacity>
                <View style = {styles.iconButton}>
                <Text style = {{color:"#ffffff", fontSize: 40.0, color: "#50D167"}}  onPress = {onPress}> PLAY </Text>
                </View>
               </TouchableOpacity>
        );
    }
    if (start === 0) {
        return(
            <TouchableOpacity>
                <View>
                <Text style = {{color:"#ffffff", fontSize: 40.0, color : "#3C1715"}} onPress = {onPress}> STOP </Text>
                </View>
               </TouchableOpacity>
        );
    } 
     if(start === 2) {
        return(
            <TouchableOpacity>
                <View>
                <Text style = {{color:"#ffffff", fontSize: 40.0, color : "#3C1715"}} onPress = {onPress}> STOP </Text>
                </View>
               </TouchableOpacity>
        );
     }  
}


export default class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // hour: 0,
            minute: 0,
            second: 0,
            eventTime: moment.duration().add({hours: 0, minutes: 0, seconds: 0}),
            displayTime: 0,
            displayText: null,
            
        }
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }

    start = () => {
        this.setState({
            eventTime: moment.duration().add({ minutes: this.state.minute, seconds:this.state.second}),
            displayText: "minutes",
            displayTime: Math.floor(this.state.minute),
        })
        this.timer = setInterval( () => {
            let tempEventTime = this.state.eventTime

            if(tempEventTime <= 0){
                clearInterval(this.timer)
            }
            else {
                const eventTime = tempEventTime.subtract(1,"s")
                // const hour = tempEventTime.hours()
                const minute = tempEventTime.minutes()
                const second = tempEventTime.seconds()
                // const displayTime = ((this.state.hour) >0) ? Math.floor(this.state.hour) : (((this.state.minute) < 0) ? null : Math.floor(this.state.minute)),
                // const displayText = ((this.state.hour) > 0 )? "hours" : (((this.state.minute) < 0) ? "less than a minute" : "minutes")      
                const displayText =  "minutes"
                const displayTime = Math.floor(minute)
                this.setState({
                    // hour,
                    minute,
                    second,
                    eventTime,
                    displayTime,  
                    displayText,  
                })
            }
        } ,1000);
    }
    stop = () => {
        clearInterval(this.timer);
    }

    reset = () => {
        this.setState({
            minute: 0,
            second: 0,
            eventTime: 0,
        });
    }
    render() {
        const{ minute, second, displayTime, displayText, eventTime} = this.state
        const duration = moment.duration(eventTime)
        let formatted = moment.utc(duration.asMilliseconds()).format("mm:ss");
        
        return(
            <View style = {styles.Container}>
                <Text style = {styles.countdown}>{formatted}</Text>
                {displayTime > 0 && (
                <View style = {styles.info}>
                    <Text style = {styles.infoText}>About </Text>
                     <Text style = {styles.infoTime}> {displayTime}  {displayText} </Text>
                     <Text style = {styles.infoText}>remaining</Text>
                </View>
                )}
                <View style = {{flexDirection: "row", 
                alignSelf: 'stretch',
                justifyContent: "space-between",
                marginTop: 40,
                 marginBottom: 20}} >
                <RoundButton title = "Start" color = "#ffffff" background = "#50D167" onPress = {this.start} /> 
                <RoundButton title = "Stop" color = "#ffffff" background = "#3C1715" onPress = {this.stop} /> 
                <RoundButton title = "Reset" color = "#ffffff" background = "#1B361F" onPress = {this.reset} /> 
                </View>
                
                
                
                <View style ={{flexDirection: "row",}}>
                {/* <TextInput
               placeholder = "HH"
               underlineColorAndroid = "transparent"
               style = {[styles.input, {backgroundColor: "#50D167"}]}
               keyboardType = "numeric"
               onChangeText = {(number) => this.setState({hour: number})} /> */}
                <TextInput
               placeholder = "MM"
               underlineColorAndroid = "transparent"
               style = {[styles.input, {backgroundColor: "#3C1715"}]} 
               keyboardType = "numeric"
               onChangeText = {(number) => this.setState({minute: number})}/>
                <TextInput
               placeholder = "SS"
               underlineColorAndroid = "transparent"
               style = {[styles.input, {backgroundColor: "#50D167"}]} 
               keyboardType = "numeric"
               onChangeText = {(number) => this.setState({second: number })}/>
                

                </View>
               
               
            
        </View>
        );
    }
} 



const styles = StyleSheet.create ({

    Container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        alignItems: 'center',
        paddingTop: 120,
        paddingHorizontal: 25,
    },
    countdown : {
        color: '#ffffff',
        fontSize: 60,
        fontWeight: '300',
    },
    info: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
    },
    infoText: {
        color: "#ffffff",
        fontSize: 20,
        paddingTop: 40,
        
    },
    infoTime: {
        color: "#CC3531",
        fontSize: 25,
        paddingTop: 40,
    },
    iconButton: {
        paddingTop: 20,
        color: "#ffffff",
        fontSize: 30,
    },
    numberRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    number: {
        width: 100,
        height: 100,
        fontSize: 40,
        color: "#ffffff",
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
    roundButton: {
        width: 90,
        height: 90,
        borderRadius: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle :{
        fontSize: 20,

    },
    buttonBorder :{
        width: 75,
        height: 75,
        borderRadius: 38,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
     },

});