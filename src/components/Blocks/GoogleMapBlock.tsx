import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import { type BlockBaseWithBlockProps } from '../SwitchCase/ViewerBox'
import styles from './GoogleMapBlock.module.scss'
interface Props {
  latitude: number
  longitude: number
  lat?: BlockBaseWithBlockProps<TMap>['block']['latitude']
  lng?: BlockBaseWithBlockProps<TMap>['block']['longitude']
}

export function GoogleMapBlock({ block, mode }: BlockBaseWithBlockProps<TMap>) {
  const location: Props = block?.src ? JSON.parse(block.src.replace(/\\/g, '')) : {}
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API ?? '',
    libraries: ['places']
  })
  const [isLoading, setIsLoading] = useState(true) // 로딩 상태 추가
  useEffect(() => {
    if (!isLoaded) {
      setIsLoading(true) // 로딩 중
      return
    }
    setIsLoading(false) // 로딩 완료
    // 여기에서 다른 동작을 수행할 수 있습니다.
  }, [isLoaded])

  const [center] = useState({
    lat: location?.latitude ?? block?.latitude ?? 37.5642135,
    lng: location?.longitude ?? block?.longitude ?? 127.0016985
  })

  return (
    <div className={styles.container}>
      <div className={classNames(mode === 'edit' && 'cover')} />
      {isLoading ? (
        <SkeletonTheme>{/* 로딩 중에만 Skeleton 테마 렌더링 */}</SkeletonTheme>
      ) : (
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
        <caption className={styles.caption}>
          <p>{block.title}</p>
        </caption>
      )}
    </div>
  )
}
