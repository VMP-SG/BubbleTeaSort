import { View, Text, Pressable, Image, TextInput, KeyboardAvoidingView, Modal } from 'react-native'
import React, { useState } from 'react'
import { XMarkIcon } from 'react-native-heroicons/outline'
import useProfilePicture from '../../hooks/useProfilePicture'
import { auth } from '../../utils/firebase'
import { ScrollView } from 'react-native-gesture-handler'
import ModalButton from '../../components/buttons/ModalButton'
import { updateProfile } from 'firebase/auth'

const EditUsernameModal = ({ navigation, visible, onClose }) => {
  const profilePictureUrl = useProfilePicture();
  const [username, setUsername] = useState(auth.currentUser.displayName);

  const changeUsernameHandler = async () => {
    await updateProfile(auth.currentUser, {
      displayName: username
    });
    navigation.navigate("Profile", {
      displayName: username
    });
    onClose();
  }

  return (
    <Modal visible={visible} animationType='fade' transparent={true}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className='flex-1 items-center justify-center px-8'>
        <Pressable 
          className='bg-[#FFFFFFC4] absolute top-0 bottom-0 left-0 right-0'
          onPress={onClose}
        />
        <View className='bg-white shadow-md p-4 w-full rounded-3xl'>
          <ScrollView scrollEnabled={false} keyboardShouldPersistTaps='handled'>
            <XMarkIcon style={{ position: 'absolute', right: 0, top: 0 }} size={28} color="#00000071" strokeWidth={2} onPress={() => navigation.goBack()} />
            <Text className='text-center font-primary-bold text-xl'>Edit Username</Text>
            <Image className='w-24 h-24 rounded-full border self-center mt-3' source={profilePictureUrl === null ? require("../../../assets/icons/DefaultProfilePicture.png") : { uri: profilePictureUrl }} />
            <Text className='font-primary-light text-base mt-3'>Username</Text>
            <TextInput editable className='p-2 border border-[#D9D9D9] rounded-md w-full mt-1 font-secondary-bold' value={username} onChangeText={text => setUsername(text)} />
            <View className='flex-row mt-3 justify-between'>
              <ModalButton onPress={onClose}>Cancel</ModalButton>
              <ModalButton primary={true} onPress={changeUsernameHandler}>Make Changes</ModalButton>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default EditUsernameModal;
