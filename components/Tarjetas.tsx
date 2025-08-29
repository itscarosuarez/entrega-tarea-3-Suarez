import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type tarjetaProps = {
  label: string;
};

const Tarjeta = ({ label }: tarjetaProps) => {
  const [active, setActive] = useState(false);
  const backgroundColor = active ? "#0F3B8C" : "#FFD700"; 
  const textColor = active ? "#FFD700" : "#0F3B8C"; 
  
  return (
    <Pressable
      style={[styles.tarjeta, { backgroundColor }]}
      onPress={() => setActive(!active)}>
      <Text style={[styles.tarjetaText, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
};

export default function Tarjetas() {
  const tarjetasList = ['Club', 'Atletico', 'Boca', 'Juniors'];
  return (
    <View style={styles.list}>
      {tarjetasList.map((item) => (
        <Tarjeta key={item} label={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    gap: 12,
    padding: 16,
  },
  tarjeta: {
    height: 80,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  tarjetaText: {
    fontSize: 18,
    fontWeight: "600",
  }
});
