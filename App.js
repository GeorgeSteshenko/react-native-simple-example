import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { v4 as uuid } from "uuid";
import Header from "./components/Header";
import ListItem from "./components/ListItem";
import AddItem from "./components/AddItem";

const App = () => {
  const [items, setItems] = useState([
    { id: uuid(), text: "Milk" },
    { id: uuid(), text: "Eggs" },
    { id: uuid(), text: "Bread" },
    { id: uuid(), text: "Juice" },
  ]);

  const addItem = text => {
    if (!text)
      return Alert.alert("Error", "Please enter an Item", { text: "Ok" });

    if (items.filter(item => text.toLowerCase() === item.text.toLowerCase()))
      return Alert.alert("Error", `${text} is already in your list`, {
        text: "Ok",
      });

    setItems(prevItems => {
      return [{ id: uuid(), text }, ...prevItems];
    });
  };

  const deleteItem = id => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Shopping List" />
      <AddItem addItem={addItem} />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ListItem item={item} deleteItem={deleteItem} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
});

export default App;
