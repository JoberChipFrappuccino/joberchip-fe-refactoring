import type { AddGoogleMapBlockBody } from '@/apis/blocks/mapBlock'
import { useQueryClient } from '@tanstack/react-query'
import { MAP } from '@/constants/block'
import { addMapBlockMutate } from '@/queries/mutates/mapBlockMutate'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { useMapStore } from '@/store/map'
import { getNextYOfLastBlock } from '@/utils/SharePage'
import { toast } from '@/utils/toast'
import { useLoadGoogleMap } from '@/hooks/useGoogleMap'
import { MapBlockForm } from './MapBlockForm'
import styles from './MapBlockForm.module.scss'

export function AddMapBlock() {
  const { isLoaded } = useLoadGoogleMap()
  const { address, center } = useMapStore()
  const { sharePage, pageId } = useSharePageQuery()
  const { setOpenDrawer } = useBlockActionStore()
  const queryClient = useQueryClient()
  const addMutation = addMapBlockMutate(queryClient)

  const handleSubmit = () => {
    const createBody: AddGoogleMapBlockBody = {
      x: 0,
      y: getNextYOfLastBlock(sharePage.children),
      w: 1,
      h: 2,
      type: MAP,
      address,
      latitude: String(center.latitude),
      longitude: String(center.longitude)
    }
    addMutation.mutate({ pageId, newBlock: createBody })
    toast('지도가 추가되었습니다.', 'success')
    setOpenDrawer(false)
  }

  return <div className={styles.container}>{isLoaded && <MapBlockForm onSubmit={handleSubmit} />}</div>
}
