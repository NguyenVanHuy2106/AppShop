import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  Picker,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
//import signInScreen from "./signInScreen";

import API from "../../services/api";
import ComboBox from "react-native-combobox";

export default function SVUpdateProduct({ navigation, route }) {
  const { userData, product, productId } = route.params;
  //console.log(product);

  const [infoPrduct, setInfoProduct] = React.useState({
    proName: product.proName,
    quantityValue: product.quantityValue.toString(),
    price: product.price.toString(),
    brand: product.brand,
    origin: product.origin,
    manual: product.manual,
    proDescription: product.proDescription,
    preserve: product.preserve,
    productImage: "",
  });

  const handleProName = (val) => {
    setInfoProduct({
      ...infoPrduct,
      proName: val,
    });
  };
  const handleQuantity = (val) => {
    setInfoProduct({
      ...infoPrduct,
      quantityValue: val,
    });
  };
  const handlePrice = (val) => {
    setInfoProduct({
      ...infoPrduct,
      price: val,
    });
  };
  const handlePre = (val) => {
    setInfoProduct({
      ...infoPrduct,
      preserve: val,
    });
  };
  const handleDes = (val) => {
    setInfoProduct({
      ...infoPrduct,
      proDescription: val,
    });
  };
  const handleBrand = (val) => {
    setInfoProduct({
      ...infoPrduct,
      brand: val,
    });
  };
  const handleManual = (val) => {
    setInfoProduct({
      ...infoPrduct,
      manual: val,
    });
  };
  const handleOrigin = (val) => {
    setInfoProduct({
      ...infoPrduct,
      origin: val,
    });
  };

  const submitUpdateProduct = () => {
    API.post(
      `merchant/products/update/${productId}`,
      {
        proName: infoPrduct.proName,
        proDescription: infoPrduct.proDescription,
        quantity: infoPrduct.quantity,
        price: infoPrduct.price,
        brand: infoPrduct.brand,
        origin: infoPrduct.origin,
        manual: infoPrduct.manual,
        preserve: infoPrduct.preserve,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": userData.accessToken,
        },
      }
    )
      .then((res) => {
        if (res.status === 201);
        {
          alert("C???p nh???t th??nh c??ng");
        }
      })
      .catch((error) => {
        alert("Error", error.res);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.return}>
        <View style={styles.returnIcon}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FontAwesome name="arrow-left" color="#ffffff" size={20} />
          </TouchableOpacity>
        </View>
        <Text style={styles.returnText}>Ch???nh s???a</Text>
      </View>

      <ScrollView style={styles.footer}>
        <View style={styles.action}>
          <Text style={styles.title}>T??n s???n ph???m</Text>
          <TextInput
            placeholder="T??n s???n ph???m"
            style={styles.textInput}
            autoCapitalize="none"
            defaultValue={infoPrduct.proName}
            onChangeText={(val) => handleProName(val)}
          />
        </View>

        <View style={styles.action}>
          <Text style={styles.title}>S??? l?????ng</Text>
          <TextInput
            placeholder="S??? l?????ng"
            style={styles.textInput}
            autoCapitalize="none"
            defaultValue={infoPrduct.quantityValue}
            onChangeText={(val) => handleQuantity(val)}
          />
        </View>

        <View style={styles.action}>
          <Text style={styles.title}>Gi??</Text>
          <TextInput
            placeholder="Gi??"
            style={styles.textInput}
            autoCapitalize="none"
            defaultValue={infoPrduct.price}
            onChangeText={(val) => handlePrice(val)}
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.title}>Th????ng hi???u</Text>
          <TextInput
            placeholder="Th????ng hi???u"
            style={styles.textInput}
            autoCapitalize="none"
            //keyboardType= "number-pad"
            defaultValue={infoPrduct.brand}
            onChangeText={(val) => handleBrand(val)}
          />
        </View>

        <View style={styles.action}>
          <Text style={styles.title}>Xu???t x???</Text>
          <TextInput
            placeholder="Xu???t x???"
            style={styles.textInput}
            autoCapitalize="none"
            defaultValue={infoPrduct.origin}
            onChangeText={(val) => handleOrigin(val)}
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.title}>H?????ng d???n s??? d???ng</Text>
          <TextInput
            placeholder="H?????ng d???n s??? d???ng"
            style={styles.textInput}
            autoCapitalize="none"
            defaultValue={infoPrduct.manual}
            onChangeText={(val) => handleManual(val)}
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.title}>M?? t???</Text>
          <TextInput
            placeholder="M?? t???"
            multiline={true}
            style={styles.textInputDes}
            autoCapitalize="none"
            defaultValue={infoPrduct.proDescription}
            onChangeText={(val) => handleDes(val)}
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.title}>C??ch b???o qu???n</Text>
          <TextInput
            placeholder="B???o qu???n"
            style={styles.textInputPre}
            autoCapitalize="none"
            multiline={true}
            defaultValue={infoPrduct.preserve}
            onChangeText={(val) => handlePre(val)}
          />
        </View>
      </ScrollView>
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        <TouchableOpacity onPress={submitUpdateProduct}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              backgroundColor: "#FF0000",
              paddingHorizontal: 40,
              paddingVertical: 10,
              color: "#ffffff",
            }}
          >
            C???p nh???t
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.button}>
        <TouchableOpacity
          onPress={submitUpdateProduct}
          style={[
            styles.signIn,
            {
              borderColor: "#ff4700",
              borderWidth: 1,
              margin: 10,
            },
          ]}
        >
          <Text
            style={[
              styles.textSign,
              {
                color: "#ffffff",
                fontSize: 25,
              },
            ]}
          >
            C???p nh???t
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#FF4B3A',
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  textheader: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  textfooter: {
    color: "#05735a",
    fontSize: 18,
  },
  title: {
    fontSize: 15,
    paddingBottom: 10,
  },
  action: {
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#000000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },
  textInputDes: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
    justifyContent: "flex-start",
  },
  textInputPre: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FF4B3A",
    marginBottom: 10,
  },
  signIn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textSignIn: {
    fontSize: 15,
    marginTop: 15,
  },
  gender: {
    flexDirection: "row",
    alignItems: "center",
  },
  genderImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  return: {
    height: 80,
    backgroundColor: "#FF4B3A",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 10,
  },
  returnIcon: {
    flex: 0.7,
    marginLeft: 15,
    //borderWidth: 1,
  },
  returnText: {
    flex: 2.5,
    //borderWidth: 1,
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
    marginRight: 75,
  },
});
