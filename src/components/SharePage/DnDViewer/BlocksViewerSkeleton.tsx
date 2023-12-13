import { ViewerBox } from '@/components/Common/SwitchCases/ViewerBox'
import { MainBlockInfo } from '@/components/Common/Ui/MainBlockInfo'
import { BREAKPOINTS } from '@/constants/space'
import { useSharePageQuery } from '@/hooks/queries/useSharePageQuery'
import { getLayoutByMode } from '@/utils/SharePage'
import styles from './BlocksViewer.module.scss'
import { ResponsiveGridLayout } from './ResponsiveGridLayout'

export default function BlocksViewerSkeleton() {
  const { sharePage } = useSharePageQuery()
  const grid = getLayoutByMode(sharePage.children, 'VIEW')

  return (
    <div className={styles.layout}>
      {sharePage.children.length === 0 && <MainBlockInfo />}
      <div className={styles.gridBox}>
        <ResponsiveGridLayout
          layouts={grid.layouts}
          breakpoints={BREAKPOINTS}
          cols={{ lg: 4 }}
          rowHeight={0}
          width={1000}
          margin={[40, 40]}
        >
          {sharePage.children.map((block) => {
            if (!block.visible) return null
            return (
              <div key={block.objectId} className={styles.item} id={block.objectId}>
                <ViewerBox mode={'VIEW'} block={block} />
              </div>
            )
          })}
        </ResponsiveGridLayout>
      </div>
    </div>
  )
}
