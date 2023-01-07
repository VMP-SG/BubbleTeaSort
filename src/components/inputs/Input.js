import { Pressable, TextInput, View } from 'react-native'
import React from 'react'

// placeholder: placeholder text
// value: value state prop
// onChangeText: onChangeText function
// children: Icon JSX Element

const Input = ({ placeholder, value, onChangeText, children, style, secureTextEntry, onPressIcon }) => {
  return (
    <View keyboardShouldPersistTaps='handled' className='w-full border-[#00000071] pb-1 border-b flex-row justify-between' style={style}>
      <TextInput className='text-lg placeholder-[#00000071] font-secondary flex-1' placeholder={placeholder} editable value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry}/>
      <Pressable hitSlop={10} onPress={onPressIcon}>
        {children}
      </Pressable>
    </View>
  )
}

export default Input
