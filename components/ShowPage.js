import React, { useState, useEffect } from "react";
import { Text, View, Button, TextInput} from "react-native";

const ShowPage = ({link}) => {
	const [webText, setWebText] = useState(link)
  const [newUrl, setUrl] = useState("")

	async function fetchText(){
		await fetch(link)
        .then(response => setWebText(response))
        .catch((error) => console.error(error))

	}

    return (
  <View>
    <TextInput
      style = {{height: 40}}
      placeholder = "Please enter url"
      onChangeText = {text => {setUrl(text)}}
    />

    <Button
      onPress = {() => {
        useEffect(() => {
              fetchText();
          },[]);
      }}
      title = "Get the text"/>
		<Text>{webText}</Text>
  </View>
	)}


export default ShowPage;
