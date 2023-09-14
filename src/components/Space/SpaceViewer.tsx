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
  const { space, updateBlockLayout } = useSpaceStore()
  const [state, setState] = useState({
    breakpoints: 'lg',
    layouts: { lg: getBlockLayout(space.blocks, mode) } // , md: layout, sm: layout, xs: layout, xxs: layout
  })
  const { activeBlockId, setActiveBlockId } = useActiveBlock()

  useEffect(() => {
    const nextLayout = getBlockLayout(space.blocks, mode)
    setState(() => ({ breakpoints: 'lg', layouts: { lg: nextLayout } }))
  }, [mode])

  return (
    <div className={styles.layout}>
      <ResponsiveGridLayout
        layouts={state.layouts}
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
          const changedLayout = sortLayout(layout)
          if (JSON.stringify(sortLayout(changedLayout)) !== JSON.stringify(state.layouts.lg)) {
            // * layout 상태를 변경 합니다.
            setState(() => ({ breakpoints: 'lg', layouts: { lg: changedLayout } }))
            space.blocks.forEach((block) => {
              const item = changedLayout.find((item) => item.i === block.blockId)
              if (!item) return
              const { x, y, w, h } = item
              block.x = x
              block.y = y
              block.w = w
              block.h = h
            })
            // * 변경된 layout을 block에 반영 합니다.
            updateBlockLayout([...space.blocks])
          }
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
      static: mode === 'view',
      minW: 1,
      maxW: 4,
      minH: 1,
      maxH: 2,
      ...rest
    }
  })
}
