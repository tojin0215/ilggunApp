import DropDownPicker from "react-native-dropdown-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DDP_YEAR_ITEMS = [
  { label: "2020년", value: "2020년" },
  { label: "2021년", value: "2021년" },
  { label: "2022년", value: "2022년" },
  { label: "2023년", value: "2023년" },
  { label: "2024년", value: "2024년" },
  { label: "2025년", value: "2025년" },
];

const DDP_YEAR = ({
  default_year_data,
  is_visible,
  opOpen,
  opClose,
  onChangeItem,
}) => (
  <DropDownPicker
    items={DDP_YEAR_ITEMS}
    defaultValue={default_year_data}
    containerStyle={{
      height: hp("6%"),
      width: wp("30%"),
      marginLeft: wp("3%"),
    }}
    dropDownStyle={{
      backgroundColor: "white",
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
    }}
    itemStyle={{ justifyContent: "center" }}
    labelStyle={{
      height: hp("3%"),
      textAlign: "center",
      color: "#040525",
      fontFamily: "NanumSquare",
      fontSize: wp("4%"),
      marginTop: hp("1%"),
    }}
    isVisible={is_visible}
    onOpen={opOpen}
    onClose={opClose}
    onChangeItem={onChangeItem}
  />
);

export default DDP_YEAR;