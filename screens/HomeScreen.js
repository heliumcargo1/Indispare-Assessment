import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import List from '../components/List';
import { useNavigation } from '@react-navigation/native';
import PaginationButton from '../components/PaginationButton';
import firestore from '@react-native-firebase/firestore';


const HomeScreen = () => {
  const navigation = useNavigation();
  const ref = firestore().collection('sample');

  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [value, setValue]= useState('')
  const [data, setData]= useState([])
//   pagination
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 7; // You can adjust this as needed
const startIdx = (currentPage - 1) * itemsPerPage;
const endIdx = startIdx + itemsPerPage;


  // Function to toggle the visibility of the "Add" button
  const toggleButtonVisibility = () => {
    setIsButtonVisible(!isButtonVisible);
  };

  // Function to open the modal for adding a sample
  const openModal = () => {
    setIsModalVisible(true);
  };

    // Function to close the modal and add a sample to Firestore
  const closeModal = () => {
    setIsModalVisible(false);
    addSample();
  };

    // Function to handle changes in the input field
  const handleTextInputChange = (text) => {
    setValue(text);
  };

    // Function to add a sample to Firestore
  const addSample = async () => {
    if (value == '') {
      Alert.alert('Sample cannot be empty');
      return;
    } else {
      await ref.add({
        title: value,
      });
      console.log('Sampled stored');
      setValue('');
    }
  };
 
    // Use useEffect to fetch and update data from Firestore
  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {title} = doc.data();
        list.push({
          id: doc.id,
          title,
        });
      });

    setData(list)
    console.log(list);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        onScroll={() => setIsButtonVisible(true)}
        scrollEventThrottle={16}
      >

        {data.slice(startIdx, endIdx).map((i) => (
        <List title={i.title} key={i.id} id={i.id} />
      ))}

      </ScrollView>
      {isButtonVisible && (
        <TouchableOpacity style={styles.button} onPress={openModal}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      )}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter text"
            value={value}
            onChangeText={handleTextInputChange}
          />
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    <PaginationButton currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    position: 'absolute',
    top: '85%',
    right: '7%',
    backgroundColor: 'blue',
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
      backgroundColor: 'grey',
      borderColor:"white",
      borderWidth:1,
    color:"black",
    width: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
},
  closeButton: {
      backgroundColor: 'blue',
      height:"5%",
      width:"20%",
      borderRadius: 10,
      justifyContent:"center",
      alignItems:"center"
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default HomeScreen;
