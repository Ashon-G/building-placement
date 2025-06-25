import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { FontAwesome5, MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';

// Mock Data
const BUILDING_COSTS = {
  residential: 100,
  commercial: 150,
  park: 80,
  factory: 200,
  church: 120,
};

// Dummy building type enum
const BUILDING_TYPES = ['residential', 'commercial', 'park', 'factory', 'church'] as const;
type BuildingType = typeof BUILDING_TYPES[number];

const GameDrawer = ({ onSelectBuilding, currency }: { onSelectBuilding: (type: BuildingType) => void; currency: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectBuilding = (type: BuildingType) => {
    const cost = BUILDING_COSTS[type];
    if (currency < cost) {
      Alert.alert("Not enough funds", `You need ${cost} coins to build this.`);
      return;
    }
    onSelectBuilding(type);
    setIsOpen(false);
  };

  const buildings = [
    {
      type: 'residential',
      icon: <FontAwesome5 name="building" size={24} color="#4CAF50" />,
      label: 'Residential',
      color: '#4CAF50',
    },
    {
      type: 'commercial',
      icon: <MaterialIcons name="business" size={24} color="#2196F3" />,
      label: 'Commercial',
      color: '#2196F3',
    },
    {
      type: 'park',
      icon: <FontAwesome5 name="tree" size={24} color="#81C784" />,
      label: 'Park',
      color: '#81C784',
    },
    {
      type: 'factory',
      icon: <Entypo name="factory" size={24} color="#E57373" />,
      label: 'Factory',
      color: '#E57373',
    },
    {
      type: 'church',
      icon: <Ionicons name="ios-church" size={24} color="#B39DDB" />,
      label: 'Church',
      color: '#B39DDB',
    },
  ];

  return (
    <>
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fabButton} onPress={() => setIsOpen(!isOpen)}>
          <FontAwesome5 name="hammer" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {isOpen && (
        <View style={styles.drawer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
            {buildings.map((b) => (
              <TouchableOpacity
                key={b.type}
                style={[styles.card, { backgroundColor: b.color + '33' }]} // Slight transparency
                onPress={() => handleSelectBuilding(b.type as BuildingType)}
              >
                <View style={styles.iconContainer}>{b.icon}</View>
                <Text style={styles.label}>{b.label}</Text>
                <View style={styles.costContainer}>
                  <FontAwesome5 name="coins" size={12} color="#fff" />
                  <Text style={styles.costText}>{BUILDING_COSTS[b.type as BuildingType]} coins</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default function App() {
  const [currency, setCurrency] = useState(200);

  const handleBuild = (type: BuildingType) => {
    Alert.alert('Build Confirmed', `You chose to build: ${type}`);
    setCurrency((prev) => prev - BUILDING_COSTS[type]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#111', justifyContent: 'center' }}>
      <GameDrawer currency={currency} onSelectBuilding={handleBuild} />
    </View>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 100,
  },
  fabButton: {
    backgroundColor: 'orange',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  drawer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  scrollContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    width: 120,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  iconContainer: {
    marginBottom: 6,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  costText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
});
