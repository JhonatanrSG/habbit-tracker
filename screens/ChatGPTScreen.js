import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';

const apiKey = "TU_API_KEY_AQUI";

const MODEL = 'gpt2-large'; // o 'facebook/blenderbot-400M-distill'


const ChatScreen = () => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);

    try {
      const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: userMessage }),
      });

      const text = await response.text(); // Leemos respuesta como texto plano

      console.log('Respuesta raw de Hugging Face:', text);

      try {
        const data = JSON.parse(text); // Intentamos parsear JSON

        if (data.error) {
          throw new Error(data.error);
        }

        const assistantMessage = data[0]?.generated_text || 'No se pudo obtener respuesta';

        setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
        setUserMessage('');
      } catch (parseError) {
        console.error('Error parseando JSON:', parseError);
        console.error('Respuesta recibida que falló al parsear:', text);
        setMessages([...newMessages, { role: 'assistant', content: 'Error al interpretar la respuesta del servidor.' }]);
      }

    } catch (error) {
      console.error('Error consultando Hugging Face:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Error al consultar el servidor.' }]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatBox}>
        {messages.map((msg, i) => (
          <Text key={i} style={msg.role === 'user' ? styles.userText : styles.assistantText}>
            {msg.content}
          </Text>
        ))}
      </ScrollView>

      <TextInput
        style={styles.input}
        placeholder="Escribe tu duda..."
        value={userMessage}
        onChangeText={setUserMessage}
      />
      <Button title="Enviar" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  chatBox: { flex: 1, marginBottom: 10 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  userText: {
    textAlign: 'right',
    color: '#333',
    marginVertical: 5,
    backgroundColor: '#d1f7c4',
    padding: 10,
    borderRadius: 8,
  },
  assistantText: {
    textAlign: 'left',
    color: '#333',
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
});

export default ChatScreen;
