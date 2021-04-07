import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar, 
  TouchableOpacity, FlatList, Modal} from 'react-native';

import { Ionicons} from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable';

const Animatablebtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App (){
  const [task, setTask] = useState([
    { key: 1, task:'Estudar React-Native 1'},
    { key: 2, task:'Estudar React-Native 2'},
    { key: 3, task:'Estudar React-Native 3'},
    { key: 4, task:'Estudar React-Native 4'},
  ]);

  const [open, setOpen] = useState(false);



  return(
    <SafeAreaView style={styles.container}>
      
      <StatusBar backgroundColor={"#171d31"} barStyle="light-content"/> 

        <View>  
          <Text style={styles.title}> Minhas tarefas </Text>
        </View>

  {/* Aqui vai a lista*/}
  <FlatList
  marginHorizontal={10}
  showsHorizontalScrollIndicator={false}
  data={task}
  keyExtractor={ (item) => String(item.key) }
  renderItem={ ({item})=> <TaskList data={item} /> }
  />
  
  <Modal animationType='slide' transparent={false} visible={open}>

  <SafeAreaView style={styles.modal}>

      <View style={styles.headModal}>
      <TouchableOpacity onPress={ () => setOpen(false)}>
        <Ionicons style={{marginLeft:5, marginRight:5}} name="md-arrow-back" size={30} color="#fff"/>
      </TouchableOpacity>
      <Text style={styles.titleModal}>Nova tarefa</Text>


      </View>

  </SafeAreaView>

   

  </Modal>

  {/* Botão de add*/}
        <Animatablebtn 
        style={styles.fab}
        useNativeDriver
        animation="bounceInUp"
        duration={1500}
        onPress={() => setOpen(true)}
        >
          <Ionicons name="ios-add" size={30} color="#fff"/>
        </Animatablebtn>

    </SafeAreaView>

  )

};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#121d31',
  },

  title: {
    marginTop: 10,
    paddingBottom:10,
    fontSize:25,
    textAlign: 'center',
    color: '#fff',
  },
  fab:{
    position: 'absolute',
    width: 60,
    height:60,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#0094ff',
    borderRadius: 30,
    right: 25,
    bottom:25,
    elevation: 3,
    zIndex:9,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset:{
      width:1,
      height:3,
    },
  },

  modal:{
    flex:1,
    backgroundColor:'#121d31',
  },
  
  headModal:{
    marginLeft:10,
    marginTop:20,
    flexBasis: 'row',
    alignContent: 'center',
  },

  titleModal:{
    marginLeft:15,
    fontSize: 25,
    color:'#fff',
  },

});
