import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  Form,
  Alert,
  ScrollView,
} from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import API from "../../services/api";
import NumericInput from "react-native-numeric-input";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";
export default function SVDetailProduct({ route, navigation }) {
  const { productId, userData } = route.params;
  //console.log(productId);
  const [productDetail, setProductDetail] = useState([]);
  const [quantityValue, setQuantityValue] = useState([]);
  const isFocused = useIsFocused();

  const fetchdata = async () => {
    const result = await API.get(`products/detail/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
      },
    });
    //console.log(result);
    setProductDetail(result.data.product);
    //console.log(result.data.product);
  };

  useEffect(() => {
    fetchdata();
  }, [setProductDetail, isFocused]);

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
        <Text style={styles.returnText}>Chi tiết</Text>
      </View>
      <ScrollView>
        <Card>
          <Card.Title>{productDetail.proName}</Card.Title>
          <Card.Divider />
          <Card.Image source={{ uri: productDetail.productImage }} />

          <View style={styles.price}>
            <Text style={{ flex: 1 }}>Giá:</Text>
            <Text style={{ flex: 1 }}>{productDetail.price}đ/kg</Text>
          </View>
          <View style={styles.price}>
            <Text style={{ flex: 1 }}>Còn lại:</Text>
            <Text style={{ flex: 1 }}>{productDetail.quantityValue}</Text>
          </View>
          <View style={styles.price}>
            <Text style={{ flex: 1 }}>Thương hiệu:</Text>
            <Text style={{ flex: 1 }}>{productDetail.brand}</Text>
          </View>
          <View style={styles.price}>
            <Text style={{ flex: 1 }}>Xuất xứ:</Text>
            <Text style={{ flex: 1 }}>{productDetail.origin}</Text>
          </View>
          <View style={styles.price}>
            <Text style={{ flex: 1 }}>Cách dùng:</Text>
            <Text style={{ flex: 1 }}>{productDetail.manual}</Text>
          </View>
          <View style={styles.price}>
            <Text style={{ flex: 1 }}>Hạn sử dụng:</Text>
            <Text style={{ flex: 1 }}>{productDetail.preserve}</Text>
          </View>
          <View style={styles.price}>
            <Text style={{ flex: 1 }}>chi tiết:</Text>
            <Text style={{ flex: 1 }}>{productDetail.proDescription}</Text>
          </View>

          <Card.Divider />
          <View style={styles.addQuantityToCart}>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SVUpdateProduct", {
                    product: productDetail,
                    userData: userData,
                    productId: productId,
                  });
                }}
              >
                <LinearGradient
                  colors={["#FF4B3A", "#FF4B3A"]}
                  style={styles.signIn}
                >
                  <Text style={styles.textSign}>Chỉnh sửa</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: "flex-end",
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
  price: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 5,
  },
  addQuantityToCart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
