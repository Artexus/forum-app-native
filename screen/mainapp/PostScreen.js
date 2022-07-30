import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors, Font, InputFormState, Errors, POST_URL } from '../../constant';
import { TextBoxContainer, TextInputContainer, ButtonContainer, ErrorText } from '../../component'
import { useAxios } from '../../axios/api'
import { useState, useCallback } from 'react'

export function PostScreen({ navigation }){
  const axios = useAxios()
  const [errorText, setErrorText] = useState("")
  const initialState = {
        "title": InputFormState,
        "description": InputFormState
  }
  const [form, setForm] = useState(initialState)

  const titleHandler = useCallback((text) => {
    setForm((prev) => ({
      ...prev,
      title: {
        value: text
      }
    }))
  },[form])

  const textHandler = useCallback((text) => {
    setForm((prev) => ({
      ...prev,
      description: {
        value: text
      }
    }))
  },[form])

  const postHandler = useCallback(async () => {
    setErrorText("")
    if (form["description"].value?.length <= 0 || form["title"].value?.length <= 0) {
      setErrorText(Errors.ErrFillInEachField)
      return
    }


    await axios.post(POST_URL, {
      "title": form["title"].value,
      "description": form["description"].value
    }).then((resp) => {
      setForm(initialState)
      navigation.navigate({name: "Home"})
    })


  },[form, errorText, axios])

  return (
    <>
    <View style={{position: 'absolute', top:0, width:'100%',height: '100%'}}>
      <Svg>
        <Path
          fill={Colors.PRIMARY_1}
          d="M0,96L20,128C40,160,80,224,120,224C160,224,200,160,240,128C280,96,320,96,360,117.3C400,139,440,181,480,176C520,171,560,117,600,90.7C640,64,680,64,720,101.3C760,139,800,213,840,240C880,267,920,245,960,245.3C1000,245,1040,267,1080,229.3C1120,192,1160,96,1200,69.3C1240,43,1280,85,1320,96C1360,107,1400,85,1420,74.7L1440,64L1440,0L1420,0C1400,0,1360,0,1320,0C1280,0,1240,0,1200,0C1160,0,1120,0,1080,0C1040,0,1000,0,960,0C920,0,880,0,840,0C800,0,760,0,720,0C680,0,640,0,600,0C560,0,520,0,480,0C440,0,400,0,360,0C320,0,280,0,240,0C200,0,160,0,120,0C80,0,40,0,20,0L0,0Z"
        >
        </Path>
      </Svg>
    </View>

    <View style= {{marginVertical: 20, padding:20}}>
      <Text style={{fontSize: Font.LARGE}}>Create Your Own Stories !</Text>
    </View>

    <View style={{backgroundColor: 'white', marginHorizontal:25, paddingVertical: 15, elevation: 5, borderRadius: 15}}>
        <View style={{paddingHorizontal: 20}}>
          <Text style={{fontWeight: 'bold'}}>Title</Text>
          <TextInputContainer placeholder={"Title"} value={form["title"].value}  onChangeText={titleHandler}/>

          <Text style={{fontWeight: 'bold'}}>Description</Text>
          <TextBoxContainer placeholder={"Text"} value={form["description"].value} onChangeText={textHandler}/>


          <ButtonContainer text={'POST'} onPress={postHandler}/>

          <View style={{alignSelf: 'center'}}>
            <ErrorText text={errorText}/>
          </View>
        </View>
    </View>
    </>
  )
}
