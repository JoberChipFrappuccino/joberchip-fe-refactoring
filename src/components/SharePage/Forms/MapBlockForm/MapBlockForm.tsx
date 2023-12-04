import type { BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { type FormEvent, useEffect } from 'react'
import FormButton from '@/components/Common/Ui/Button'
import { useBlockActionStore } from '@/store/blockAction'
import { useMapStore } from '@/store/map'
import { getCenter, needToConvertAbbr } from '@/utils/SharePage'
import AddressForm from './AddressForm'
import styles from './MapBlockForm.module.scss'
import { SearchForm } from './SearchForm'

type MapBlockFormProps = BlockBaseWithBlockFormProps<TMap> & {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}
export function MapBlockForm({ block, onSubmit }: MapBlockFormProps) {
  const { setCenter, center, setAddress, address } = useMapStore()
  const { drawerMode } = useBlockActionStore()

  useEffect(() => {
    setCenter(getCenter(block))
    setAddress(block?.title ?? '')
  }, [block?.src, block?.title])

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(e)
  }

  return (
    <form className={styles.formBox} onSubmit={submitHandler}>
      <div className={styles.inner}>
        <SearchForm />
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
        <AddressForm />
      </div>
      <FormButton title={drawerMode === 'CREATE' ? '지도 추가하기' : '지도 수정하기'} event={!address} />
    </form>
  )
}
