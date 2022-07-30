import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { AuthLoginScreen } from '../../screen/auth/AuthLoginScreen';
import { AuthRegisterScreen } from '../../screen/auth/AuthRegisterScreen';

const Stack = createNativeStackNavigator();
const loginOption: NativeStackNavigationOptions = {
    headerShown:false,
    animation: 'slide_from_right'
}

export function AuthStack(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Login"} screenOptions={loginOption}>
                <Stack.Screen name="Login"
                    component={AuthLoginScreen}/>
                <Stack.Screen name="Register"
                    component={AuthRegisterScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
