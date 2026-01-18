import { Link } from 'expo-router';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import backgroundImage from '../../assets/images/back.jpg';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={backgroundImage} 
        style={styles.image}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to Language Translator</Text>
          <Link href="/InputScreen" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Start Translating</Text>
            </Pressable>
          </Link>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(41, 38, 38, 0.7)', 
  },
title: {
  color: 'lightgray',
  fontSize: 26,
  fontWeight: 'bold',
  textAlign: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.6)', 
  padding: 20, 
  borderRadius: 15, 
  marginBottom: 20, 
},
button: {
  height: 60,
  width: 200,
  borderRadius: 15, 
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.6)', 
  paddingVertical: 12, 
  paddingHorizontal: 16, 
  shadowColor: '#000', 
  shadowOpacity: 0.5, 
  shadowOffset: { width: 2, height: 2 }, 
  shadowRadius: 5, 
},
buttonText: {
  color: 'lightgray',
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
},
});

export default HomeScreen;