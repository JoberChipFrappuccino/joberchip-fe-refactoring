import { create } from 'zustand'

export interface Center {
  latitude: number
  longitude: number
}

interface SetCenterOptions {
  latitude: number
  longitude: number
}
interface MapState {
  center: Center
  address: string
  autoComplete: google.maps.places.Autocomplete | null
  setCenter: (options: SetCenterOptions) => void
  setAutoComplete: (autoComplete: google.maps.places.Autocomplete) => void
  setAddress: (address: string) => void
}

export const useMapStore = create<MapState>((set) => {
  return {
    center: {
      latitude: 25.033,
      longitude: 121.5654
    },
    address: '',
    setAddress: (address: string) => {
      set({ address })
    },
    autoComplete: null,
    setCenter: ({ latitude, longitude }: SetCenterOptions) => {
      set({
        center: {
          latitude,
          longitude
        }
      })
    },
    setAutoComplete: (autoComplete) => {
      set({ autoComplete })
    }
  }
})
