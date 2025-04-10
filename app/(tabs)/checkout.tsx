import { View, Text, Button, FlatList, StyleSheet, Image } from "react-native";
import { useCart } from "../../context/cartcontext";

export default function CheckoutPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
              <Text style={styles.itemPrice}>
                ${item.price * item.quantity}
              </Text>
              <Button
                title="Remove"
                onPress={() => removeFromCart(item.id)}
                color="#FF6347"
              />
            </View>
          </View>
        )}
      />

      <Text style={styles.total}>Total: ${total}</Text>
      <Button title="Clear Cart" onPress={clearCart} color="#FF6347" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  item: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 16 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: "600" },
  itemQuantity: { fontSize: 14, color: "#555" },
  itemPrice: { fontSize: 16, fontWeight: "600", color: "#FF6347" },
  total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
