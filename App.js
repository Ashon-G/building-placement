import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import GameDrawer, {
  BUILDING_COSTS,
  BUILDING_MODELS,
  BuildingType,
} from './components/GameDrawer';
import PlacementGrid from './components/PlacementGrid';

export default function App() {
  const [currency, setCurrency] = useState(200);
  const [selected, setSelected] = useState<BuildingType | null>(null);

  const handleSelectBuilding = (type: BuildingType) => {
    if (currency >= BUILDING_COSTS[type]) {
      setSelected(type);
    }
  };

  const handlePlaced = () => {
    if (selected) {
      setCurrency((c) => c - BUILDING_COSTS[selected]);
    }
    setSelected(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <GameDrawer currency={currency} onSelectBuilding={handleSelectBuilding} />
      {selected && (
        <PlacementGrid model={BUILDING_MODELS[selected]} onPlaced={handlePlaced} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
