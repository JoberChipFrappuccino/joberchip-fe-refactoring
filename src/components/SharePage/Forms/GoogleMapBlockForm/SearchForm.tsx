import { Autocomplete } from '@react-google-maps/api'
import { type Ref, forwardRef } from 'react'
import { useMapStore } from '@/store/map'
import styles from './GoogleMapBlockForm.module.scss'

// eslint-disable-next-line react/display-name
export const SearchForm = forwardRef((_props, ref: Ref<HTMLInputElement>) => {
  const { setAddress, autoComplete, setAutoComplete, setCenter } = useMapStore()

  const onAutocompletePlaceChanged = () => {
    if (autoComplete === null) return
    const place = autoComplete?.getPlace()
    if (!place?.geometry?.location) return
    setCenter({
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng()
    })
    setAddress(place.formatted_address ?? '')
  }

  return (
    <Autocomplete
      onLoad={setAutoComplete}
      onPlaceChanged={onAutocompletePlaceChanged}
      options={{
        componentRestrictions: { country: 'KR' }
      }}
    >
      <div className={styles.searchBox}>
        <input type="search" ref={ref} className={styles.searcInput} placeholder="장소를 입력하세요" />
      </div>
    </Autocomplete>
  )
})
