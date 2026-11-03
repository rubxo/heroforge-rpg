import { Pressable, StyleSheet, Text, View } from 'react-native';

export const styles = StyleSheet.create({
  card: { backgroundColor: '#171b2a', borderRadius: 18, borderWidth: 1, borderColor: '#30354b', padding: 16, gap: 12 },
  label: { color: '#adafc8', fontSize: 13 },
  title: { color: '#f6f3ff', fontWeight: '800', fontSize: 21 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  button: { paddingHorizontal: 12, minHeight: 44, justifyContent: 'center', borderRadius: 10, backgroundColor: '#33305b' },
  buttonText: { color: '#f3ebff', fontWeight: '700', textAlign: 'center' },
  track: { backgroundColor: '#33384d', height: 7, borderRadius: 5, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 5 },
});

export function Panel({ number, title, children }) {
  return <View style={styles.card}>
    <Text style={[styles.label, { color: '#c4a7ff', fontWeight: '800' }]}>{number}</Text>
    <Text accessibilityRole="header" style={styles.title}>{title}</Text>
    {children}
  </View>;
}

export function Button({ label, onPress, disabled = false, accessibilityLabel = label }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel} accessibilityState={{ disabled }}
    disabled={disabled} onPress={onPress}
    style={({ pressed }) => [styles.button, { opacity: disabled ? 0.4 : pressed ? 0.75 : 1 }]}>
    <Text style={styles.buttonText}>{label}</Text>
  </Pressable>;
}

export function Meter({ label, value, max, color }) {
  return <View style={{ gap: 5 }}>
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.label}>{value} / {max}</Text>
    </View>
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.min(100, value / max * 100)}%`, backgroundColor: color }]} />
    </View>
  </View>;
}
