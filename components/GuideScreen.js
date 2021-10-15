import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput} from 'react-native';

const GuideScreen = ({navigation}) => {
  return (
    <View style = {styles.container}>
      <View style = {{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
        <Text style = {{fontSize: 25, fontWeight: 'bold'}}> This is an anonymous forum for Brandeis Community, containing four main branches. </Text>
        <Text style = {{fontSize: 20, color:'#ffb6c1'}}>-Confessions: Confess secret love </Text>
        <Text style = {{fontSize: 20, color:'#add8e6'}}>-Moods: Share your moods today </Text>
        <Text style = {{fontSize: 20, color:'#c0c0c0'}}>-Complaints: Vent dissatisfaction</Text>
        <Text style = {{fontSize: 20, color:'#dda0dd'}}>-Gossip: Talk about interesting news</Text>
        <Text style = {{fontSize: 20}}>Guide: </Text>
        <Text style = {{fontSize: 20}}>1.Enter a branch</Text>
        <Text style = {{fontSize: 20}}>2.Type the words you want to say</Text>
        <Text style = {{fontSize: 20}}>3.Paste the URL of the image you want to represent yourself</Text>
        <Text style = {{fontSize: 20}}>4.Click the "Post" button</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection : 'column',
    flex: 1,
    backgroundColor: '#fff',

    textAlign:'left',
    marginTop:20,
    padding:20,
  },

});

export default GuideScreen;
