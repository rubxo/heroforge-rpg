import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectCapacity, selectEquippedItems, selectHeroVisualClass, selectSpeed, selectStats, selectTotalStats, selectTotalWeight } from '../store/selectors';
import { Meter, Panel, styles } from './ui';

export default function HeroAvatarHUD() {
  const hero = useSelector(selectHeroVisualClass);
  const { currentHp } = useSelector(selectStats);
  const { int } = useSelector(selectTotalStats);
  const items = useSelector(selectEquippedItems);
  const weight = useSelector(selectTotalWeight);
  const capacity = useSelector(selectCapacity);
  const speed = useSelector(selectSpeed);
  const condition = currentHp === 0 ? 'Derrotado' : currentHp <= 50 ? 'Herido' : 'Sano';
  const weapon = items.findLast(item => item.category === 'arma');

  return <Panel number="01 · PERFIL" title={hero.name}>
    <View style={{ backgroundColor: hero.color + '22', borderColor: hero.color, borderWidth: 1, borderRadius: 14, padding: 12, alignItems: 'center', gap: 5 }}>
      <Text style={{ fontSize: 43 }}>{currentHp === 0 ? '💀' : hero.icon} {weapon?.icon ?? '✊'}</Text>
      <Text style={[styles.label, { color: hero.color }]}>{condition === 'Herido' ? '😣 ' : ''}{condition} · Velocidad {speed}</Text>
    </View>
    <Meter label="Vida" value={currentHp} max={100} color="#fb7185" />
    <Meter label="Maná" value={int * 3} max={135} color="#a78bfa" />
    <Meter label="Carga (kg)" value={weight} max={capacity} color={weight > capacity ? '#fb7185' : weight >= capacity * 0.75 ? '#fbbf24' : '#6ee7b7'} />
  </Panel>;
}
