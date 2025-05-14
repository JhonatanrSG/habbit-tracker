import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { auth } from "../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import RSSParser from 'react-native-rss-parser';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://newsnetwork.mayoclinic.org/feed/')
      .then((response) => response.text())
      .then((responseData) => RSSParser.parse(responseData))
      .then((rss) => {
        setArticles(rss.items);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            auth.signOut();
            navigation.navigate("Login");
          }}
          title="Cerrar sesión"
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Habit Tracker</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.article}>
              <Text style={styles.articleTitle}>{item.title}</Text>
              <Text>{item.published}</Text>
            </View>
          )}
        />
      )}
      <Button
        title="Nuevo Hábito"
        onPress={() => navigation.navigate("CreateHabit")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  article: { marginBottom: 10 },
  articleTitle: { fontSize: 18, fontWeight: "bold" },
});

