import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCombatPower, selectInventory, selectSpeed, selectStats } from '../store/selectors';
import { healHero, resolveTurn, takeDamage } from '../store/slices/statsSlice';
import { Button, Meter, Panel, styles } from './ui';

export default function ReduxLiveInspector() {
  const dispatch = useDispatch();
  const power = useSelector(selectCombatPower);
  const speed = useSelector(selectSpeed);
  const { bossHp, currentHp } = useSelector(selectStats);
  const { catalog } = useSelector(selectInventory);
  const entries = useSelector(state => state.actionLog.entries);

  function attackBoss() {
    const retaliation = bossHp <= power ? 0 : Math.max(8, 35 - speed);
    dispatch(resolveTurn({ attack: power, retaliation }));
  }

  return <Panel number="04 · SIMULACIÓN" title="Arena e inspector Redux">
    <Text style={[styles.title, { color: '#c4a7ff' }]}>Poder de combate · {power}</Text>
    <Meter label="🐉 Dragón de la Forja" value={bossHp} max={250} color="#fbbf24" />
    {bossHp === 0 && <Text style={styles.label}>¡Derrotaste al dragón!</Text>}
    {currentHp === 0 && <Text style={styles.label}>Caíste en combate. Reinicia el duelo para volver a intentarlo.</Text>}
    <Meter label="Vida del héroe" value={currentHp} max={100} color="#fb7185" />
    <View style={styles.wrap}>
      <Button label="Atacar al jefe" disabled={!bossHp || !currentHp} onPress={attackBoss} />
      <Button label="Recibir 25 de daño" disabled={!currentHp} onPress={() => dispatch(takeDamage(25))} />
      <Button label="Curar y reiniciar duelo" onPress={() => dispatch(healHero())} />
    </View>
    <Text style={{ color: '#f6f3ff', fontWeight: '800' }}>Últimas 5 acciones</Text>
    <View style={{ padding: 10, gap: 10, borderRadius: 10, backgroundColor: '#101320' }}>
      {!entries.length && <Text style={styles.label}>Entrena, equipa un objeto o ataca para ver el primer dispatch.</Text>}
      {entries.map(({ type, payload }, index) => {
        const item = type === 'inventory/toggleEquipItem' && catalog.find(entry => entry.id === payload);
        return <View key={index} style={{ gap: 3 }}>
          <Text style={{ color: '#c4a7ff', fontSize: 13, fontWeight: '700' }}>{type}</Text>
          <Text style={styles.label}>{JSON.stringify(payload)}{item ? ` · ${item.name}` : ''}</Text>
        </View>;
      })}
    </View>
  </Panel>;
}
