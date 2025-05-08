import EditScreenInfo from '@/components/EditScreenInfo';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>教育用アプリケーション</Text>

      {/* ▼ クイズ画面へのリンク ▼ */}
      <Link href="/quiz" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>押せ！～to the quiz component～</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  button: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#4f46e5',
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
