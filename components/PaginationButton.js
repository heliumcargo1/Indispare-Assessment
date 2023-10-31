import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions'

const PaginationButton = ({ currentPage, setCurrentPage }) => {
    const loadNextPage = () => {
        setCurrentPage(currentPage + 1);
      };
    const loadPrevPage = () => {
        setCurrentPage(currentPage - 1);
      };
    
  return (
    <View style={styles.container}>
        <View style={styles.innerContainer}>
        <TouchableOpacity onPress={()=>{loadPrevPage()}}>
                <Text style={styles.textStyles}>◀</Text>
            </TouchableOpacity>
            <Text style={styles.textStyles}>Pagination Buttons</Text>
            <TouchableOpacity onPress={()=>{loadNextPage()}}>
                <Text style={styles.textStyles}>▶</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default PaginationButton

const styles = StyleSheet.create({
    container:{
        height:responsiveHeight(7),
        width:responsiveWidth(100),
        backgroundColor:"rgba(160, 155, 500, 0.8)",
        justifyContent:"center",
        alignItems:"center"
    },
    innerContainer:{
        height:"90%",
        width:"90%",
        // backgroundColor:"green",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-evenly"
    },
    textStyles:{
        fontSize:25,
        color:"black"
    }
})