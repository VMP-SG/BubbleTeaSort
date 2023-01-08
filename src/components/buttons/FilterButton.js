import React from "react";
import { View, TouchableOpacity } from "react-native";

export default function ({ onPress, children }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 140,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 48,
        left: 16,
      }}
      className="z-40"
    >
      <View
        style={{
          width: 140,
          height: 50,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          border: "solid 1px",
        }}
        className="flex flex-row bg-brown-500"
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}
