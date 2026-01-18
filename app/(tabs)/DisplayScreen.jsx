import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockTranslations  = {
  en: {
    ar: { moon: 'قمر', hello: 'مرحبا', thank: 'شكرا' },
    es: { moon: 'luna', hello: 'hola', thank: 'gracias' },
    fr: { moon: 'lune', hello: 'bonjour', thank: 'merci' },
    de: { moon: 'Mond', hello: 'hallo', thank: 'danke' },
  },
  ar: {
    en: { قمر: 'moon', مرحبا: 'hello', شكرا: 'thank' },
    es: { قمر: 'luna', مرحبا: 'hola', شكرا: 'gracias' },
    fr: { قمر: 'lune', مرحبا: 'bonjour', شكرا: 'merci' },
    de: { قمر: 'Mond', مرحبا: 'hallo', شكرا: 'danke' },
  },
  es: {
    en: { luna: 'moon', hola: 'hello', gracias: 'thank' },
    ar: { luna: 'قمر', hola: 'مرحبا', gracias: 'شكرا' },
    fr: { luna: 'lune', hola: 'bonjour', gracias: 'merci' },
    de: { luna: 'Mond', hola: 'hallo', gracias: 'danke' },
  },
  fr: {
    en: { lune: 'moon', bonjour: 'hello', merci: 'thank' },
    ar: { lune: 'قمر', bonjour: 'مرحبا', merci: 'شكرا' },
    es: { lune: 'luna', bonjour: 'hola', merci: 'gracias' },
    de: { lune: 'Mond', bonjour: 'hallo', merci: 'danke' },
  },
  de: {
    en: { Mond: 'moon', hallo: 'hello', danke: 'thank' },
    ar: { Mond: 'قمر', hallo: 'مرحبا', danke: 'شكرا' },
    es: { Mond: 'luna', hallo: 'hola', danke: 'gracias' },
    fr: { Mond: 'lune', hallo: 'bonjour', danke: 'merci' },
  },
};
export default function DisplayScreen() {
  const { inputText, sourceLang, targetLang } = useLocalSearchParams();
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTranslation = async () => {
      const translated = mockTranslations[sourceLang]?.[targetLang]?.[inputText.toLowerCase()];
      if (translated) {
        setTranslatedText(translated);
      } else {
        setTranslatedText('Translation not found');
      }
      setLoading(false);
    };

    fetchTranslation();
  }, [inputText, sourceLang, targetLang]);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#6366f1" />
      ) : (
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Original ({sourceLang}):</Text>
            <Text style={styles.text}>{inputText}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.label}>Translated ({targetLang}):</Text>
            <Text style={[styles.text, styles.translatedText]}>{translatedText}</Text>
          </View>

           <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1493/1493351.png' }}
            style={styles.image}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 28,
    color: '#1e293b',
    letterSpacing: 0.8,
    fontFamily: 'System',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    marginTop: 12,
    color: '#334155',
    lineHeight: 28,
    padding: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 20,
    resizeMode: 'contain',
    alignSelf: 'center', 
    marginVertical: 40,
},

});