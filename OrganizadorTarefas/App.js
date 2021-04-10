import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar, 
  TouchableOpacity, FlatList, Modal, TextInput, } from 'react-native';

import { Ionicons} from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Animatablebtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App (){
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  function handleAdd(){
    if(input == '') return;

    const data ={
      key: input,
      task: input,
    };

    setTask([...task, data]);
    setOpen(false);
    setInput('');
  }

  // Buscando todas as tarefas ao iniciar o App
  useEffect (()=>{

    async function loadTasks(){
      const  taskStorage = await AsyncStorage.getItem('@task');

      if (taskStorage){
        setTask(JSON.parse(taskStorage));
      }
    }

    loadTasks();

  }, []);

  // Salvando caso tenha alguma tarefa alterada
  useEffect (() => {

    async function saveTasks(){
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }

    saveTasks();

  }, [task]);


  const handleDelete = useCallback((data)=> {
    const find = task.filter(r => r.key !== data.key);
    setTask(find);
  })




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
  renderItem = { ( { item } ) => <TaskList data={item} handleDelete={handleDelete} /> }
  />

  {/*Criando modal*/}
  <Modal animationType='slide' transparent={false} visible={open}>

    <SafeAreaView style={styles.modal}>

      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={() => setOpen(false)}>
          <Ionicons style={{ marginLeft:5 , marginRight:5}} name="md-arrow-back" size={40} color="#FFF"/>
        </TouchableOpacity>
        <Text style={styles.modalTitle}> Nova tarefa</Text>
      </View>

      <Animatable.View style={styles.modalBody} animation= "fadeInUp" useNativeDriver>
        <TextInput
        style={styles.input}
        multiline={true}
        placeholderTextColor='#747474'
        autoCorrect={false}
        placeholder =" O que precisa fazer hoje?"
        value={input}
        onChangeText={ (texto) => setInput(texto)}
        />

        <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
          <Text style={styles.handleText}> Cadastrar </Text>
        </TouchableOpacity>

      </Animatable.View>
    </SafeAreaView>
  </Modal>


  {/* Botão de add*/}
        <Animatablebtn 
        style={styles.fab}
        useNativeDriver
        animation="bounceInUp"
        duration={1500}
        onPress={ () => setOpen(true)}
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
  modalHeader:{
    marginLeft:10,
    marginTop:20,
    flexDirection:'row',
    alignItems: 'center',
    alignContent: 'center',
  },

  modalTitle:{
    marginLeft:15,
    color:'#fff',
    fontSize: 25,
  }, 

  modalBody:{
    marginTop:15,
  },

  input:{
    fontSize:18,
    textAlignVertical:'top',
    color:'#000',
    backgroundColor:'#fff',
    marginLeft:10,
    marginHorizontal:10,
    marginTop:30,
    height: 95,
    padding:10,
    borderRadius:7,
  },

  handleAdd:{
    backgroundColor:'#fff',
    marginLeft:10,
    marginRight:10,
    marginTop:15,
    padding:15,
    alignItems:'center',
    justifyContent:'center',
    height:40,
    borderRadius: 7,
  },

  handleText:{
    fontSize:20,

  },

});
