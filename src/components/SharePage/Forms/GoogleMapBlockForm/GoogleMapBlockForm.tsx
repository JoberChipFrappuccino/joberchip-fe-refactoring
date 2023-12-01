import type { BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import type { EmbedGoogleMapBlock } from '@/models/space'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useQueryClient } from '@tanstack/react-query'
import { type FormEvent, useRef, useEffect } from 'react'
import FormButton from '@/components/Common/Ui/Button'
import { MAP } from '@/constants/blockTypeConstant'
import { addBlockMutation, editBlockMutation } from '@/queries/mutates/sharePageMutate'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { useMapStore, type Center } from '@/store/map'
import { getNextYOfLastBlock } from '@/utils'
import { toast } from '@/utils/toast'
import { useLoadGoogleMap } from '@/hooks/useGoogleMap'
import AddressForm from './AddressForm'
import styles from './GoogleMapBlockForm.module.scss'
import { SearchForm } from './SearchForm'

export function GoogleMapBlockForm({ block }: BlockBaseWithBlockFormProps<TMap>) {
  const inputRef = useRef(null)
  const { isLoaded } = useLoadGoogleMap()
  const { address, setCenter, center, setAddress } = useMapStore()
  const { sharePage, pageId } = useSharePageQuery()
  const { setOpenDrawer, drawerMode } = useBlockActionStore()
  const queryClient = useQueryClient()
  const addMutation = addBlockMutation(queryClient)
  const editMutation = editBlockMutation(queryClient)

  const blockId = block?.objectId ?? ''

  useEffect(() => {
    setCenter(getCenter(block))
    setAddress(block?.title ?? '')
  }, [block?.src, block?.title])

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (drawerMode === 'CREATE') {
      const newBlock = {
        x: 0,
        y: getNextYOfLastBlock(sharePage.children),
        w: 1,
        h: 2,
        address,
        type: MAP,
        visible: true,
        ...center
      }
      addMutation.mutate({ pageId, newBlock })
      toast('지도가 추가되었습니다.', 'success')
    } else if (drawerMode === 'EDIT') {
      const body = { ...center, address }
      editMutation.mutate({ pageId, blockId, body })
      toast('지도가 수정되었습니다.', 'success')
    }
    setOpenDrawer(false)
  }

  return (
    <div className={styles.container}>
      <form className={styles.formBox} onSubmit={submitHandler}>
        {isLoaded && (
          <>
            <SearchForm ref={inputRef} />
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
          </>
        )}
        <AddressForm />
        <FormButton title={drawerMode === 'CREATE' ? '지도 추가하기' : '지도 수정하기'} event={false} />
      </form>
    </div>
  )
}

function getCenter(block?: EmbedGoogleMapBlock) {
  if (!block?.src) {
    return {
      latitude: 37.5642135,
      longitude: 127.0016985
    }
  }
  const centerNoAddress: Omit<Center, 'address'> = JSON.parse(block.src)
  return centerNoAddress
}

function needToConvertAbbr(center: Center) {
  return {
    lat: center.latitude,
    lng: center.longitude
  }
}
