import { View, Text } from "react-native";
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
    <View>
      <Text>This is the New Post Screen</Text>
    </View>
  );
};

export default NewPostScreen;
