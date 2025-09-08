import { StyleSheet, View } from "react-native"
import Perfil from "../../components/Perfil"

export default function PerfilTab() {
  return (
    <View style={styles.container}>
      <Perfil/>
    </View>
  )
}

const styles=StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center",
    alignItems:"center"}
})
