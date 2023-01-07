import { View, Text, Pressable, KeyboardAvoidingView, Modal } from 'react-native'
import React from 'react'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { auth } from '../../utils/firebase'
import { signOut } from 'firebase/auth'
import { ScrollView } from 'react-native-gesture-handler'
import ModalButton from '../../components/buttons/ModalButton'

const LogoutModal = ({ navigation, visible, onClose }) => {

  const logoutHandler = async () => {
    await signOut(auth);
    navigation.navigate("Login");
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
            <Text className='text-center font-primary-bold text-xl mt-16'>Do you want to log out?</Text>
            <View className='flex-row mt-12 justify-between'>
              <ModalButton onPress={onClose} className='w-[47%]'>No</ModalButton>
              <ModalButton primary={true} onPress={logoutHandler} className='w-[47%]'>Yes</ModalButton>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default LogoutModal;
