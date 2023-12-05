import type { BlockBaseWithBlockProps } from '@/components/Common/SwitchCases/ViewerBox'
import { GoogleMap, Marker } from '@react-google-maps/api'
import classNames from 'classnames'
import { getCenter, needToConvertAbbr } from '@/utils/SharePage'
import { useLoadGoogleMap } from '@/hooks/useGoogleMap'
import styles from './GoogleMapBlock.module.scss'

export function GoogleMapBlock({ block, mode }: BlockBaseWithBlockProps<TMap>) {
  const { isLoaded } = useLoadGoogleMap()
  const center = getCenter(block)

  return (
    <div className={styles.container}>
      <div className={classNames(mode === 'EDIT' && 'cover')} />
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={needToConvertAbbr(center)}
          zoom={15}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
        >
          <Marker position={needToConvertAbbr(center)} />
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
