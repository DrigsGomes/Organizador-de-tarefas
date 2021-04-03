import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar} from 'react-native';

export default function App (){
  return(
    <SafeAreaView style={styles.container}>
      
      <StatusBar backgroundColor={"#171d31"} barStyle="light-content"/> 

        <View>  
          <Text style={styles.title}> Minhas tarefas </Text>
        </View>

    </SafeAreaView>

  )

};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#171d31',
  },

  title: {
    marginTop: 10,
    paddingBottom:10,
    fontSize:25,
    textAlign: 'center',
    color: '#fff'

  },
});
