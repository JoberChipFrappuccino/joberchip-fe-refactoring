import type { EditGoogleMapBlockBody } from '@/apis/blocks/mapBlock'
import type { BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import { useEditMapBlockMutation } from '@/queries/mutates/mapBlockMutation'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { useMapStore } from '@/store/map'
import { toast } from '@/utils/toast'
import { useLoadGoogleMap } from '@/hooks/useGoogleMap'
import { MapBlockForm } from './MapBlockForm'
import styles from './MapBlockForm.module.scss'

export function EditMapBlock({ block }: BlockBaseWithBlockFormProps<TMap>) {
  const { isLoaded } = useLoadGoogleMap()
  const { address, center } = useMapStore()
  const { pageId } = useSharePageQuery()
  const { setOpenDrawer } = useBlockActionStore()
  const editMapMutation = useEditMapBlockMutation()

  const handleSubmit = () => {
    const editBlock: EditGoogleMapBlockBody = {
      objectId: block?.objectId ?? '',
      address,
      latitude: String(center.latitude),
      longitude: String(center.longitude)
    }
    editMapMutation.mutate({ pageId, editBlock })
    toast('지도가 수정되었습니다.', 'success')
    setOpenDrawer(false)
  }

  return <div className={styles.container}>{isLoaded && <MapBlockForm block={block} onSubmit={handleSubmit} />}</div>
}
