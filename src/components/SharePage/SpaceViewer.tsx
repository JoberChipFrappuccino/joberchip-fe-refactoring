import { ViewerBox } from '@/components/SwitchCase/ViewerBox'
import { DROPDOWN_TRIGGER_ICON_ID } from '@/constants'
import { LAYOUT_DEBOUNCE_TIME } from '@/constants/sharePageConstant'
import { useDebounce } from '@/hooks/debounce'
import type { BlockType, SharePage } from '@/models/space'
import { useBlockAction } from '@/store/blockAction'
import { useSharePageStore } from '@/store/sharePage'
import { useEffect, useState } from 'react'
import { Responsive, WidthProvider, type Layout } from 'react-grid-layout'
import { SpaceActionBar } from '../ActionBar/SpaceActionBar'
import { ViewerBlockBase } from '../Blocks/ViewerBlockBase'
import styles from './SpaceViewer.module.scss'

const ResponsiveGridLayout = WidthProvider(Responsive)

export function SpaceViewer() {
  const [rowHeight, setRowHeight] = useState(100)
  const { sharePage, mode } = useSharePageStore()

  const [grid, setGridLayout] = useState({
    breakpoints: 'lg',
    layouts: { lg: getBlockLayout(sharePage.children, mode) } // , md: layout, sm: layout, xs: layout, xxs: layout
  })

  const [viewModeGrid, setViewModeGrid] = useState({
    breakpoints: 'lg',
    layouts: { lg: getBlockLayout(sharePage.children, 'view') } // , md: layout, sm: layout, xs: layout, xxs: layout
  })

  const { activeBlockId, setActiveBlockId } = useBlockAction()

  useDebounce(grid.layouts.lg, LAYOUT_DEBOUNCE_TIME, (nextLayout) => {
    // TODO : 백엔드에 변경된 nextLayout을 줍니당.
    // console.log('layout changed', nextLayout)
  })

  useEffect(() => {
    const nextLayout = getBlockLayout(sharePage.children, mode)
    setGridLayout(() => ({ breakpoints: 'lg', layouts: { lg: nextLayout } }))
    const nextViewLayout = getBlockLayout(
      sharePage.children.filter((item) => !item.visible),
      mode
    )
    setViewModeGrid(() => ({ breakpoints: 'lg', layouts: { lg: nextViewLayout } }))
  }, [mode])

  return (
    <div className={styles.layout}>
      <ResponsiveGridLayout
        layouts={mode === 'edit' ? grid.layouts : viewModeGrid.layouts}
        breakpoints={{
          lg: 1200
        }}
        cols={{ lg: 4 }}
        rowHeight={rowHeight}
        width={1000}
        margin={[18, 18]}
        onWidthChange={(width, _margin, cols) => {
          setRowHeight((width * 0.7) / cols)
        }}
        onLayoutChange={(layout, _layouts) => {
          if (mode === 'view') return
          const changedLayout = sortLayout(layout)
          if (JSON.stringify(sortLayout(changedLayout)) === JSON.stringify(grid.layouts.lg)) return
          // * layout 상태를 변경 합니다.
          setGridLayout(() => ({ breakpoints: 'lg', layouts: { lg: changedLayout } }))
          sharePage.children.forEach((block) => {
            const item = changedLayout.find((item) => item.i === block.objectId)
            if (!item) return
            const { x, y, w, h } = item
            block.x = x
            block.y = y
            block.w = w
            block.h = h
          })
          // todo : 변경된 layout을 백엔드에 알려줘야합니다.
          // todo : Debouncing을 적용해서 n초 마다 1번 요청하도록 합니다. (계속 해서 변경할 경우 중간에 한 번씩 요청을 보내는게 좋을 듯)
        }}
        onDragStart={(_layout, _oldItem, _newItem, _placeholder, event, element) => {
          setActiveBlockId(element.id)
          if (event.type === 'mousedown') return
          const targetElement = event.target as HTMLElement
          if (targetElement.id === DROPDOWN_TRIGGER_ICON_ID) {
            targetElement.closest('button')?.click()
          }
        }}
      >
        {sharePage.children.map((block) => {
          if (mode === 'view' && block.visible) return null
          return (
            <div
              className={[styles.item, block.objectId === activeBlockId ? 'activeBlock' : 'inactiveBlock'].join(' ')}
              key={block.objectId}
              id={block.objectId}
            >
              <ViewerBlockBase block={block}>
                <ViewerBox mode={mode} block={block} />
              </ViewerBlockBase>
            </div>
          )
        })}
      </ResponsiveGridLayout>
      {/* * Deprecated * */}
      {/* <BlockActionBar isActive={activeBlockId !== ''} /> */}
      <SpaceActionBar isActive={activeBlockId === ''} />
    </div>
  )
}

interface BlockItem {
  i: string
  x: number
  y: number
  w: number
  h: number
  type?: BlockType
  MaxH?: number
  MaxW?: number
  isDraggable?: boolean
  isResizable?: boolean
}

function sortLayout(layout: BlockItem[]): Layout[] {
  return layout.sort((a, b) => {
    if (a.y === b.y) {
      return a.x > b.x ? 1 : -1
    }
    return a.y > b.y ? 1 : -1
  })
}

function getBlockLayout(blocks: SharePage['children'], mode: SpaceMode): Layout[] {
  return blocks.map((block) => {
    const { objectId: blockId, ...rest } = block
    return {
      blockId,
      i: blockId,
      isDraggable: mode !== 'view',
      isResizable: mode !== 'view',
      static: false, // todo : view 모드 고정 여부가 정해지지 않았습니다.
      minW: 1,
      maxW: 4,
      minH: 1,
      maxH: 2,
      ...rest
    }
  })
}
