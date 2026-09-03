import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(4, 7, 13, 0.82)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '86%',
    backgroundColor: '#0E1424',
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.5,
    shadowRadius: 28,
    elevation: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIcon: {
    fontSize: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: -0.3,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#161F36',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#94A3B8',
  },

  // One-line Search Bar
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#13192B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 14,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#F8FAFC',
    fontWeight: '600',
    paddingVertical: 0,
  },
  clearBtn: {
    padding: 4,
  },
  clearBtnText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '700',
  },

  // Scroll Container
  locationsScroll: {
    maxHeight: 330,
  },

  // Section Headers
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
    marginTop: 6,
  },

  // Top Box: Current GPS Location Card
  currentGpsBox: {
    backgroundColor: '#131B30',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    padding: 14,
    marginBottom: 14,
  },
  currentGpsBoxActive: {
    backgroundColor: '#17233F',
    borderColor: '#38BDF8',
  },
  currentGpsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  gpsBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  gpsIcon: {
    fontSize: 15,
  },
  gpsLabel: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#38BDF8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  livePill: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  livePillText: {
    fontSize: 9.5,
    fontWeight: '900',
    color: '#10B981',
  },
  gpsMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locTextCol: {
    flex: 1,
    marginRight: 10,
  },
  gpsLocName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  gpsLocRegion: {
    fontSize: 11.5,
    color: '#94A3B8',
    marginTop: 2,
  },
  selectGpsBtn: {
    backgroundColor: '#38BDF8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  selectGpsBtnText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#080B11',
  },
  activeTag: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  activeTagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#38BDF8',
  },

  // Separate Location Boxes (Saved Locations)
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111728',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  locationBoxActive: {
    backgroundColor: '#17233F',
    borderColor: '#38BDF8',
  },
  locationBoxLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  pinIcon: {
    fontSize: 16,
  },
  locName: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  locRegion: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  locActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deleteBtn: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.10)',
  },
  deleteBtnText: {
    fontSize: 12,
  },

  // Empty State for Saved Locations
  emptyBox: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#111728',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 17,
  },

  // Search Results
  searchResultsContainer: {
    marginBottom: 10,
  },
  searchResultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#131B30',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.2)',
    marginBottom: 8,
  },
  searchResultLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  searchResultActions: {
    flexDirection: 'row',
    gap: 6,
  },
  addBookmarkBtn: {
    backgroundColor: '#38BDF8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  addBookmarkBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#080B11',
  },

  // Bottom "+ Add Location" Button
  addLocationBottomBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  addLocationBottomIcon: {
    fontSize: 14,
    color: '#38BDF8',
    fontWeight: '800',
  },
  addLocationBottomText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F8FAFC',
  },
})
