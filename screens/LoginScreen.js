import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';



const LoginScreen = () => {
    const navigation = useNavigation()

    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    
      // Function to handle the login process
      const handleLogIn = async () => {
        try {
          await auth().signInWithEmailAndPassword(email, password)
          .then((res) => {
            console.log("firebase response: ",res);
            console.log('User Login Success');
            console.log("user id :", res.user.uid);
            navigation.navigate('Home')
            setEmail("")
            setPassword("")
        })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }
        
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }
        
            console.error(error);
          });
      }catch(err){
        console.log("Login Error: ",err);
      }
  
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.inputContainer}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.inputContainer}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor:"grey"
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  inputContainer: {
    width: '100%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius:10
  },
});

export default LoginScreen;
