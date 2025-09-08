import { StyleSheet, View } from "react-native"
import Tarjetas from "../../components/Tarjetas"

export default function TarjetasTab() {
  return (
    <View style={styles.container}>
      <Tarjetas/>
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center"}
})
