import { ActivityIndicator, View, Dimensions } from 'react-native';
import {Colors} from '../constant'

export function LoadingContainer(props){
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const isVisible = typeof(props.isVisible) === 'undefined' ? false : props.isVisible
  return (
    isVisible && <>
   <View style={{height: windowHeight, width: windowWidth, backgroundColor:'black', opacity: 0.4, position: 'absolute', zIndex: 2}}/>
    <View style={{height: windowHeight, width: windowWidth, position: 'absolute', zIndex: 3, justifyContent: 'center'}}>
      <ActivityIndicator
         animating = {true}
         color = {Colors.PRIMARY_1}
         size = "large"/>
    </View>
    </> : null
  )
}
