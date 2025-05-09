import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';

type ScoreModalProps = {
  visible: boolean;
  score: number;
  total: number;
  onRetry: () => void;
};

export default function ScoreModal({ visible, score, total, onRetry }: ScoreModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>お疲れさまでした！</Text>
          <Text style={styles.score}>
            あなたのスコア: {score} / {total}
          </Text>

          <Pressable style={styles.retryBtn} onPress={onRetry}>
            <Text style={styles.retryText}>もう一度挑戦</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  score: {
    fontSize: 18,
    marginBottom: 24,
  },
  retryBtn: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
