import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#9875F8',
    position: 'relative',
    overflow: 'hidden',
  },
  ambientOrb1: {
    position: 'absolute',
    top: -60,
    right: -50,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  ambientOrb2: {
    position: 'absolute',
    top: '28%',
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(233, 213, 255, 0.35)',
  },
  ambientOrb3: {
    position: 'absolute',
    bottom: -60,
    right: -40,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(124, 58, 237, 0.22)',
  },
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
})
