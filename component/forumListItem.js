import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Font } from '../constant';
import moment from 'moment';

export const ForumListItem = (props) =>{
  return (
    <View style={{marginVertical: 25, marginHorizontal: 30}}>
      <View style={{backgroundColor: Colors.WHITE, padding:10, borderRadius: 15, elevation:6}}>
        <View style={{flexDirection: 'row'}}>
          <Ionicons name="ios-person-circle-sharp" size={48} color="black" />
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: Colors.PRIMARY_1}}>{props.item.username}</Text>
            <Text style={{color: Colors.GRAY, fontSize: Font.SMALL}}>{moment(props.item.created_at).format('DD-MMM-YYYY')}</Text>
          </View>
        </View>

        <View style={{padding: 10}}>
          <Text style={{fontWeight: 'bold', color: Colors.PRIMARY_1}}>{props.item.title}</Text>
          <Text>
            {props.item.description}
          </Text>
        </View>

      </View>
    </View>
  )
}
