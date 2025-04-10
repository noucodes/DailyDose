import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { useCart } from "../../context/cartcontext";

export default function MenuPage() {
  const { addToCart, menuItems } = useCart();

  return (
    <View style={styles.container}>
      {menuItems.map((item) => (
        <View style={styles.card} key={item.id}>
          {/* Image on the left */}
          <Image source={{ uri: item.image }} style={styles.image} />

          {/* Description on the right */}
          <View style={styles.description}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
            <Text style={styles.itemStock}>Stock: {item.stock}</Text>

            <Button
              color="#FF6347"
              title={item.stock === 0 ? "Out of Stock" : "Add to Cart"}
              onPress={() => addToCart(item)}
              disabled={item.stock === 0}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 15,
    borderRadius: 10,
  },
  description: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    color: "#555",
    marginVertical: 5,
  },
  itemStock: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
});
