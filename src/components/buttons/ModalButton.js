import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ModalButton = ({ primary, children, onPress, style }) => {
  return (
    <TouchableOpacity className={`p-2 rounded-xl ${primary ? "bg-brown-400" : "bg-white border border-gray"}`} style={style} onPress={onPress}>
      <Text className='font-primary text-lg text-center'>{children}</Text>
    </TouchableOpacity>
  )
}

export default ModalButton
