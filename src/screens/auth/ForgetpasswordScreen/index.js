import {firebase} from '@react-native-firebase/firestore';
import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import globalStyles from '../../../utils/globalStyles';
import Loader from '../../../components/Loader';
import Icons from '../../../assets';
import {isEmailValid} from '../../../utils/validations';
import Strings from '../../../translation/Strings';

const ForgetPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const forgetPassword = async () => {
    try {
      if (!email) {
        setError(Strings.required);
        return;
      }
      if (!isEmailValid(email)) {
        setError(Strings.invalidEmail);
        return;
      }
      setError('');
      setIsLoading(true);
      await firebase.auth().sendPasswordResetEmail(email);
      setIsLoading(false);

      Toast.show(Strings.linkSend);
      navigation.navigate('LoginScreen');
    } catch (e) {
      const err = e.code.split('/')[1].split('-').join(' ');
      Toast.show(err);
      setEmail('');
      setIsLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.container}>
        <Loader state={isLoading} />
        <View style={globalStyles.alignCenter}>
          <Image source={Icons.Forget} style={styles.icon} />
        </View>

        <Text style={styles.welcomeHeader}>{Strings.forgotText}</Text>

        <View style={styles.formBox}>
          <TextInput
            inputMode="email"
            style={styles.textArea}
            placeholder={Strings.emailPlaceholder}
            defaultValue={email}
            onChangeText={email => setEmail(email)}
          />
          <Text style={styles.redText}>{error}</Text>
        </View>

        <TouchableOpacity style={globalStyles.btn} onPress={forgetPassword}>
          <Text style={globalStyles.btnText}>{Strings.passwordResetBtn}</Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ForgetPasswordScreen;
