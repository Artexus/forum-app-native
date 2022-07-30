import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { ErrorText } from "../../component/error";
import {Errors, Colors, LOGIN_API_URL, InputFormState} from "../../constant";
import {ButtonContainer, LoadingContainer, TextInputContainer} from '../../component'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { doLogin } from '../../store/auth'
import { useAxios } from '../../axios/api'

export function AuthLoginScreen({ navigation }){
  const axios = useAxios()
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(false);
  const [errorText, setErrorText] = useState("");
  const authContainer = StyleSheet.create({
    flex:1,
    paddingVertical: 20,
    paddingHorizontal: 40,
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'white'
  })

  const [form, setForm] = useState({
    identifier: InputFormState,
    password: InputFormState,
  });

  const loginTitleStyle = StyleSheet.create({
    fontSize: 40,
  })

  const textStyles = StyleSheet.create({
    color: Colors.GRAY
  })

  const decorationStyle = StyleSheet.create({
    backgroundColor: 'orange',
    height: '35%',
    width: windowWidth,
    position:'absolute',
    top: 0,
    borderBottomLeftRadius: 270,
    overflow: 'hidden'
  })
  const registerHandler = () => {
    navigation.navigate('Register')
  }

  const loginHandler = useCallback(async () => {
    await setErrorText("");
    let isError = false
    if(form["identifier"].value === "") {
      setForm((prev) => ({
        ...prev,
        identifier: {
          value: "",
          errMsg: Errors.ErrFieldCannotBeEmpty,
          isError: true,
        },
      }));
      isError = true
    }

    if(form["password"].value === "") {
      setForm((prev) => ({
        ...prev,
        password: {
          value: "",
          errMsg: Errors.ErrFieldCannotBeEmpty,
          isError: true,
        },
      }));
      isError = true
    }

    if (isError) {
      return
    }

    setLoading(true)
    const postData = {
      "identifier": form["identifier"].value,
      "password": form["password"].value
    }
    await axios.post(LOGIN_API_URL, postData)
    .then((resp) => {
       dispatch(doLogin(resp.data.detail))
    }).catch((err) => {
      if(err.response) {
        setErrorText(Errors.ErrLoginProblem);
      }
    })

    setLoading(false)
  }, [errorText, form, auth])

  const handleIdentifierForm = useCallback((text) => {
    setForm((prev) => ({
      ...prev,
      identifier: {
        value: text
      },
    }));
  }, [form])

  const handlePasswordForm = useCallback((text) => {
    setForm((prev) => ({
      ...prev,
      password: {
        value: text
      },
    }));
  },[form])
  return (
    <>
      <LoadingContainer isVisible={loading}/>
      <View style= {authContainer}>
        <View style={decorationStyle}/>
        <Text style={loginTitleStyle}>Login</Text>
        <Text style={textStyles}>Please Sign In to Continue</Text>

        <View style={{marginTop: 30}}>
          <TextInputContainer
          name={"identifier"}
          isError={form["identifier"].isError}
          errorText={form["identifier"].errMsg}
          onChangeText={handleIdentifierForm}
          placeholder={"Input Your Identifier"}/>
        </View>

        <View style= {{marginTop: 10}}>
            <TextInputContainer
            name={"password"}
            isError={form["password"].isError}
            errorText={form["password"].errMsg}
            secureTextEntry={true}
            onChangeText={handlePasswordForm}
            placeholder={"Input Your Password"}/>
        </View>

        <View style= {{width: '45%', alignSelf: 'flex-end'}}>
          <ButtonContainer text={"Login"} onPress={loginHandler}/>
        </View>

        <View style={{alignSelf: 'center'}}>
          <ErrorText text={errorText}/>
        </View>

        <View style= {{marginTop: 20, flexDirection: 'row'}}>
            <Text style={{fontSize:10}}> Don't have an account ?</Text>
            <TouchableOpacity onPress={registerHandler}>
              <Text style={{fontSize:10, color: 'blue'}}> Register Here </Text>
            </TouchableOpacity>
        </View>

      </View>
    </>
  )
}
