import { RefreshControl, ScrollView, StyleSheet, View, Text} from 'react-native';
import { Font, GET_POSTS_URL } from '../../constant';
import { ForumListItem, LoadingContainer } from '../../component';
import react, { useState, useEffect, useCallback } from 'react'
import axios, { AxiosError, AxiosResponse} from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { useAxios } from '../../axios/api'

export function HomeScreen({ navigation }){
  const axios = useAxios()
  const [refreshing, setRefreshing] = useState(false)
  const [data, setData] = useState(null)
  const userState = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const decorationTopStyle = StyleSheet.create({
    backgroundColor: 'orange',
    width: "50%",
    height: "25%",
    transform: [{scale: 1.5}],
    position:'absolute',
    top: 0,
    borderRadius: 180,
    overflow: 'hidden'
  })

  const decorationBottomStyle = StyleSheet.create({
    backgroundColor: 'orange',
    width: "50%",
    height: "25%",
    transform: [{scale: 1.5}],
    position:'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 180,
    overflow: 'hidden'
  })

  useEffect(() => {
    getPosts()
    setRefreshing(false)
  }, [refreshing])

  const getPosts = useCallback(() =>{
      axios.get(GET_POSTS_URL, {
        params: {
          'page':1,
          'limit':10
        }
      })
      .then((resp) => {
            if(resp.status === 200) {
              setData(resp.data.detail)
            }
      })
  },[])

  const onRefresh = useCallback(() => {
      setRefreshing(true);
    }, []);

  return (
    <>
    <View style={decorationTopStyle}/>
    <View style={decorationBottomStyle}/>
    <View>
      <View style={{paddingVertical: 20, paddingHorizontal: 30}}>
        <Text style={{fontSize: Font.LARGE }}>Forum App</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} refreshControl= {
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        {data?.map((item)=> {
          return(
            <ForumListItem item={item} key={item.id}/>
          )
        })}
        <View style={{marginVertical: 25}}/>
      </ScrollView>
    </View>

    </>
  )
}
