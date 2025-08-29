import { useState } from 'react';
import { Button, Text, View } from 'react-native';

function Contador() {
  const [contador, setContador] = useState(0);
  const [contador2, setContador2] = useState(0);
  
  const incrementar = () => {
    setContador(prev => prev + 1);
  };
  
  const restar = () => {
    setContador2(i => i - 1);
  };

  return (
    <View>
      <Text>Contador: {contador}</Text>
      <Button 
        onPress={incrementar}
        title="Incrementar"
      />
      <Text>Contador: {contador2}</Text>
      <Button 
        onPress={restar}
        title="Restar"
      />
    </View>
  );
}

export default Contador;