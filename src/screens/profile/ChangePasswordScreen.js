import { View, Text } from 'react-native'
import React, { useState } from 'react'
import PasswordInput from '../../components/inputs/PasswordInput';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { updatePassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';

const ChangePasswordScreen = ({ navigation }) => {
  const [hideOldPassword, setHideOldPassword] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [newPassword, setNewPassword] = useState("")
  
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("")

  const changePasswordHandler = async () => {
    await updatePassword(auth.currentUser, newPassword);
    navigation.goBack();
  }

  return (
    <View className='justify-center items-center px-8 flex-1'>
      <Text className='font-primary-bold text-2xl mb-16'>Change Password</Text>
      <PasswordInput className='mb-12' placeholder="Enter Old Password" password={oldPassword} setPassword={setOldPassword} hidePassword={hideOldPassword} setHidePassword={setHideOldPassword} />
      <PasswordInput className='mb-12' placeholder="Enter New Password" password={newPassword} setPassword={setNewPassword} hidePassword={hideNewPassword} setHidePassword={setHideNewPassword} />
      <PasswordInput className='mb-12' placeholder="Re-enter New Password" password={confirmPassword} setPassword={setConfirmPassword} hidePassword={hideConfirmPassword} setHidePassword={setHideConfirmPassword} />
      <PrimaryButton disabled={oldPassword === "" || newPassword === "" || confirmPassword === "" || newPassword !== confirmPassword} onPress={changePasswordHandler}>Change Password</PrimaryButton>
    </View>
  )
}

export default ChangePasswordScreen
