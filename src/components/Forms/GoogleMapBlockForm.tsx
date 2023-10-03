import { Autocomplete, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import { type BlockBaseWithBlockFormProps } from '../SwitchCase/DrawerEditForm'
import styles from './ImageBlockForm.module.scss'

const { Search } = Input

export function GoogleMapBlockForm({ block }: BlockBaseWithBlockFormProps<TMap>) {
  const apikey = process.env.REACT_APP_GOOGLE_MAPS_API
  // console.log(process.env.REACT_APP_GOOGLE_MAPS_API)
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apikey ?? '',
    libraries: ['places']
  })

  const [center, setCenter] = useState({
    lat: 37.5642135,
    lng: 127.0016985
  })

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
  const [isLoading, setIsLoading] = useState(true) // 로딩 상태 추가

  const onAutocompleteLoad = (autocompleteParam: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteParam)
  }

  const onAutocompletePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace()
      if (place.geometry?.location) {
        const newLat = place.geometry.location.lat()
        const newLng = place.geometry.location.lng()
        // console.log(place)
        // console.log(newLat)
        // console.log(newLng)
        setCenter({
          lat: newLat,
          lng: newLng
        })
      }
    }
  }

  useEffect(() => {
    if (!isLoaded) {
      setIsLoading(true) // 로딩 중
      return
    }
    setIsLoading(false) // 로딩 완료
    // 여기에서 다른 동작을 수행할 수 있습니다.
  }, [isLoaded])

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (autocomplete !== null) {
      e.preventDefault()
      autocomplete.setFields(['geometry'])
      autocomplete.getPlace()
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.formBox}>
        <div className={styles.forms}>
          {isLoading ? (
            <SkeletonTheme>{/* 로딩 중에만 Skeleton 테마 렌더링 */}</SkeletonTheme>
          ) : (
            <>
              <Autocomplete
                onLoad={onAutocompleteLoad}
                onPlaceChanged={onAutocompletePlaceChanged}
                options={{
                  componentRestrictions: { country: 'KR' }
                }}
              >
                <Search
                  placeholder="장소를 입력하세요"
                  loading={isLoading}
                  defaultValue=""
                  onPressEnter={(e) => {
                    handleSearchEnter(e)
                  }}
                />
              </Autocomplete>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={center}
                zoom={15}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false
                }}
              >
                <Marker position={center} />
              </GoogleMap>
            </>
          )}
        </div>
      </form>
    </div>
  )
}
