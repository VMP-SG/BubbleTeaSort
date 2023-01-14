import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

// children: text on the button
// onPress: what happens when button is pressed
// disabled: boolean on whether the button is disabled

const PrimaryButton = ({ onPress, children, disabled }) => {
  return (
    <TouchableOpacity className={`w-full py-2 ${disabled ? "bg-[#3E3E3E71]" : "bg-[#3E3E3E]"} rounded-full`} onPress={onPress} disabled={disabled}>
      <Text className='font-secondary text-xl text-center text-white'>{children.toUpperCase()}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton
