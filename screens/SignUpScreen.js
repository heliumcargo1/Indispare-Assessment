import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Button
  } from 'react-native';
  import React, {useState} from 'react';
  import {useNavigation} from '@react-navigation/native';
  import auth from '@react-native-firebase/auth';
  import firestore from '@react-native-firebase/firestore';
  
  
  const SignUpScreen = () => {
    const navigation = useNavigation();  // Access the navigation object using useNavigation from React Navigation
    const [email, setEmail] = useState();//  add email into form
    const [password, setPassword] = useState();//  add password into form
    const ref = firestore().collection('users');  // Reference to the Firestore collection 'users'
  
  // Function to store user data in Firestore
  const storeUser = async (uid) => {
      if (
        email == '' ||
        password == ''
      ) {
        Alert.alert('Please fill all the fields !');
        return;
      } else {
        await ref.add({
          email:email,
          password:password,
          userId:uid
        });
        console.log('user stored');
      }
    };
  
  
    // Function to handle the signup process

    const signUp = async () => {
      if(email != '' && password != ''){
        await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res);
          console.log('User account created & signed in!');
          storeUser(res.user.uid) // Store user data in Firestore
          navigation.navigate('Login'); // Navigate to the Login screen
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
      }
      else{
        Alert.alert("Please fill all the fields correctly")
      }
    };
    return (
        <View style={styles.container}>
        <Text style={styles.title}>SignUp</Text>
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
        <Button title="Signup" onPress={signUp} />
        <View style={styles.innerContainer}>
            <Text style={styles.textStyles}>Already have an Account?</Text>
            <TouchableOpacity onPress={()=>{
                navigation.navigate("Login")
            }}>
                <Text style={[styles.textStyles,{color:"black"}]}>Login</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default SignUpScreen;
  
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
      innerContainer:{
        height:"5%",
        width:"90%",
        // backgroundColor:"red",
        marginTop:"5%",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"
      },
      textStyles:{
        fontSize:20,
        color:"white"
      }
  });
  