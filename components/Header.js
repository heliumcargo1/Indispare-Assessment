import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyles}>DashBoard</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        height:responsiveHeight(7),
        width:responsiveWidth(100),
        backgroundColor:"white",
        justifyContent:"center",
        borderBottomWidth:1,
        borderBottomColor:"black"
    },
    textStyles:{
        fontSize:25,
        color:"black",
        paddingLeft:"5%"
    }
})