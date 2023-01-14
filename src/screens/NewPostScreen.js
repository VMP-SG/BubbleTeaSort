import {
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  Pressable,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import Input from "../components/inputs/Input";

const NewPostScreen = ({ navigation }) => {
  const [store, setStore] = useState("");
  const [flavours, setFlavours] = useState([]);
  const [photoUri, setPhotoUri] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState("");
  const [comments, setComments] = useState("");

  const imagePickerHandler = async () => {};

  const getStars = (rating) => {};

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
            <View
              className="mb-6 w-full border-2 rounded-xl border-dashed border-black "
              style={{
                shadowColor: "black",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
              }}
            >
              {photoUri === "" ? (
                <Pressable
                  className="flex-col pt-[63px] bg-brown-400 items-center"
                  onPress={imagePickerHandler}
                >
                  <Image
                    source={require("../../assets/icons/Avatar.png")}
                    className="mb-5"
                  />
                  <Text className="font-primary-bold text-xl mb-[87px]">
                    Add a photo
                  </Text>
                </Pressable>
              ) : (
                <Pressable onPress={imagePickerHandler}>
                  <Image
                    source={{ uri: photoUri }}
                    className="w-full h-[293px] rounded-xl"
                  />
                </Pressable>
              )}
            </View>
            <View className="mb-6">
              <Text className="font-primary-bold text-xl">Title</Text>
              <Input
                onChangeText={(text) => setTitle(text)}
                placeholder="A wonderful drink"
                value={title}
              ></Input>
            </View>
            <View className="mb-6 flex-row w-full justify-between">
              <Text className="font-primary-bold text-xl">Rating</Text>
              {getStars(rating)}
            </View>
            <View className="mb-6 w-full">
              <Text className="font-primary-bold text-xl">Store</Text>
            </View>
            <View className="mb-6">
              <Text className="font-primary-bold text-xl">Price</Text>
              <Text
                className="absolute top-7 font-secondary text-base z-0"
                style={{
                  color: price === "" ? "#00000071" : "#000000",
                }}
              >
                $
              </Text>
              <Input
                onChangeText={(text) => setPrice(text)}
                value={price}
                style={{ paddingLeft: 18 }}
                keyboardType="numeric"
              ></Input>
            </View>
            <View className="w-full mb-6">
              <Text className="mb-1 font-primary-bold text-xl">Flavour(s)</Text>
            </View>
            <View className="mb-10">
              <Text className="font-primary-bold text-xl">Comments</Text>
              <Input
                onChangeText={(text) => setComments(text)}
                placeholder="A wonderful taste"
                value={comments}
              ></Input>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewPostScreen;
