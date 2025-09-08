import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Perfil(){
  const [nombre, setNombre]=useState('Carolina');
  const [ventanitaVisible,setVentanitaVisible]=useState(false);
  const [nuevoNombre,setNuevoNombre]=useState('');

  const guardar=()=>{
    setNombre(nuevoNombre);
    setVentanitaVisible(false);
    setNuevoNombre('')};

  return(
    <View style={styles.container}>
      <View style={styles.perfilBox}>
        <Text style={styles.label}>Mi Perfil</Text>
        <Text style={styles.nombre}>{nombre} Suarez</Text>
        <TouchableOpacity style={styles.boton} onPress={() => setVentanitaVisible(true)}>
          <Text style={styles.botonTexto}>Cambiar nombre</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={ventanitaVisible}>
        <View style={styles.ventanita}>
          <View style={styles.ventanitaBox}>
            <Text style={styles.ventanitaTitulo}>Nuevo nombre:</Text>
            <TextInput
              style={styles.input}
              value={nuevoNombre}
              onChangeText={setNuevoNombre}
              placeholder="Ingresa tu nombre"
            />
            <View style={styles.botonesContainer}>
              <TouchableOpacity style={styles.botonCancelar} onPress={() => setVentanitaVisible(false)}>
                <Text style={styles.textoBotonCancelar}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.boton} onPress={guardar}>
                <Text style={styles.botonTexto}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20,
  },
  perfilBox: {
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
  nombre: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0F3B8C',
    marginBottom: 25,
    textAlign: 'center',
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
  ventanita: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ventanitaBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 300,
  },
  ventanitaTitulo: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    width: '100%',
    marginBottom: 25,
  },
  botonesContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  botonCancelar: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 12,
  },
  textoBotonCancelar: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});
