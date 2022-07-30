import { View } from 'react-native'
import { Colors } from '../../constant'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, SettingScreen, PostScreen } from '../../screen/mainapp';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
export function MainappStack(){
    return (
        <NavigationContainer theme={DefaultTheme}>
            <Tab.Navigator initialRouteName={"Home"}
            screenOptions={{
              showIcon:true,
              headerShown:false,
              tabBarActiveTintColor: Colors.PRIMARY_1,
            }}
            >
            <Tab.Screen name="Home"
                component={HomeScreen}
                options={{
                  tabBarIcon: ({color, size}) => (
                    <Ionicons name="home-sharp" size={size} color={color} />
                  )
                }}/>

          <Tab.Screen name="Post"
              component={PostScreen}
              options={{
                tabBarIcon: ({color, size}) => (
                  <Ionicons name="pencil-sharp" size={size} color={color} />
                )
              }}/>

            <Tab.Screen name="Setting"
                component={SettingScreen}
                options={{
                  tabBarIcon: ({color, size}) => (
                    <Ionicons name="settings-sharp" size={size} color={color} />
                  )
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}
