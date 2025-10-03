import React, { useEffect, useState } from 'react';
import { Alert, Button, Dimensions, FlatList, Image, ImageSourcePropType, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { API_CONFIG, getApiUrl } from '../config/api';
import { ApiProduct } from '../types/api';

interface Obra{
  id:string;
  titulo:string;
  precio:string;
  imagen:ImageSourcePropType;
  descripcion:string;
}

const {width}=Dimensions.get('window');

export default function Galeria() {
  const [busqueda, setBusqueda]=useState('');
  const [ventanaAbierta, setVentanaAbierta]=useState(false);
  const [cuadroElegido, setCuadroElegido]=useState<Obra | null>(null);
  const [modoImagen, setModoImagen]=useState<'cover' | 'contain' | 'stretch'>('cover');
  const [favoritos, setFavoritos]=useState<Set<string>>(new Set());
  const [cuadros, setCuadros]=useState<Obra[]>([]);
  const [modalAgregar, setModalAgregar]=useState(false);
  const [nuevaObra, setNuevaObra]=useState({
    titulo:'',
    precio:'',
    imagen:'',
    descripcion:''
  });

  const obtenerObras=async()=>{
    const response=await fetch(getApiUrl(API_CONFIG.ENDPOINTS.ARTE));
    const obras: ApiProduct[]=await response.json();
    const cuadrosConvertidos: Obra[]=obras.map(obra=>({
      id:obra.id,
      titulo:obra.titulo,
      precio:obra.precio,
      imagen:{ uri:obra.imagen },
      descripcion:obra.descripcion
    }));
    setCuadros(cuadrosConvertidos);
  };

  const agregarObra=async()=>{
    const response=await fetch(getApiUrl(API_CONFIG.ENDPOINTS.ARTE), {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(nuevaObra)
    });
    const obraCreada: ApiProduct=await response.json();
    const nuevaObraCompleta: Obra={
      id:obraCreada.id,
      titulo:obraCreada.titulo,
      precio:obraCreada.precio,
      imagen:{ uri:obraCreada.imagen },
      descripcion:obraCreada.descripcion
    };
    setCuadros(prev=>[nuevaObraCompleta, ...prev]);
    setNuevaObra({ titulo:'', precio:'', imagen:'', descripcion:'' });
    setModalAgregar(false);
  };

  useEffect(()=>{
    obtenerObras();
  }, []);

  const cuadrosFiltrados=cuadros.filter(cuadro=>
    cuadro.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const tocarCuadro=(cuadro: Obra)=>{
    setCuadroElegido(cuadro);
    setModoImagen('cover');
    setVentanaAbierta(true);
  };

  const mantenerPresionado=(cuadro: Obra)=>{
    const nuevosFavoritos=new Set(favoritos);
    if (nuevosFavoritos.has(cuadro.id)) {
      nuevosFavoritos.delete(cuadro.id);
      Alert.alert('desfavoritado 💔',`${cuadro.titulo} fue eliminado de favoritos`);
    } else {
      nuevosFavoritos.add(cuadro.id);
      Alert.alert('favorito ❤️',`${cuadro.titulo} fue agregado a favoritos`);
    }
    setFavoritos(nuevosFavoritos);
  };

  const mostrarCuadro=({item}:{item: Obra})=>{
    const esFavorito=favoritos.has(item.id);
    
    return (
      <Pressable
        style={[styles.obraContainer, esFavorito && styles.obraFavorita]}
        onPress={()=>tocarCuadro(item)}
        onLongPress={()=>mantenerPresionado(item)}
      >
        <Image
          source={item.imagen}
          style={styles.obraImagen}
          resizeMode="cover"
        />
        <View style={styles.obraInfo}>
          <Text style={styles.obraTitulo}>
            {item.titulo} {esFavorito && '❤️'}
          </Text>
          <Text style={styles.obraPrecio}>{item.precio}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.buscador}
        placeholder="Buscar obra de arte..."
        value={busqueda}
        onChangeText={setBusqueda}
        placeholderTextColor="#999"
      />

      <View style={styles.buttonContainer}>
        <Button 
          title="+ Nueva Obra" 
          onPress={()=>setModalAgregar(true)}
          color="#8B4513"
        />
        <Button 
          title="Recargar" 
          onPress={obtenerObras}
          color="#8B4513"
        />
      </View>

      <FlatList
        data={cuadrosFiltrados}
        renderItem={mostrarCuadro}
        keyExtractor={(item)=>item.id}
        numColumns={2}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={ventanaAbierta}
        onRequestClose={()=>setVentanaAbierta(false)}
      >
        <View style={styles.modalFondo}>
          <View style={styles.modalContent}>
            {cuadroElegido && (
              <>
                <Text style={styles.modalTitulo}>{cuadroElegido.titulo}</Text>
                
                <Image
                  source={cuadroElegido.imagen}
                  style={styles.modalImagen}
                  resizeMode={modoImagen}
                />
                
                <View style={styles.resizeModeContainer}>
                  <Text style={styles.resizeModeLabel}>Modo de imagen:</Text>
                  <View style={styles.resizeModeButtons}>
                    {(['cover', 'contain', 'stretch'] as const).map((mode)=>(
                      <Pressable
                        key={mode}
                        style={[
                          styles.resizeModeButton,
                          modoImagen === mode && styles.resizeModeButtonActive
                        ]}
                        onPress={()=>setModoImagen(mode)}
                      >
                        <Text style={[
                          styles.resizeModeButtonText,
                          modoImagen === mode && styles.resizeModeButtonTextActive
                        ]}>
                          {mode}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
                
                <Text style={styles.modalDescripcion}>
                  {cuadroElegido.descripcion}
                </Text>
                
                <Text style={styles.modalPrecio}>
                  {cuadroElegido.precio}
                </Text>
                
                <Pressable
                  style={styles.cerrarButton}
                  onPress={()=>setVentanaAbierta(false)}
                >
                  <Text style={styles.cerrarButtonText}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAgregar}
        onRequestClose={()=>setModalAgregar(false)}
      >
        <View style={styles.modalFondo}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.closeButton}
              onPress={()=>{
                setModalAgregar(false);
                setNuevaObra({ titulo:'', precio:'', imagen:'', descripcion:'' });
              }}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
            
            <Text style={styles.modalTitulo}>Agregar Nueva Obra</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Titulo"
              placeholderTextColor="#666"
              value={nuevaObra.titulo}
              onChangeText={(text)=>setNuevaObra(prev=>({...prev, titulo:text}))}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Precio"
              placeholderTextColor="#666"
              value={nuevaObra.precio}
              onChangeText={(text)=>setNuevaObra(prev=>({...prev, precio:text}))}
            />
            
            <TextInput
              style={styles.input}
              placeholder="URL de la imagen"
              placeholderTextColor="#666"
              value={nuevaObra.imagen}
              onChangeText={(text)=>setNuevaObra(prev=>({...prev, imagen:text}))}
              multiline
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descripcion"
              placeholderTextColor="#666"
              value={nuevaObra.descripcion}
              onChangeText={(text)=>setNuevaObra(prev=>({...prev, descripcion:text}))}
              multiline
              numberOfLines={4}
            />
            
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.cerrarButton, { backgroundColor:'#ccc' }]}
                onPress={()=>{
                  setModalAgregar(false);
                  setNuevaObra({ titulo:'', precio:'', imagen:'', descripcion:'' });
                }}
              >
                <Text style={styles.cerrarButtonText}>Cancelar</Text>
              </Pressable>
              
              <Pressable
                style={[styles.cerrarButton, { backgroundColor:'#8B4513' }]}
                onPress={agregarObra}
              >
                <Text style={styles.cerrarButtonText}>Guardar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f5f5f5',
    padding:16,
  },
  buscador:{
    backgroundColor:'white',
    borderRadius:10,
    padding:12,
    marginBottom:16,
    fontSize:16,
    borderWidth:1,
    borderColor:'#ddd',
  },
  lista:{
    paddingBottom:20,
  },
  obraContainer:{
    flex:1,
    backgroundColor:'white',
    margin:8,
    borderRadius:12,
    padding:12,
    elevation:3,
    shadowColor:'#000',
    shadowOffset:{ width:0, height:2 },
    shadowOpacity:0.1,
    shadowRadius:4,
  },
  obraFavorita:{
    borderWidth:2,
    borderColor:'#ff6b6b',
  },
  obraImagen:{
    width:'100%',
    height:120,
    borderRadius:8,
    marginBottom:8,
  },
  obraInfo:{
    alignItems:'center',
  },
  obraTitulo:{
    fontSize:14,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:4,
    color:'#333',
  },
  obraPrecio:{
    fontSize:12,
    color:'#666',
    fontWeight:'600',
  },
  modalFondo:{
    flex:1,
    backgroundColor:'rgba(0, 0, 0, 0.8)',
    justifyContent:'center',
    alignItems:'center',
  },
  modalContent:{
    backgroundColor:'white',
    borderRadius:20,
    padding:20,
    margin:20,
    maxHeight:'90%',
    width:width - 40,
  },
  modalTitulo:{
    fontSize:24,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:16,
    color:'#333',
  },
  modalImagen:{
    width:'100%',
    height:250,
    borderRadius:12,
    marginBottom:16,
  },
  resizeModeContainer:{
    marginBottom:16,
  },
  resizeModeLabel:{
    fontSize:16,
    fontWeight:'600',
    marginBottom:8,
    color:'#333',
  },
  resizeModeButtons:{
    flexDirection:'row',
    justifyContent:'space-around',
  },
  resizeModeButton:{
    paddingHorizontal:16,
    paddingVertical:8,
    borderRadius:20,
    backgroundColor:'#f0f0f0',
    borderWidth:1,
    borderColor:'#ddd',
  },
  resizeModeButtonActive:{
    backgroundColor:'#007AFF',
    borderColor:'#007AFF',
  },
  resizeModeButtonText:{
    fontSize:14,
    color:'#333',
    fontWeight:'500',
  },
  resizeModeButtonTextActive:{
    color:'white',
  },
  modalDescripcion:{
    fontSize:16,
    lineHeight:24,
    textAlign:'justify',
    marginBottom:16,
    color:'#555',
  },
  modalPrecio:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:20,
    color:'#007AFF',
  },
  cerrarButton:{
    backgroundColor:'#007AFF',
    paddingVertical:12,
    paddingHorizontal:30,
    borderRadius:25,
    alignSelf:'center',
  },
  cerrarButtonText:{
    color:'white',
    fontSize:16,
    fontWeight:'600',
  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginVertical:10,
    paddingHorizontal:20,
  },
  input:{
    backgroundColor:'white',
    borderRadius:8,
    padding:12,
    marginVertical:8,
    fontSize:16,
    borderWidth:1,
    borderColor:'#ddd',
    width:'100%',
  },
  textArea:{
    height:80,
    textAlignVertical:'top',
  },
  modalButtons:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:20,
    gap:10,
  },
  closeButton:{
    position:'absolute',
    top:15,
    right:15,
    width:30,
    height:30,
    borderRadius:15,
    backgroundColor:'#f0f0f0',
    justifyContent:'center',
    alignItems:'center',
    zIndex:1,
  },
  closeButtonText:{
    fontSize:18,
    color:'#666',
    fontWeight:'bold',
  },
});