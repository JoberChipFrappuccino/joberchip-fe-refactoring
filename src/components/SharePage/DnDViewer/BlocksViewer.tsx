import classNames from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { type ResponsiveProps } from 'react-grid-layout'
import { ViewerBox } from '@/components/Common/SwitchCases/ViewerBox'
import { MainBlockInfo } from '@/components/Common/Ui/MainBlockInfo'
import { SpaceActionBar } from '@/components/SharePage/ActionBar/SpaceActionBar'
import { ViewerBlockBase } from '@/components/SharePage/DnDViewer/ViewerBlockBase'
import { DROPDOWN_TRIGGER_ICON_ID } from '@/constants'
import { BREAKPOINTS, LAYOUT_DEBOUNCE_TIME } from '@/constants/space'
import { useSharePageQuery } from '@/hooks/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { useSharePageModeStore } from '@/store/sharePage'
import { calculateRatio, convertLayoutToParam, getLayoutByMode, sortLayout } from '@/utils/SharePage'
import { useDebounce } from '@/hooks/useDebounce'
import styles from './BlocksViewer.module.scss'
import { ResponsiveGridLayout } from './ResponsiveGridLayout'

export const BlocksViewer = () => {
  const { mode } = useSharePageModeStore()
  const { sharePage, pageId, fetchLayout } = useSharePageQuery()
  const { activeBlockId, setActiveBlockId } = useBlockActionStore()
  const [editModeGrid, setEditModeGrid] = useState(getLayoutByMode(sharePage.children, 'EDIT'))
  const [viewModeGrid, setViewModeGrid] = useState(getLayoutByMode(sharePage.children, 'VIEW'))
  const [rowHeight, setRowHeight] = useState(0)
  const [margin, setMargin] = useState(0)

  const nextLayout = useDebounce(editModeGrid.layouts.lg, LAYOUT_DEBOUNCE_TIME)

  useEffect(() => {
    if (mode === 'VIEW') return
    fetchLayout(pageId, convertLayoutToParam(sharePage.children, nextLayout))
  }, [nextLayout])

  useEffect(() => {
    setEditModeGrid(() => getLayoutByMode(sharePage.children, 'EDIT'))
    const visibleChildren = sharePage.children.filter((item) => item.visible)
    setViewModeGrid(() => getLayoutByMode(visibleChildren, 'VIEW'))
  }, [mode, pageId])

  // * "EDIT" || "VIEW" 모드가 변경되면 레이아웃을 다시 그립니다.
  const handleWidthChange: ResponsiveProps['onWidthChange'] = //
    useCallback<NonNullable<ResponsiveProps['onWidthChange']>>(
      (width, _margin, cols, _padding) => {
        if (width > 768) {
          setMargin(40)
          setRowHeight(calculateRatio(width, cols, 0.7))
        } else {
          setMargin(18)
          setRowHeight(calculateRatio(width, cols, 1))
        }
      },
      [rowHeight, margin]
    )

  const handleChangeLayout: ResponsiveProps['onLayoutChange'] = //
    (layout, _layouts) => {
      if (mode === 'VIEW') return
      const changedLayout = sortLayout(layout)
      if (JSON.stringify(sortLayout(changedLayout)) === JSON.stringify(editModeGrid.layouts.lg)) {
        return
      }
      setEditModeGrid(() => ({ breakpoints: 'lg', layouts: { lg: changedLayout } }))
    }

  const handleOnDragStart: ResponsiveProps['onDragStart'] = (_layout, _oldItem, _newItem, _placeholder, e, el) => {
    setActiveBlockId(el.id)
    if (e.type === 'mousedown') return
    const targetElement = e.target as HTMLElement
    if (targetElement.id === DROPDOWN_TRIGGER_ICON_ID) {
      // 컨텍스트가 비워졌을 떄 클릭 이벤트를 실행합니다.
      setTimeout(() => targetElement.closest('button')?.click())
    }
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
          onWidthChange={handleWidthChange}
          onLayoutChange={handleChangeLayout}
          onDragStart={handleOnDragStart}
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
      {mode === 'EDIT' && <SpaceActionBar />}
    </div>
  )
}
