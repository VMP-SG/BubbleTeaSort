import { Text, SafeAreaView, View, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { UserIcon } from "react-native-heroicons/outline";
import Input from "../../components/inputs/Input";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import PasswordInput from "../../components/inputs/PasswordInput";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const loginHandler = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    navigation.replace("Profile");
  };

  return (
    <SafeAreaView>
      <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
        <View className="px-4 items-center justify-center">
          <Image source={require("../../../assets/icons/Avatar.png")} />
          <Text className="mt-2 font-primary-bold text-xl">Login</Text>
          <View className="px-4 w-full mt-8">
            <Input
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              value={email}
              className="mb-12"
              keyboardType={"email-address"}
            >
              <UserIcon size={24} color="#00000071" />
            </Input>
            <PasswordInput
              className="mb-12"
              placeholder="Password"
              password={password}
              hidePassword={hidePassword}
              setPassword={setPassword}
              setHidePassword={setHidePassword}
            />
            <PrimaryButton
              disabled={email === "" || password === ""}
              onPress={loginHandler}
            >
              Login
            </PrimaryButton>
          </View>
          <Text
            onPress={() => navigation.navigate("Register")}
            className="mt-6 font-secondary text-base"
          >
            Register new account
          </Text>
          <Text
            onPress={() => navigation.navigate("ResetPassword")}
            className="mt-2 font-secondary text-base"
          >
            Forget Password
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
