import { StyleSheet, Text } from 'react-native';
import {Colors} from '../constant'

const styles = StyleSheet.create({
  alignItems: 'center',
  paddingVertical: 15,
  color: Colors.ERROR,
  fontSize: 15,
})

export const ErrorText = (props) => (
    <Text style={styles}>{props.text}</Text>
)
