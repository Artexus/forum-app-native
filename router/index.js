import { AuthStack } from "./auth";
import { MainappStack } from './mainapp'
import { useSelector } from 'react-redux'

export function RouterStack(){
    const state = useSelector((state) => state.auth)
    return (
        state?<MainappStack/>:<AuthStack/>
    )
}
