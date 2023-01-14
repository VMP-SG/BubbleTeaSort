import React from 'react'
import { EyeSlashIcon, EyeIcon } from 'react-native-heroicons/outline'
import Input from './Input'

const PasswordInput = ({password, hidePassword, setHidePassword, setPassword, placeholder, style}) => {
  return (
    <Input onChangeText={text => setPassword(text)} placeholder={placeholder} value={password} style={style} secureTextEntry={hidePassword} onPressIcon={() => setHidePassword(!hidePassword)}>
      {hidePassword ? 
        <EyeSlashIcon size={24} color='#00000071' /> :
        <EyeIcon size={24} color='#00000071' />
      }          
    </Input>
  )
}

export default PasswordInput
