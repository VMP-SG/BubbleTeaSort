import React from "react";
import { View, TouchableOpacity } from "react-native";

export default function ({ onPress, children }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 48,
        right: 16,
      }}
      className="z-40"
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
          border: "solid 1px",
        }}
        className="bg-brown-500"
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}
