import { StyleSheet, Platform, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

// SafeArea that works for Android as well

const SafeArea = ({ children, style }) => {
  const styleObj = style === undefined ? {} : style.reduce(((r, c) => Object.assign(r, c)), {});
  return (
    <SafeAreaView style={{...safeAreaAndroid.AndroidSafeArea, ...styleObj}}>
      {children}
    </SafeAreaView>
  )
}

const safeAreaAndroid = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})

export default SafeArea
