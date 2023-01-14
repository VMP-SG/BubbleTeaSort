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
import {
  PlusIcon as PlusIconOutline,
  ChevronDownIcon as ChevronDownIconOutline,
} from "react-native-heroicons/outline";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable } from "firebase/storage";
import Input from "../components/inputs/Input";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { db, auth, storage } from "../utils/firebase";

const NewPostScreen = ({ navigation }) => {
  const [store, setStore] = useState("");
  const [storeData, setStoreData] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [flavours, setFlavours] = useState([]);
  const [flavoursList, setFlavoursList] = useState([]);
  const [photoUri, setPhotoUri] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState("");
  const [comments, setComments] = useState("");

  const storeHandler = async (option) => {
    const selected = storeData[option.value];
    const data = selected.data.flavours;

    const list = [];
    for (let i = 0; i < data.length; i++) {
      list.push({
        label: data[i],
        value: i,
      });
    }
    setFlavoursList(list);
  };

  const imagePickerHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhotoUri(uri);
    }
  };

  const postHandler = async () => {
    // upload photo
    const photoUrl = "posts/" + new Date().getTime() + "-media.png";
    const response = await fetch(photoUri);
    const blob = await response.blob();
    const metadata = {
      contentType: "image/png",
    };
    const storageRef = ref(storage, photoUrl);
    await uploadBytesResumable(storageRef, blob, metadata);

    // upload post
    const selectedStore = storeData[store];
    const storeId = selectedStore.id;
    const selectedFlavours = flavours.map(
      (index) => selectedStore.data.flavours[index]
    );
    const postData = {
      author: auth.currentUser.uid,
      caption: comments,
      flavours: selectedFlavours,
      likes: [],
      photo: photoUrl,
      price,
      rating,
      store_id: storeId,
      timestamp: Timestamp.fromDate(new Date()),
      title,
    };

    try {
      const docRef = await addDoc(collection(db, "Post"), postData);
      clearData(); // reset to default, empty form

      // go to profile page
      navigation.navigate("ProfileNavigator");
    } catch (e) {
      alert("Server is busy. Try again in a few minutes.");
    }
  };

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
              <Dropdown
                value={store}
                data={storeList}
                labelField={"label"}
                valueField={"value"}
                placeholder={"Select"}
                autoScroll={false}
                maxHeight={276}
                search={true}
                searchPlaceholder="Search..."
                onChange={(item) => {
                  setStore(item.value);
                  storeHandler(item);
                }}
                style={{
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: "#00000071",
                }}
                containerStyle={{
                  backgroundColor: "#EADAC1",
                }}
                itemContainerStyle={{
                  backgroundColor: "#EADAC1",
                  borderTopWidth: 1,
                  borderColor: "#CEB195",
                }}
                itemTextStyle={{
                  fontFamily: "Raleway_400Regular",
                  fontSize: "16px",
                  color: "#1D1D26",
                }}
                activeColor={"#CEB195"}
                placeholderStyle={{
                  fontFamily: "Raleway_400Regular",
                  fontSize: "16px",
                  color: "#00000071",
                }}
                selectedTextStyle={{
                  fontFamily: "Raleway_400Regular",
                  fontSize: "16px",
                  color: "#000000",
                }}
                inputSearchStyle={{
                  backgroundColor: "#EADAC1",
                  fontFamily: "Raleway_400Regular",
                  fontSize: "16px",
                  color: "#00000071",
                  padding: 3,
                }}
                renderRightIcon={() => {
                  return <ChevronDownIconOutline color="#00000071" />;
                }}
              />
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
              <MultiSelect
                value={flavours}
                data={flavoursList}
                labelField={"label"}
                valueField={"value"}
                placeholder={""}
                autoScroll={false}
                inside={true}
                maxHeight={276}
                search={true}
                searchPlaceholder="Search..."
                onChange={(item) => {
                  setFlavours(item);
                }}
                renderSelectedItem={(item) => {
                  return (
                    <View className="flex-row mr-2 my-1 px-4 py-2 rounded-[20px] bg-[#EADAC1] border-0 h-[35]">
                      <Text className="font-secondary">{item.label}</Text>
                    </View>
                  );
                }}
                style={{
                  marginBottom: 4,
                  minHeight: 43,
                }}
                containerStyle={{
                  backgroundColor: "#EADAC1",
                }}
                itemContainerStyle={{
                  backgroundColor: "#EADAC1",
                  borderTopWidth: 1,
                  borderColor: "#CEB195",
                }}
                itemTextStyle={{
                  fontFamily: "Raleway_400Regular",
                  fontSize: "16px",
                  color: "#1D1D26",
                }}
                activeColor={"#CEB195"}
                placeholderStyle={{
                  height: 35,
                }}
                inputSearchStyle={{
                  backgroundColor: "#EADAC1",
                  fontFamily: "Raleway_400Regular",
                  fontSize: "16px",
                  color: "#00000071",
                  padding: 3,
                }}
                renderLeftIcon={() => {
                  return (
                    <View
                      style={{
                        marginRight: 8,
                        backgroundColor: "#EADAC1",
                        borderRadius: 20,
                        width: 35,
                        height: 35,
                        flex: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <PlusIconOutline color="#00000071" />
                    </View>
                  );
                }}
                renderRightIcon={() => {}}
              />
            </View>
            <View className="mb-10">
              <Text className="font-primary-bold text-xl">Comments</Text>
              <Input
                onChangeText={(text) => setComments(text)}
                placeholder="A wonderful taste"
                value={comments}
              ></Input>
            </View>
            <PrimaryButton
              disabled={
                photoUri === "" ||
                title === "" ||
                rating === 0 ||
                store === "" ||
                price === "" ||
                flavours.length === 0 ||
                comments === ""
              }
              onPress={postHandler}
            >
              Post
            </PrimaryButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewPostScreen;
