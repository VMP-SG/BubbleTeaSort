import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import Input from '../../components/inputs/Input'
import PrimaryButton from '../../components/buttons/PrimaryButton'
import { UserIcon } from 'react-native-heroicons/outline'
import { auth, db } from '../../utils/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { generateRandomUsername } from '../../utils/strings'
import PasswordInput from '../../components/inputs/PasswordInput'

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const registerHandler = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const displayName = generateRandomUsername();
      await updateProfile(userCredential.user, {
        displayName,
        photoURL: "profile_pictures/DefaultProfilePicture.png"
      });
      await setDoc(doc(db, "User", userCredential.user.uid), {
        display_name: displayName
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <SafeAreaView>
      <ScrollView scrollEnabled={false} keyboardShouldPersistTaps='handled'>
        <View className='px-4 items-center justify-center'>
          <Image source={require('../../../assets/icons/Avatar.png')}/>
          <Text className='mt-2 font-primary-bold text-xl'>Sign up for a new account</Text>
          <View className='px-4 w-full mt-8'>
            <Input onChangeText={text => setEmail(text)} placeholder="Email" value={email} className='mb-12'>
              <UserIcon size={24} color='#00000071' />          
            </Input>
            <PasswordInput className='mb-12' placeholder="Password" password={password} setPassword={setPassword} hidePassword={hidePassword} setHidePassword={setHidePassword} />
            <PasswordInput className='mb-12' placeholder="Confirm Password" password={confirmPassword} setPassword={setConfirmPassword} hidePassword={hideConfirmPassword} setHidePassword={setHideConfirmPassword} />
            <PrimaryButton disabled={email === "" || password === "" || confirmPassword === "" || password !== confirmPassword} onPress={registerHandler}>
              Register
            </PrimaryButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegisterScreen
