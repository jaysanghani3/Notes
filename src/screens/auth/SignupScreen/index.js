import React, {useState} from 'react';
import {Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import globalStyles from '../../../utils/globalStyles';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/Loader';
import Icons from '../../../assets';
import Strings from '../../../translation/Strings';
import {
  isEmailValid,
  isNameValid,
  isMobileNumberValid,
  isConfirmPasswordValid,
  isPasswordStrong,
  isPasswordMatched,
  isNameContainsNumber,
} from '../../../utils/validations';

const SignupScreen = ({navigation}) => {
  const fields = [
    {
      title: 'fullName',
      value: 'Full Name',
      type: 'text',
      errorMsg: 'Please enter your Name',
    },
    {
      title: 'mobileNumber',
      value: 'Mobile Number',
      type: 'tel',
      errorMsg: 'Please enter Mobile Number',
    },
    {
      title: 'email',
      value: 'Email',
      type: 'email',
      errorMsg: 'Please enter Email',
    },

    {
      title: 'password',
      value: 'Password',
      type: 'text',
      errorMsg: 'Please Fill Password',
    },
    {
      title: 'confirmPassword',
      value: 'Confirm Password',
      type: 'text',
      errorMsg: 'Please fill Password or Password not matched ',
    },
  ];

  const [userDetails, setUserDetails] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handlePress = async () => {
    try {
      if (!userDetails.fullName) {
        setError({fullName: Strings.required});
        return;
      }
      if (isNameContainsNumber(userDetails.fullName)) {
        setError({fullName: Strings.charName});
        return;
      }
      if (!isNameValid(userDetails.fullName)) {
        setError({fullName: Strings.invalidName});
        return;
      }

      if (!userDetails.mobileNumber) {
        setError({mobileNumber: Strings.required});
        return;
      }
      if (!isMobileNumberValid(userDetails.mobileNumber)) {
        setError({mobileNumber: Strings.invalidPhone});
        return;
      }

      if (!userDetails.email) {
        setError({email: Strings.required});
        return;
      }
      if (!isEmailValid(userDetails.email)) {
        setError({email: Strings.invalidEmail});
        return;
      }
      if (!userDetails.password) {
        setError({password: Strings.required});
        return;
      }

      if (!userDetails.confirmPassword) {
        setError({confirmPassword: Strings.required});
        return;
      }
      if (
        !isPasswordMatched(userDetails.password, userDetails.confirmPassword)
      ) {
        setError({confirmPassword: Strings.invalidPasswordConfirmation});
        return;
      }
      if (!isPasswordStrong(userDetails.password)) {
        setError({password: Strings.invalidPassword});
        return;
      }
      if (
        !isConfirmPasswordValid(
          userDetails.password,
          userDetails.confirmPassword,
        )
      ) {
        setError({confirmPassword: Strings.invalidPasswordConfirmation});
        return;
      }
      setError({});

      setIsLoading(true);
      const user = await auth().createUserWithEmailAndPassword(
        userDetails.email,
        userDetails.password,
      );
      await user.user.sendEmailVerification();
      await firestore().collection('users').doc(user.user.uid).set({
        fullName: userDetails.fullName,
        mobileNumber: userDetails.mobileNumber,
        email: userDetails.email,
      });
      setIsLoading(false);
      Toast.show(Strings.linkSend);
      navigation.navigate('LoginScreen');
    } catch (e) {
      const err = e.code.split('/')[1].split('-').join(' ');
      Toast.show(err);
      setIsLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Loader state={isLoading} />

      <View>
        <Text style={styles.welcomeHeader}>{Strings.createAccount}</Text>
        <Text>{Strings.signupToGetStarted}</Text>
      </View>

      <View style={styles.formBox}>
        {fields.map((field, index) => (
          <View key={index} style={styles.fieldArea}>
            <View style={styles.textArea}>
              <TextInput
                inputMode={field.type}
                key={index}
                defaultValue={userDetails[field.title]}
                onChangeText={newValue => {
                  setUserDetails({...userDetails, [field.title]: newValue});
                }}
                style={globalStyles.flex1}
                placeholder={field.value}
                secureTextEntry={
                  field.title === 'password'
                    ? !isPasswordVisible
                    : field.title === 'confirmPassword' &&
                      !isConfirmPasswordVisible
                }
              />
              {field.title === 'password' && (
                <TouchableOpacity
                  style={styles.eyeContainer}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Image
                    source={!isPasswordVisible ? Icons.Show : Icons.Hide}
                    style={styles.eye}
                  />
                </TouchableOpacity>
              )}
              {field.title === 'confirmPassword' && (
                <TouchableOpacity
                  style={styles.eyeContainer}
                  onPress={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }>
                  <Image
                    source={!isConfirmPasswordVisible ? Icons.Show : Icons.Hide}
                    style={styles.eye}
                  />
                </TouchableOpacity>
              )}
            </View>
            {error[field.title] !== '' && (
              <Text style={globalStyles.error}>{error[field.title]}</Text>
            )}
          </View>
        ))}
      </View>

      <View>
        <TouchableOpacity onPress={handlePress} style={globalStyles.btn}>
          <Text style={globalStyles.btnText}>{Strings.signupBtn}</Text>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.topBorder}>
        <Text
          style={globalStyles.textCenter}
          onPress={() => navigation.navigate('LoginScreen')}>
          {Strings.alreadyHaveAccount}
          <Text style={globalStyles.violetText}> {Strings.loginBtn}</Text>
        </Text>
      </View>
    </View>
  );
};

export default SignupScreen;
