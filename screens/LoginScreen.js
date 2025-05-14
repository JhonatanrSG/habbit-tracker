import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Toast from 'react-native-toast-message';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Campos obligatorios',
        text2: 'Por favor completa todos los campos.',
      });
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error.code);
  
      switch (error.code) {
        case "auth/user-not-found":
          Toast.show({
            type: 'error',
            text1: 'Usuario no encontrado',
            text2: 'El correo no está registrado.',
          });
          break;
        case "auth/wrong-password":
          Toast.show({
            type: 'error',
            text1: 'Contraseña incorrecta',
            text2: 'Verifica tu contraseña.',
          });
          break;
        case "auth/invalid-email":
          Toast.show({
            type: 'error',
            text1: 'Correo inválido',
            text2: 'Ingresa un correo válido.',
          });
          break;
        default:
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Hubo un problema, intenta de nuevo.',
          });
          break;
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      
      <Button
  title="¿No tienes cuenta? Regístrate"
  onPress={() => navigation.navigate("SignUp")}
    />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }
});
