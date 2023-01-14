import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import Input from '../../components/inputs/Input'
import PrimaryButton from '../../components/buttons/PrimaryButton'
import { UserIcon } from 'react-native-heroicons/outline'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../utils/firebase'

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const forgetPasswordHandler = async () => {
    await sendPasswordResetEmail(auth, email);
    navigation.goBack();
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
            <PrimaryButton disabled={email === "" || password === "" || confirmPassword === "" || password !== confirmPassword} onPress={forgetPasswordHandler}>
              Send
            </PrimaryButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ResetPasswordScreen
