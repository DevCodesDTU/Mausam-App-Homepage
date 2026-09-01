import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    padding: 20,
    shadowColor: '#4C1D95',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  subtle: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowOpacity: 0.08,
  },
  solid: {
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(255, 255, 255, 0.95)',
    shadowOpacity: 0.18,
  },
})

