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
      onPress={() => setActive(!active)}
    >
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
  list:{
    justifyContent:"center",
    alignItems:"center",
    gap:20,
    paddingHorizontal:16,
  },
  tarjeta:{
    width:300,
    height:100,
    borderRadius:15,
    justifyContent:"center",
    alignItems:"center",
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  tarjetaText: {
    fontSize: 22,
    fontWeight: "700",
  }
});
