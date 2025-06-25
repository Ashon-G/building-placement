import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

interface Props {
  model: string;
  onPlaced: () => void;
}

function Grid({ size, onSelect }: { size: number; onSelect: (p: [number, number, number]) => void }) {
  const cells: [number, number, number][] = [];
  for (let x = 0; x < size; x++) {
    for (let z = 0; z < size; z++) {
      cells.push([x - size / 2 + 0.5, 0, z - size / 2 + 0.5]);
    }
  }
  return (
    <group rotation={[-Math.PI / 4, 0, 0]}>
      {cells.map((pos, i) => (
        <mesh key={i} position={pos} onClick={() => onSelect(pos)}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#555" wireframe />
        </mesh>
      ))}
    </group>
  );
}

export default function PlacementGrid({ model, onPlaced }: Props) {
  const { scene } = useGLTF(model);
  const [position, setPosition] = useState<[number, number, number] | null>(null);

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Grid
          size={5}
          onSelect={(p) => {
            setPosition([p[0], 0.5, p[2]]);
            onPlaced();
          }}
        />
        {position && <primitive object={scene} position={position} scale={0.5} />}
        <OrbitControls />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});

