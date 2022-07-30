import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { ButtonContainer, TextInputContainer, ErrorText, LoadingContainer } from "../../component";
import {BASE_API_URL, Errors, Colors, InputFormState, REGISTER_API_URL, Validate} from "../../constant";
import { useState, useRef, useEffect } from "react";
import { useAxios } from '../../axios/api'

export function AuthRegisterScreen({ navigation }) {
  const axios = useAxios()
  const validator = require("validator");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(false);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const authContainer = StyleSheet.create({
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 40,
    justifyContent: "center",
    position: "relative",
    backgroundColor: "white",
  });

  const loginTitleStyle = StyleSheet.create({
    fontSize: 40,
  });

  const textStyles = StyleSheet.create({
    color: Colors.GRAY,
  });

  const decorationStyle = StyleSheet.create({
    backgroundColor: "orange",
    height: "35%",
    width: windowWidth,
    position: "absolute",
    top: 0,
    borderBottomRightRadius: 270,
    overflow: "hidden",
  });
  const loginHandler = () => {
    navigation.pop();
  };

  const [form, setForm] = useState({
    email: InputFormState,
    username: InputFormState,
    password: InputFormState,
    confirmPassword: InputFormState,
  });
  const handleEmailForm = (text) => {
    let errMsg = ""
    let isError = false
    let value = text
    if (!validator.isEmail(text)) {
      errMsg = Errors.ErrEmailIsNotValid
      isError = true
    }

    setForm((prev) => ({
      ...prev,
      email: {
        errMsg: errMsg,
        value: value,
        isError: isError,
      },
    }));
  };

  const handleUsernameForm = (text) => {
    let errMsg = ""
    let isError = false
    let value = ""
    if (text.length > Validate.usernameMaxLength) {
      errMsg = Errors.ErrUsernameMaxLength
      isError = true
    } else {
      value = text
    }

    setForm((prev) => ({
      ...prev,
      username: {
        errMsg: errMsg,
        isError: isError,
        value: value
      },
    }));
  };

  const handlePasswordForm = (text) => {
    let isDigit = false;
    let isUpper = false;
    let errMsg = ""
    let isError = false
    let value = text
    const regexDigit = /\d/;
    const regexUpper = /[A-Z]/;
    if (regexDigit.test(text)) {
      isDigit = true;
    }
    if (regexUpper.test(text)) {
      isUpper = true;
    }

    if (text.length > Validate.passwordMaxLength || !isDigit || !isUpper) {
      errMsg = Errors.ErrPasswordInvalid
      isError = true
    }

    setForm((prev) => ({
      ...prev,
      password: {
        errMsg: errMsg,
        isError: isError,
        value: value
      },
    }));
  };

  const handleConfirmPasswordForm = (text) => {
    let errMsg = ""
    let isError = false
    let value = text
    if (text !== form.password.value) {
      errMsg = Errors.ErrConfirmPasswordInvalid
      isError = true
    }

    setForm((prev) => ({
      ...prev,
      confirmPassword: {
        errMsg: errMsg,
        value: value,
        isError: isError,
      },
    }));
  };

  const handleRegister = async () => {
    await setErrorText("")
    for (let x in form) {
      if(form[x].isError || form[x].value === "") {
        setErrorText(Errors.ErrFillInEachField)
        break
      }
    }

    if (errorText !== ""){
      return
    }

    setLoading(true)
    const postData = {
      "username": form["username"].value,
      "email": form["email"].value,
      "password": form["password"].value
    }
    await axios.post(REGISTER_API_URL, postData)
    .then((resp) => {
      if(resp.status === 201) {
        navigation.pop();
      }
    }).catch((err) => {
      if(err.response) {
        setErrorText(Errors.ErrThereIsSomethingWrong);
      }
    })

    if (isMounted.current) {
        setLoading(false)
    }
  };

  useEffect(() => {
    return () => {
      isMounted.current = true
    }
  })
  return (
    <>
      <LoadingContainer isVisible={loading}/>
      <View style={authContainer}>
        <View style={decorationStyle} />
        <Text style={loginTitleStyle}>Register</Text>

        <View style={{ marginTop: 60, position: "relative" }}>
          <TextInputContainer
            name="email"
            onChangeText={handleEmailForm}
            isError={form["email"].isError}
            errorText={form["email"].errMsg}
            placeholder={"Input Your Email"}
          />
        </View>

        <View>
          <TextInputContainer
            name="username"
            onChangeText={handleUsernameForm}
            isError={form["username"].isError}
            errorText={form["username"].errMsg}
            placeholder={"Input Your Username"}
          />
        </View>

        <View>
          <TextInputContainer
            name="password"
            onChangeText={handlePasswordForm}
            isError={form["password"].isError}
            errorText={form["password"].errMsg}
            secureTextEntry={true}
            placeholder={"Input Your Password"}
          />
        </View>

        <View>
          <TextInputContainer
            name="confirmPassword"
            onChangeText={handleConfirmPasswordForm}
            isError={form["confirmPassword"].isError}
            errorText={form["confirmPassword"].errMsg}
            value={form["confirmPassword"].value}
            secureTextEntry={true}
            placeholder={"Re-Input Your Password"}
          />
        </View>

        <View style={{ width: "45%", alignSelf: "flex-end" }}>
          <ButtonContainer text={"Register"} onPress={handleRegister} />
        </View>

        <View style={{alignSelf: 'center'}}>
          <ErrorText text={errorText}/>
        </View>

        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <Text style={{ fontSize: 10 }}> Already have an account ?</Text>
          <TouchableOpacity onPress={loginHandler}>
            <Text style={{ fontSize: 10, color: "blue" }}> Login Here </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
