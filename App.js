import { RouterStack } from './router';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { store } from './store'
export default function App() {
  return (
    <Provider store={store}>
      <StatusBar hidden={true}/>
      <RouterStack/>
    </Provider>
  );
}
