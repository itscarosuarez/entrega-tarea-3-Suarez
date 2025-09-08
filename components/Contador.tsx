import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function Contador(){
  const [contador,setContador] = useState(0)
  const [contador2,setContador2] = useState(0)
  
  const sumar=()=>{
    setContador(prev=>prev+1)}
  
  const restar=()=>{
    setContador2(i=>i-1)}

  return(
    <View style={styles.container}>
      <View style={styles.contadorBox}>
        <Text style={styles.label}>sumador</Text>
        <Text style={styles.numero}>{contador}</Text>
        <TouchableOpacity style={styles.boton} onPress={sumar}>
          <Text style={styles.botonTexto}>sumar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contadorBox}>
        <Text style={styles.label}>restador</Text>
        <Text style={styles.numero}>{contador2}</Text>
        <TouchableOpacity style={styles.boton} onPress={restar}>
          <Text style={styles.botonTexto}>restar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 30,
  },
  contadorBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 280,
    minHeight: 200,
  },
  label: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  numero: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#0F3B8C',
    marginBottom: 25,
  },
  boton: {
    backgroundColor: '#0F3B8C',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Contador;