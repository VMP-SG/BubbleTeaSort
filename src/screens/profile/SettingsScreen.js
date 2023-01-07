import { useState } from "react";
import { View, Text } from "react-native";
import EditUsernameModal from "./EditUsernameModal";
import LogoutModal from "./LogoutModal";
import * as ImagePicker from "expo-image-picker";
import { auth, storage } from "../../utils/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const SettingsScreen = ({ navigation }) => {
  const [showUsername, setShowUsername] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const imagePickerHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.canceled) {
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();

      const metadata = {
        contentType: "image/png"
      }

      const photoURL = "profile_pictures/" + new Date().getTime() + "-media.png"

      const storageRef = ref(storage, photoURL);
      await uploadBytes(storageRef, blob, metadata);
      await updateProfile(auth.currentUser, {
        photoURL
      });
      navigation.navigate("Profile", {
        photoURL
      });
    }
  }

  return (
    <View className='px-4 pt-6'>
      <EditUsernameModal visible={showUsername} onClose={() => setShowUsername(false)} navigation={navigation} />
      <LogoutModal visible={showLogout} onClose={() => setShowLogout(false)} navigation={navigation} />
      <Text className='mb-6 font-primary text-2xl' onPress={() => setShowUsername(true)}>Edit Username</Text>
      <Text className='mb-6 font-primary text-2xl' onPress={imagePickerHandler}>Select Profile Picture</Text>
      <Text className='mb-6 font-primary text-2xl' onPress={() => navigation.navigate("ChangePassword")}>Change Password</Text>
      <Text className='font-primary text-2xl' onPress={() => setShowLogout(true)}>Log Out</Text>
    </View>
  );
};

export default SettingsScreen;
