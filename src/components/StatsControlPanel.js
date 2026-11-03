import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectStats, selectTotalStats } from '../store/selectors';
import { applyBuildPreset, decrementStat, incrementStat, resetStats } from '../store/slices/statsSlice';
import { Button, Panel, styles } from './ui';

const attributes = [['str', 'Fuerza'], ['agi', 'Agilidad'], ['int', 'Inteligencia']];
const presets = [['MAGE', 'Mago'], ['TANK', 'Tanque'], ['WARRIOR', 'Guerrero'], ['ROGUE', 'Pícaro']];

export default function StatsControlPanel() {
  const dispatch = useDispatch();
  const stats = useSelector(selectStats);
  const totals = useSelector(selectTotalStats);

  return <Panel number="02 · ENTRENAMIENTO" title="Atributos">
    <Text style={styles.label}>Te quedan {stats.availablePoints} puntos por gastar</Text>
    <Text style={styles.label}>Con + gastas un punto y con − lo recuperas. El equipo aporta bonos mientras lo llevas puesto.</Text>
    {attributes.map(([key, name]) => <View key={key} style={styles.row}>
      <Button label="−" accessibilityLabel={`Reducir ${name}`} disabled={stats[key] <= 1} onPress={() => dispatch(decrementStat(key))} />
      <View style={{ flex: 1 }}>
        <Text style={styles.buttonText}>{name} · Total {totals[key]}</Text>
        <Text style={[styles.label, { textAlign: 'center' }]}>
          Base {stats[key]} + equipo {totals[key] - stats[key]}
        </Text>
        <View style={[styles.track, { marginTop: 5 }]}>
          <View style={[styles.fill, { width: `${stats[key] / 28 * 100}%`, backgroundColor: '#a78bfa' }]} />
        </View>
      </View>
      <Button label="+" accessibilityLabel={`Subir ${name}`} disabled={!stats.availablePoints} onPress={() => dispatch(incrementStat(key))} />
    </View>)}
    <View style={styles.wrap}>
      {presets.map(([key, label]) => <Button key={key} label={label} onPress={() => dispatch(applyBuildPreset(key))} />)}
      <Button label="Poción de reseteo" onPress={() => dispatch(resetStats())} />
    </View>
  </Panel>;
}
