import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import backgroundImage from '../../assets/images/inp.jpg';

export default function InputScreen() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('ar');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!text.trim()) {
      setError('Please enter text to translate');
      return;
    }

    setLoading(true);
    setError('');

    try {
      router.push({
        pathname: '/DisplayScreen',
        params: {
          inputText: text,
          sourceLang,
          targetLang,
        },
      });
    } catch (err) {
      setError(err.message);
      Alert.alert('Translation Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setText('');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.label}>Enter text to translate:</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here..."
            placeholderTextColor="#888"
            value={text}
            onChangeText={setText}
            multiline
            editable={!loading}
          />

          <View style={styles.languageContainer}>
            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>From:</Text>
              <Picker
                selectedValue={sourceLang}
                onValueChange={setSourceLang}
                style={styles.picker}
                dropdownIconColor="#007BFF"
                enabled={!loading}
              >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Arabic" value="ar" />
                <Picker.Item label="Spanish" value="es" />
                <Picker.Item label="French" value="fr" />
                <Picker.Item label="German" value="de" />
              </Picker>
            </View>

            <Pressable 
              style={styles.swapButton} 
              onPress={swapLanguages}
              disabled={loading}
            >
              <Text style={styles.swapIcon}>⇄</Text>
            </Pressable>

            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>To:</Text>
              <Picker
                selectedValue={targetLang}
                onValueChange={setTargetLang}
                style={styles.picker}
                dropdownIconColor="#007BFF"
                enabled={!loading}
              >
                <Picker.Item label="Arabic" value="ar" />
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Spanish" value="es" />
                <Picker.Item label="French" value="fr" />
                <Picker.Item label="German" value="de" />
              </Picker>
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              loading && styles.buttonDisabled,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleTranslate}
            disabled={!text.trim() || loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Translating...' : 'Translate'}
            </Text>
          </Pressable>

          {loading && (
            <ActivityIndicator 
              size="large" 
              color="#007BFF" 
              style={styles.loader} 
            />
          )}

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  scrollContainer: {
    justifyContent: 'center',
    flexGrow: 1,
    paddingBottom: 20,
  },
  label: {
    fontSize: 20,
    marginTop: 10,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: 'white',
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 20,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  pickerWrapper: {
    flex: 1,
  },
  picker: {
    backgroundColor: 'white',
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 60,

  },
  swapButton: {
    padding: 8,
    marginHorizontal: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  swapIcon: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    marginTop: 20,
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});
