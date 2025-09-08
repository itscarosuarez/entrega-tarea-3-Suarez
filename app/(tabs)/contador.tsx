import { StyleSheet, View } from "react-native"
import Contador from "../../components/Contador"

export default function ContadorTab() {
  return (
    <View style={styles.container}>
      <Contador/>
    </View>
  )
}

const styles= StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  }
})
