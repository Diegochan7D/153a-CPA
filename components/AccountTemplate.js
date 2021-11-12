import React from "react";
import {View, StyleSheet, Text} from 'react-native'

const AccountTemplate = ({header, footer, children}) => {
  return (
    <View style = {styles.container}>
      <View style = {styles.header}>
        {header}
      </View>
      <View style={{flex:4, backgroundColor:"#eee",marginLeft:20,marginRight:20}}>
        {children}
      </View>
      <View style = {styles.footer}>
        {footer}
      </View>
    </View>
  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      flexDirection: 'column',
      padding:0
    },

    header: {
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },

    footer: {
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }
  });


export default AccountTemplate;
