import {
  TextInput,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {Colors} from '../constant'

const styles = StyleSheet.create({
    marginVertical: 5,
    fontSize: 15,
});

const textStyles = StyleSheet.create({
  borderBottomWidth: 1,
  padding: 5,
  color: 'black'
})

const inputErrorStyles = StyleSheet.create({
  borderWidth: 1,
  padding: 5,
  borderRadius: 10,
  borderColor: Colors.ERROR
})

const errorStyles = StyleSheet.create({
  fontSize: 11,
  color: 'red'
})

export const TextInputContainer = ({secureTextEntry, placeholder, errorText='', isError=false, ...props}) => {
  return(
    <>
      <View style ={styles}>
        <TextInput
        {...props}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        style={isError? inputErrorStyles:textStyles}
        />
        <Text style={errorStyles}> {errorText} </Text>
      </View>
    </>
  )
}
