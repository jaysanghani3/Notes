import {View, Image, Text} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import globalStyles from '../../../utils/globalStyles';
import styles from './styles';
import Icons from '../../../assets';
import Strings from '../../../translation/Strings';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      const unsubscribe = auth().onAuthStateChanged(user => {
        if (user === null) {
          navigation.replace('LoginScreen');
          return;
        } else if (user.emailVerified) {
          navigation.replace('HomeScreen');
        }
      });
      return unsubscribe;
    }, 2000);
  }, [navigation]);

  return (
    <View style={globalStyles.flexCenter}>
      <Image source={Icons.Logo} />
      <Text style={styles.fundwave}>{Strings.fundwave}</Text>
    </View>
  );
};

export default SplashScreen;
