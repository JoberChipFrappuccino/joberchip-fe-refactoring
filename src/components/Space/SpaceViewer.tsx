import { SwitchViewerBlock } from '@/components/SwitchCase/SwitchViewerBlock'
import { DROPDOWN_TRIGGER_ICON_ID } from '@/constants'
import type { BlockType, Space } from '@/models/space'
import { useActiveBlock } from '@/store/activeBlock'
import { useSpaceStore } from '@/store/space'
import { useSpaceModeStore } from '@/store/spaceMode'
import { useEffect, useState } from 'react'
import { Responsive, WidthProvider, type Layout } from 'react-grid-layout'
import { SpaceActionBar } from '../ActionBar/SpaceActionBar'
import styles from './SpaceViewer.module.scss'

const ResponsiveGridLayout = WidthProvider(Responsive)

export function SpaceViewer() {
  const [rowHeight, setRowHeight] = useState(100)
  const { mode } = useSpaceModeStore()
  const { space } = useSpaceStore()
  const [grid, setGridLayout] = useState({
    breakpoints: 'lg',
    layouts: { lg: getBlockLayout(space.blocks, mode) } // , md: layout, sm: layout, xs: layout, xxs: layout
  })

  const [viewModeGrid, setViewModeGrid] = useState({
    breakpoints: 'lg',
    layouts: { lg: getBlockLayout(space.blocks, 'view') } // , md: layout, sm: layout, xs: layout, xxs: layout
  })

  const { activeBlockId, setActiveBlockId } = useActiveBlock()

  useEffect(() => {
    const nextLayout = getBlockLayout(space.blocks, mode)
    setGridLayout(() => ({ breakpoints: 'lg', layouts: { lg: nextLayout } }))
    const nextViewLayout = getBlockLayout(
      space.blocks.filter((item) => !item.visible),
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
        onResizeStart={(_layout, _oldItem, _newItem, _placeholder, _event, element) => {
          element.classList.add('react-gird-resizable-keep')
        }}
        onResizeStop={(_layout, _oldItem, _newItem, _placeholder, _event, element) => {
          element.classList.remove('react-gird-resizable-keep')
        }}
        onLayoutChange={(layout, _layouts) => {
          if (mode === 'view') return
          const changedLayout = sortLayout(layout)
          if (JSON.stringify(sortLayout(changedLayout)) === JSON.stringify(grid.layouts.lg)) return
          // * layout 상태를 변경 합니다.
          setGridLayout(() => ({ breakpoints: 'lg', layouts: { lg: changedLayout } }))
          space.blocks.forEach((block) => {
            const item = changedLayout.find((item) => item.i === block.blockId)
            if (!item) return
            const { x, y, w, h } = item
            block.x = x
            block.y = y
            block.w = w
            block.h = h
          })
          // todo : 변경된 layout을 백엔드에 알려줘야합니다.
          // todo : throttling을 적용해서 n초 마다 1번 요청하도록 합니다. (계속 해서 변경할 경우 중간에 한 번씩 요청을 보내는게 좋을 듯)
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
        {space.blocks.map((block) => {
          if (mode === 'view' && block.visible) return null
          return (
            <button
              type="button"
              className={[styles.item, block.blockId === activeBlockId ? 'activeBlock' : 'inactiveBlock'].join(' ')}
              key={block.blockId}
              id={block.blockId}
            >
              <SwitchViewerBlock mode={mode} type={block.type} block={block} />
            </button>
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

function getBlockLayout(blocks: Space['blocks'], mode: SpaceMode): Layout[] {
  return blocks.map((block) => {
    const { blockId, ...rest } = block
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
