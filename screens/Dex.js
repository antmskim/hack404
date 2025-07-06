import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dex = ({ navigation }) => {
  const [fishDex, setFishDex] = useState([]);

  useEffect(() => {
    const loadFishDex = async () => {
      try {
        const storedFish = await AsyncStorage.getItem('fishDex');
        if (storedFish) {
          setFishDex(JSON.parse(storedFish));
        }
      } catch (e) {
        console.error('Failed to load fish dex', e);
      }
    };

    loadFishDex();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={globalStyles.pageContainer}>
        <Logo />

        <Text style={globalStyles.h2}>
          My FishDex
        </Text>

        <View style={[globalStyles.container, { gap : spacing.lg }]}>
          {fishDex.length > 0 ? (
            fishDex.map((fish, index) => (
              <View key={index} style={styles.fishEntryContainer}>
                <Image source={{ uri: fish.imageUri }} style={styles.fishImage} />
                <Text style={styles.fishReasonText}>{fish.reason}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noFishText}>No fish added to your FishDex yet!</Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.navContainer}>
        <NavBar navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999999, // Ensure the nav bar is above other content
  },
  fishEntryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    backgroundColor: colors.neutral.lightGrey,
    borderRadius: 8,
    padding: spacing.sm,
  },
  fishImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  fishReasonText: {
    flex: 1,
    ...typography.body,
    color: colors.text,
  },
  noFishText: {
    ...typography.body,
    textAlign: 'center',
    marginTop: spacing.xl,
    color: colors.text,
  },
  // ... other styles
  cardRow: {
    flexDirection: 'row',
    overflow: 'visible',
    gap: spacing.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: spacing.md,
  },
  hugContainer: {
    alignSelf: 'flex-start',
    flexShrink: 1,
    flexGrow: 0,
    gap: spacing.md,
  },
  horizontalContainer: {
    flex: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
  },
});

export default Dex;
