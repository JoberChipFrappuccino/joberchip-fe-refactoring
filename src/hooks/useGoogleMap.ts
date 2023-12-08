import { useJsApiLoader } from '@react-google-maps/api'
import { libraries } from '@/constants/block'

export const useLoadGoogleMap = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API ?? '',
    libraries
  })

  return { isLoaded, loadError }
}
