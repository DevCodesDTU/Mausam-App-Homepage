import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#8B5CF6',
    position: 'relative',
    overflow: 'hidden',
  },
  ambientOrb1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  ambientOrb2: {
    position: 'absolute',
    top: '35%',
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(216, 180, 254, 0.15)',
  },
  ambientOrb3: {
    position: 'absolute',
    bottom: -40,
    right: -30,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(139, 92, 246, 0.25)',
  },
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
})
