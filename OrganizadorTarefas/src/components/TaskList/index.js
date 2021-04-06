import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function TaskList({data}){
    return(
        <View style={styles.container}>

            <TouchableOpacity>
                <Ionicons name="md-checkmark-circle" size={30} color="#121212"/>
            </TouchableOpacity>

            <View>
                 <Text style={styles.teskText}>{data.task}</Text>
            </View>

        </View>
    )      
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#fff',
        borderRadius: 5,
        padding:7,
        elevation:1.8,
        shadowColor:'#000',
        shadowOpacity:0.4,
        textShadowOffset:{
            width: 1,
            height: 3,
        }
    },

    teskText: {
        color: '#121212',
        fontSize: 20,
        paddingLeft: 8,
        paddingLeft: 20,


    }

    

});