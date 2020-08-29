import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import moment from 'moment';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { ScrollView } from 'react-native-gesture-handler';

function Timer({ interval, style }) {
    
    const duration = moment.duration(interval)
    let formatted = moment.utc(duration.asMilliseconds()).format("mm:ss.sss");
    const rounded_milli_seconds = Math.floor(duration.milliseconds()/10)
    return(
        <Text style = {style}>{formatted}</Text>
    // <Text style = {style}>{duration.minutes()}:{duration.seconds()}:{rounded_milli_seconds}</Text>
    );
}


function RoundButton({ title, color, background, onPress, disabled }) {
    return(
        <TouchableOpacity 
        style = {[styles.roundButton, {backgroundColor: background}]}
        onPress = {() => !disabled && onPress()}
        activeOpacity = {disabled? 1.0 : 0.7}>
            <View style = {styles.buttonBorder} >

            <Text style = {[ styles.buttonTitle, {color}]}>{title}</Text>
            </View>
            </TouchableOpacity>
           );
}

function Lap( { number, interval, fastest, slowest}) {
    const lapStyle = [
        styles.lapText,
        fastest && styles.fastest,
        slowest && styles.slowest,
    ]
    return(
        <View style = {styles.lap}>
            <Text style = {lapStyle}> Lap {number} </Text>
            <Timer style = {lapStyle} interval = {interval} />
        </View>
    );
}

function LapsTable({ laps, timer }) {
    const finishedLaps = laps.slice(1);
    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;
    if(finishedLaps.length >= 2) {
        finishedLaps.forEach(lap => {
            if (lap< min) min = lap
            if (lap >max) max = lap
            
        });
    }
    return(
        <ScrollView style = {styles.scrollView}>
            {laps.map((lap, index) => (
                <Lap number = {index} 
                key = {index} 
                interval = {index === 0 ? timer + lap : lap}
                fastest = {lap === min}
                slowest = {lap === max} />
                ))}
        </ScrollView>


    );
}

export default class StopWatch extends Component {
    constructor(props){
        super(props);
        this.state = {
            start: 0,
            now: 0,
            laps: [ ],
        };
        this.start = this.start.bind(this);
    }
    
    componentWillUnmount(){
        clearInterval(this.timer)
    }
     reload = () => {
        this.setState({
            now: new Date().getTime()
        });
    }

     start = () => {
        const now = new Date().getTime()
        this.setState({
            start: now,
            now,
            laps: [0],
        })
        
        this.timer = setInterval( this.reload ,1);
            }

      lap = () => {
          const timeStamp = new Date().getTime()
          const {laps, now, start} = this.state
          const [firstLap, ...other] = laps
          this.setState({
              laps: [0, firstLap + now - start, ...other],
              start: timeStamp,
              now: timeStamp
          })
      }
      
      stop = () => {
          clearInterval(this.timer)
        const {laps, now, start} = this.state
        const [firstLap, ...other] = laps
        this.setState({
            laps: [firstLap + now - start, ...other],
            start: 0,
            now: 0,
        })

      }

      reset = () => {
          this.setState({
              laps: [],
              start: 0,
              now: 0,
          })
      }
      resume = () => {
          const now = new Date().getTime();
          this.setState({
              start: now,
              now,
          })
          this.timer = setInterval( this.reload ,1);
            }
      
    render() {
        const {now, start , laps } =  this.state;
        const timer = now - start;
        return(
             <View style = {styles.container} >
            <Timer 
            interval = {laps.reduce((total, curr) => total + curr, 0) + timer }
             style = {styles.timer} />
            { laps.length === 0 && (
                <View style = {styles.buttonsRow}>
                <RoundButton 
            title = 'Reset' 
            color = '#ffffff'
             background = '#3D3D3D'
             onPress = {this.reset} />
            <RoundButton
            title = 'Start' 
            color = '#50D167'
            background = '#1B361F'
            onPress ={this.start} />
            </View>
              )}
              { start > 0 && (
                  <View style = {styles.buttonsRow} >
                  <RoundButton
              title = 'Lap' 
              color = '#50D167'
              background = '#1B361F'
              onPress = {this.lap}
             />
              <RoundButton
              title = 'Stop' 
              color = '#E33935'
              background = '#3C1715'
              onPress ={this.stop} />
              </View>
              )}
               { laps.length > 0 && start === 0 && (
                  <View style = {styles.buttonsRow} >
                  <RoundButton
              title = 'Reset' 
              color = '#50D167'
              background = '#1B361F'
              onPress = {this.reset}
             />
              <RoundButton
              title = 'Start' 
              color = '#50D167'
              background = '#1B361F'
              onPress ={this.resume} />
              </View>
              )}
              <LapsTable laps = {laps} timer = {timer} />
               </View>
            
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        alignItems: 'center',
        paddingTop: 120,
        paddingHorizontal: 25,
    },
    timer: {
        color: '#ffffff',
        fontSize: 60,
        fontWeight: '300',
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
     buttonsRow: {
         flexDirection: 'row',
         alignSelf: 'stretch',
         justifyContent: "space-between",
         marginTop: 40,
         marginBottom: 20,
        },
        lap: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: '#151515',
            borderTopWidth: 2,
            paddingVertical: 10,
        },
        lapText: {
            color: '#ffffff', 
            fontSize: 18,
        },
       
        scrollView: {
            alignSelf: 'stretch',
        },
        fastest : {
            color: '#50D167'
        },
        slowest :{
            color: '#CC3531'
        }
        
});