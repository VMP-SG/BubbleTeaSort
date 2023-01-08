import { useState } from "react";
import { Text, SafeAreaView } from "react-native";
import DiscoverFAB from "../../components/buttons/DiscoverFAB";
import DiscoverMap from "./DiscoverMap";
import DiscoverList from "./DiscoverList";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DiscoverScreen = ({ navigation }) => {
  const [isMap, setIsMap] = useState(true);
  const toggleMap = () => {
    setIsMap(!isMap);
  };
  return (
    <SafeAreaView>
      <DiscoverFAB onPress={toggleMap}>
        <MaterialCommunityIcons
          name={isMap ? "view-list" : "map-legend"}
          color={"black"}
          size={30}
        />
      </DiscoverFAB>
      {isMap ? <DiscoverMap /> : <DiscoverList />}
    </SafeAreaView>
  );
};

export default DiscoverScreen;
