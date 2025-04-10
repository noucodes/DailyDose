import { View, Text, Button, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function LandingPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.gif")} // Ensure the path is correct
        style={styles.logo}
        resizeMode="contain" // Ensures the logo is resized properly
      />
      <Text style={styles.title}>Welcome to DailyDose</Text>
      <Button title="Order Now" onPress={() => router.push("./menu")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: {
    width: 200, // Adjust the size of your GIF
    height: 200, // Adjust the size of your GIF
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
