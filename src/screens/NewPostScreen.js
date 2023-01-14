import {
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import { useEffect, useState } from "react";

const NewPostScreen = ({ navigation }) => {
  const [store, setStore] = useState("");
  const [flavours, setFlavours] = useState([]);
  const [photoUri, setPhotoUri] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState("");
  const [comments, setComments] = useState("");

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        className="mb-10"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: 72,
          }}
        >
          <View className="px-4 py-6 items-center justify-center">
            <Text>This is the New Post Screen</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewPostScreen;
