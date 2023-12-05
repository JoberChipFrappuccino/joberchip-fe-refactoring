import { type Libraries, useJsApiLoader } from '@react-google-maps/api'

const libraries: Libraries = ['places']
export const useLoadGoogleMap = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API ?? '',
    libraries
  })

  return { isLoaded, loadError }
}
