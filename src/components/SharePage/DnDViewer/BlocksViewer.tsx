import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { fetchLayout } from '@/apis/space'
import { ViewerBox } from '@/components/Common/SwitchCases/ViewerBox'
import { MainBlockInfo } from '@/components/Common/Ui/MainBlockInfo'
import { SpaceActionBar } from '@/components/SharePage/ActionBar/SpaceActionBar'
import { ViewerBlockBase } from '@/components/SharePage/DnDViewer/ViewerBlockBase'
import { DROPDOWN_TRIGGER_ICON_ID } from '@/constants'
import { BREAKPOINTS, LAYOUT_DEBOUNCE_TIME } from '@/constants/sharePageConstant'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { useSharePageModeStore } from '@/store/sharePage'
import { to, toast } from '@/utils'
import { calculateRatio, convertLayoutToParam, getLayoutByMode, sortLayout } from '@/utils/SharePage'
import { useDebounce } from '@/hooks/useDebounce'
import '@/styles/reactGridLayout.scss'
import styles from './BlocksViewer.module.scss'

const ResponsiveGridLayout = WidthProvider(Responsive)

export const BlocksViewer = () => {
  const { mode } = useSharePageModeStore()
  const { sharePage, pageId } = useSharePageQuery()
  const { activeBlockId, setActiveBlockId } = useBlockActionStore()

  const [editModeGrid, setEditModeGrid] = useState(getLayoutByMode(sharePage.children, 'EDIT'))
  const [viewModeGrid, setViewModeGrid] = useState(getLayoutByMode(sharePage.children, 'VIEW'))
  const [rowHeight, setRowHeight] = useState(100)
  const [margin, setMargin] = useState(40)

  // * 레이아웃이 변경되면 서버에게 변경된 레이아웃을 알립니다.
  useDebounce(editModeGrid.layouts.lg, LAYOUT_DEBOUNCE_TIME, (nextLayout) => {
    if (mode === 'VIEW') return
    to(fetchLayout(pageId ?? '', convertLayoutToParam(sharePage.children, nextLayout))).then((res) => {
      toast(res.message, res.status, { autoClose: 500 })
    })
  })

  // * "EDIT" || "VIEW" 모드가 변경되면 레이아웃을 다시 그립니다.
  useEffect(() => {
    setEditModeGrid(() => getLayoutByMode(sharePage.children, 'EDIT'))
    const visibleChildren = sharePage.children.filter((item) => item.visible)
    setViewModeGrid(() => getLayoutByMode(visibleChildren, 'VIEW'))
  }, [mode])

  const handleWidthChange = (width: number, cols: number) => {
    if (width > 768) {
      setMargin(40)
      setRowHeight(calculateRatio(width, cols, 0.7))
      return
    }
    setMargin(18)
    setRowHeight(calculateRatio(width, cols, 1))
  }

  return (
    <div className={styles.layout}>
      {sharePage.children.length === 0 && <MainBlockInfo />}
      <div className={styles.gridBox}>
        <ResponsiveGridLayout
          layouts={mode === 'EDIT' ? editModeGrid.layouts : viewModeGrid.layouts}
          breakpoints={BREAKPOINTS}
          cols={{ lg: 4 }}
          rowHeight={rowHeight}
          width={1000}
          margin={[margin, margin]}
          onWidthChange={(width, _margin, cols) => handleWidthChange(width, cols)}
          onLayoutChange={(layout, _layouts) => {
            if (mode === 'VIEW') return
            const changedLayout = sortLayout(layout)
            if (JSON.stringify(sortLayout(changedLayout)) === JSON.stringify(editModeGrid.layouts.lg)) return
            setEditModeGrid(() => ({ breakpoints: 'lg', layouts: { lg: changedLayout } }))
          }}
          onDragStart={(_layout, _oldItem, _newItem, _placeholder, event, element) => {
            setActiveBlockId(element.id)
            if (event.type === 'mousedown') return
            const targetElement = event.target as HTMLElement
            if (targetElement.id === DROPDOWN_TRIGGER_ICON_ID) targetElement.closest('button')?.click()
          }}
        >
          {sharePage.children.map((block) => {
            if (mode === 'VIEW' && !block.visible) return null
            return (
              <div
                key={block.objectId}
                className={classNames(styles.item, block.objectId === activeBlockId && 'activeBlock')}
                id={block.objectId}
              >
                <ViewerBlockBase block={block}>
                  <ViewerBox mode={mode} block={block} />
                </ViewerBlockBase>
              </div>
            )
          })}
        </ResponsiveGridLayout>
      </div>
      {mode === 'EDIT' && <SpaceActionBar isActive={activeBlockId === ''} />}
    </div>
  )
}
