import { View, Text, Button, FlatList, StyleSheet } from "react-native";
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
            <Text>
              {item.name} × {item.quantity}
            </Text>
            <Text>${item.price * item.quantity}</Text>
            <Button title="Remove" onPress={() => removeFromCart(item.id)} />
          </View>
        )}
      />

      <Text style={styles.total}>Total: ${total}</Text>
      <Button title="Clear Cart" onPress={clearCart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  item: { marginBottom: 12 },
  total: { marginTop: 20, fontSize: 18, fontWeight: "600" },
});
