import { Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectInventory, selectIsOverencumbered } from '../store/selectors';
import { clearEquipment, toggleEquipItem } from '../store/slices/inventorySlice';
import { Button, Panel, styles } from './ui';

export default function ArmoryGrid() {
  const dispatch = useDispatch();
  const { catalog, equippedIds } = useSelector(selectInventory);
  const overloaded = useSelector(selectIsOverencumbered);

  return <Panel number="03 · EQUIPAMIENTO" title="Armería y mochila">
    {overloaded && <Text accessibilityLiveRegion="polite" style={{ color: '#fda4af', fontWeight: '800' }}>¡SOBRECARGADO! · −50% velocidad · −30% poder</Text>}
    <View style={styles.wrap}>
      {catalog.map(item => {
        const equipped = equippedIds.includes(item.id);
        const bonuses = [[item.bonusStr, 'FUE'], [item.bonusAgi, 'AGI'], [item.bonusInt, 'INT']]
          .filter(([value]) => value > 0).map(([value, stat]) => `+${value} ${stat}`).join(' · ');
        return <Pressable key={item.id} accessibilityRole="button" accessibilityState={{ selected: equipped }}
          onPress={() => dispatch(toggleEquipItem(item.id))}
          style={{ flexBasis: '48%', flexGrow: 1, gap: 5, padding: 10, borderRadius: 12, borderWidth: 1,
            borderColor: equipped ? '#c4a7ff' : '#373c53', backgroundColor: equipped ? '#30254a' : '#202437' }}>
          <Text style={{ fontSize: 23 }}>{item.icon}</Text>
          <Text style={{ color: '#fff', fontWeight: '700' }}>{item.name}</Text>
          <Text style={styles.label}>{bonuses} · {item.weight} kg</Text>
          <Text style={styles.label}>{equipped ? '✓ Equipado' : 'Toca para equipar'}</Text>
        </Pressable>;
      })}
    </View>
    <Button label="Quitar todo" disabled={!equippedIds.length} onPress={() => dispatch(clearEquipment())} />
  </Panel>;
}
