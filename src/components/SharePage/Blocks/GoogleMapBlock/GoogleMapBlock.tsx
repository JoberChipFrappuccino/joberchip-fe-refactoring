import { GoogleMap, Marker } from '@react-google-maps/api'
import classNames from 'classnames'
import { type BlockBaseWithBlockProps } from '@/components/Common/SwitchCases/ViewerBox'
import { useLoadGoogleMap } from '@/hooks/useGoogleMap'
import styles from './GoogleMapBlock.module.scss'

export function GoogleMapBlock({ block, mode }: BlockBaseWithBlockProps<TMap>) {
  const { isLoaded } = useLoadGoogleMap()

  const location = block?.src ? JSON.parse(block.src) : {}

  const center = {
    lat: location?.latitude ?? block?.latitude ?? 37.5642135,
    lng: location?.longitude ?? block?.longitude ?? 127.0016985
  }

  return (
    <div className={styles.container}>
      <div className={classNames(mode === 'EDIT' && 'cover')} />
      {isLoaded && (
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
      )}
      {block.title && (
        <div className={styles.caption}>
          <p>{block.title}</p>
        </div>
      )}
    </div>
  )
}
