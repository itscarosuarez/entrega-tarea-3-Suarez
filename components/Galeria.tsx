import React, { useState } from 'react';
import { Alert, Dimensions, FlatList, Image, ImageSourcePropType, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface Obra{
  id: string;
  titulo: string;
  precio: string;
  imagen: ImageSourcePropType;
  descripcion: string;
}

const cuadros: Obra[]=[
  {
    id: '1',
    titulo: 'La Mona Lisa',
    precio: '$2.000.000.000',
    imagen: require('../assets/images/Leonardo_da_Vinci_-_Mona_Lisa_(Louvre,_Paris).jpg'),
    descripcion: 'Leonardo da Vinci. Óleo sobre tabla de álamo. Museo del Louvre, París. Una de las pinturas más famosas del mundo.',
  },
  {
    id: '2',
    titulo: 'El Nacimiento de Venus',
    precio: '$800.000.000',
    imagen: { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/2880px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg' },
    descripcion: 'Sandro Botticelli. Temple sobre lienzo. Galería Uffizi, Florencia. Representa a la diosa Venus emergiendo del mar.',
  },
  {
    id: '3',
    titulo: 'La Creación de Adán',
    precio: '$5.000.000.000',
    imagen: { uri: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Creaci%C3%B3n_de_Ad%C3%A1n.jpg' },
    descripcion: 'Miguel Ángel. Fresco en la Capilla Sixtina. Vaticano. Famoso por el dedo de Dios tocando a Adán.',
  },
  {
    id: '4',
    titulo: 'La Escuela de Atenas',
    precio: '$1.500.000.000',
    imagen: { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1200px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg' },
    descripcion: 'Rafael Sanzio. Fresco en los Museos Vaticanos. Representa a los filósofos griegos más importantes.',
  },
  {
    id: '5',
    titulo: 'La Última Cena',
    precio: '$2.000.000.000',
    imagen: { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg/1200px-%C3%9Altima_Cena_-_Da_Vinci_5.jpg' },
    descripcion: 'Leonardo da Vinci. Pintura mural al temple y óleo. Convento de Santa María delle Grazie, Milán.',
  },
  {
    id: '6',
    titulo: 'Virgen de la rueca',
    precio: '$600.000.000',
    imagen: { uri: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Madonna_of_the_Yarnwinder.jpg' },
    descripcion: 'Leonardo da Vinci. Óleo sobre tabla. Una de las representaciones más tiernas de la Virgen con el Niño del Renacimiento.',
  },
  {
    id: '7',
    titulo: 'La Joven de la Perla',
    precio: '$900.000.000',
    imagen: { uri: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/1665_Girl_with_a_Pearl_Earring.jpg' },
    descripcion: 'Johannes Vermeer. Óleo sobre lienzo. Mauritshuis, La Haya. También conocida como "La Mona Lisa del Norte", famosa por su misterioso encanto y la perla que adorna el oído de la joven.',
  },
  {
    id: '8',
    titulo: 'Carlos V en la Batalla de Mühlberg',
    precio: '$200.000.000',
    imagen: { uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Carlos_V_en_la_Batalla_de_M%C3%BChlberg%2C_por_Tiziano.jpg/1006px-Carlos_V_en_la_Batalla_de_M%C3%BChlberg%2C_por_Tiziano.jpg?20150826102047' },
    descripcion: 'Tiziano Vecellio. Óleo sobre lienzo. Museo del Prado, Madrid. Retrato ecuestre del emperador Carlos V tras su victoria en la batalla de Mühlberg, considerado una de las obras maestras del retrato renacentista.',
  },
];

const {width} = Dimensions.get('window');

export default function Galeria() {
  const [busqueda, setBusqueda] = useState('');
  const [ventanaAbierta, setVentanaAbierta] = useState(false);
  const [cuadroElegido, setCuadroElegido] = useState<Obra | null>(null);
  const [modoImagen, setModoImagen] = useState<'cover' | 'contain' | 'stretch'>('cover');
  const [favoritos, setFavoritos] = useState<Set<string>>(new Set());

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

  const mostrarCuadro =({item}:{item: Obra})=>{
    const esFavorito=favoritos.has(item.id);
    
    return (
      <Pressable
        style={[styles.obraContainer, esFavorito && styles.obraFavorita]}
        onPress={() => tocarCuadro(item)}
        onLongPress={() => mantenerPresionado(item)}
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
      {}
      <TextInput
        style={styles.buscador}
        placeholder="Buscar obra de arte..."
        value={busqueda}
        onChangeText={setBusqueda}
        placeholderTextColor="#999"
      />

      {}
      <FlatList
        data={cuadrosFiltrados}
        renderItem={mostrarCuadro}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />

      {}
      <Modal
        animationType="slide"
        transparent={true}
        visible={ventanaAbierta}
        onRequestClose={() => setVentanaAbierta(false)}
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
                
                {}
                <View style={styles.resizeModeContainer}>
                  <Text style={styles.resizeModeLabel}>Modo de imagen:</Text>
                  <View style={styles.resizeModeButtons}>
                    {(['cover', 'contain', 'stretch'] as const).map((mode) => (
                      <Pressable
                        key={mode}
                        style={[
                          styles.resizeModeButton,
                          modoImagen === mode && styles.resizeModeButtonActive
                        ]}
                        onPress={() => setModoImagen(mode)}
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
                  onPress={() => setVentanaAbierta(false)}
                >
                  <Text style={styles.cerrarButtonText}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  buscador: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  lista: {
    paddingBottom: 20,
  },
  obraContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 8,
    borderRadius: 12,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  obraFavorita: {
    borderWidth: 2,
    borderColor: '#ff6b6b',
  },
  obraImagen: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  obraInfo: {
    alignItems: 'center',
  },
  obraTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    color: '#333',
  },
  obraPrecio: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    maxHeight: '90%',
    width: width - 40,
  },
  modalTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  modalImagen: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  resizeModeContainer: {
    marginBottom: 16,
  },
  resizeModeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  resizeModeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  resizeModeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resizeModeButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  resizeModeButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  resizeModeButtonTextActive: {
    color: 'white',
  },
  modalDescripcion: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 16,
    color: '#555',
  },
  modalPrecio: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#007AFF',
  },
  cerrarButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
  },
  cerrarButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});