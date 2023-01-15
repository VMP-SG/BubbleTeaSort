import { Pressable, TextInput, View } from "react-native";
import React from "react";

// placeholder: placeholder text
// value: value state prop
// onChangeText: onChangeText function
// children: Icon JSX Element

const Input = ({
  placeholder,
  value,
  onChangeText,
  children,
  style,
  secureTextEntry,
  onPressIcon,
  keyboardType,
}) => {
  return (
    <View
      keyboardShouldPersistTaps="handled"
      className="w-full border-[#00000071] pb-1 border-b flex-row justify-between"
      style={style}
    >
      <TextInput
        className="text-lg font-secondary flex-1 leading-5"
        placeholder={placeholder}
        placeholderTextColor={value === "" ? "#00000071" : "#000000"}
        editable
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType ?? "default"}
      />
      <Pressable hitSlop={10} onPress={onPressIcon}>
        {children}
      </Pressable>
    </View>
  );
};

export default Input;
