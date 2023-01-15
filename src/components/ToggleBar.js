import { View, Text, Pressable } from 'react-native'
import React from 'react'

// showLeft: true -> selects left toggle (should be a state element)
// setShowLeft: function to toggle left
// style: for tailwind
// leftText: text to show on the left
// rightText: text to show on the right

const ToggleBar = ({ showLeft, setShowLeft, style, leftText, rightText }) => {
  return (
    <View className='flex-row' style={style}>
    <Pressable className={`${showLeft ? "border-b-2" : ""} py-3 flex-1`} onPress={() => setShowLeft(true)}>
      <Text className={`${showLeft ? "font-primary-bold" : "font-primary"} text-xl text-center`}>{leftText}</Text>
    </Pressable>
    <Pressable className={`${showLeft ? "" : "border-b-2"} py-3 flex-1`} onPress={() => setShowLeft(false)}>
      <Text className={`${showLeft ? "font-primary" : "font-primary-bold"} text-xl text-center`}>{rightText}</Text>
    </Pressable>
  </View>
  )
}

export default ToggleBar
