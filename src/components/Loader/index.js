import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './styles.js';
import Colors from '../../utils/Colors.js';
import Strings from '../../translation/Strings.js';

const Loader = ({state}) => {
  if (!state) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <ActivityIndicator size="large" color={Colors.violet} />
        <Text style={styles.text}>{Strings.loading}</Text>
      </View>
    </View>
  );
};

export default Loader;
