import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions'
import firestore from '@react-native-firebase/firestore';


const List = ({title,id}) => {
    
    const  deleteSample = async ()=>{
        const ref = firestore().collection('sample').doc(id)
        ref.delete()

    }
  return (
    <View style={styles.container}>
        <View style={styles.leftContainer}>
            <Text style={styles.textStyles}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.rightContainer} onPress={()=>{deleteSample()}}>
            <Text style={styles.textStyles}>-</Text>
        </TouchableOpacity>
    </View>
  )
}

export default List

const styles = StyleSheet.create({
    container:{
        height:responsiveHeight(10),
        width:responsiveWidth(90),
        borderRadius:10,
        backgroundColor:"rgba(214, 202, 208, 0.8)",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginTop:"2%"
    },
    leftContainer:{
        height:"100%",
        width:"80%",
        // backgroundColor:"green",
        justifyContent:"center",
        alignItems:"center"
    },
    rightContainer:{
        height:50,
        width:50,
        backgroundColor:"rgba(160, 155, 500, 0.8)",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:50,
        right:"10%"
    },
    textStyles:{
        fontSize:30,
        color:"black"
    }
})