import {View, Text, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../../constant'
import { Ionicons } from '@expo/vector-icons';
import { ButtonContainer } from '../../component'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { doLogout } from '../../store/auth'
const backgroundStyle = StyleSheet.create({

  margin: "10%",
  borderRadius: 15,
  backgroundColor: 'white',
  justifyContent: 'center',
  elevation: 5
})
export function SettingScreen({ navigation }){
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const logoutHandler = useCallback(() => {
    dispatch(doLogout())
  }, [dispatch, doLogout])
  return (
    <>
    <View style= {{flex:1}}>
      <View style={{backgroundColor: Colors.PRIMARY_1, width: "100%", height: "25%", position: 'absolute', zIndex:-1, borderBottomLeftRadius: 90, borderBottomRightRadius: 90}}/>
      <View style={backgroundStyle}>
        <Text style={{fontSize: 40, padding: 20}}>Settings</Text>
        <View style={{alignItems: 'center'}}>
          <Ionicons name="ios-person-circle-sharp" size={96} color="black" />
          <Text style={{fontSize: 21}}>{auth.username}</Text>
          <Text>{auth.email}</Text>
          <View style={{width: "80%", paddingVertical: 20}}>
            <ButtonContainer text={"Logout"} onPress={logoutHandler}/>
          </View>
        </View>
      </View>
    </View>
    </>
  )
}
