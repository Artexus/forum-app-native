import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import {Colors} from '../constant/color'

const styles = StyleSheet.create({
  width: '100%',
  alignItems: 'center',
  paddingVertical: 10,
  backgroundColor: Colors.PRIMARY_1,
  elevation: 3,
})

export const ButtonContainer = (props) => (
  <TouchableOpacity {...props} style={styles}>
    <Text style={{fontSize: 15}}>{!props.text?"PUT SOMETHING HERE":props.text}</Text>
  </TouchableOpacity>
)
