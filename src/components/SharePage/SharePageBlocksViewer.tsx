import { ViewerBox } from '@/components/SwitchCase/ViewerBox'
import { DROPDOWN_TRIGGER_ICON_ID } from '@/constants'
import { BREAKPOINTS, LAYOUT_DEBOUNCE_TIME } from '@/constants/sharePageConstant'
import { useDebounce } from '@/hooks/debounce'
import type { BlockType, SharePage } from '@/models/space'
import { useBlockAction } from '@/store/blockAction'
import { useSharePageStore } from '@/store/sharePage'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Responsive, WidthProvider, type Layout } from 'react-grid-layout'
import { SpaceActionBar } from '../ActionBar/SpaceActionBar'
import { ViewerBlockBase } from '../Blocks/ViewerBlockBase'
import MainBlockInfo from '../Ui/MainBlockInfo'
import styles from './SharePageBlocksViewer.module.scss'

const ResponsiveGridLayout = WidthProvider(Responsive)

export function BlocksViewer() {
  const [rowHeight, setRowHeight] = useState(100)
  const { sharePage, setSharePage, mode } = useSharePageStore()
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
      {sharePage.children.length === 0 && <MainBlockInfo />}
      <ResponsiveGridLayout
        layouts={mode === 'edit' ? grid.layouts : viewModeGrid.layouts}
        breakpoints={BREAKPOINTS}
        cols={{ lg: 4 }}
        rowHeight={rowHeight}
        width={1000}
        margin={[18, 18]}
        onWidthChange={(width, _margin, cols) => setRowHeight(getBlockHeightRatio(width, cols))}
        onLayoutChange={(layout, _layouts) => {
          if (mode === 'view') return
          const changedLayout = sortLayout(layout)
          if (JSON.stringify(sortLayout(changedLayout)) === JSON.stringify(grid.layouts.lg)) return
          setSharePage({ ...sharePage, children: updateBlockPosition(changedLayout, sharePage.children) })
          setGridLayout(() => ({ breakpoints: 'lg', layouts: { lg: changedLayout } }))
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
              className={classNames(styles.item, block.objectId === activeBlockId && 'activeBlock')}
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

function getBlockLayout(blocks: SharePage['children'], mode: SharePageMode): Layout[] {
  return blocks.map((block) => {
    const { objectId: blockId, ...rest } = block
    return {
      blockId,
      i: blockId,
      isDraggable: mode !== 'view',
      isResizable: mode !== 'view',
      static: false, // ?? : 고정 여부 확인이 필요합니다.
      minW: 1,
      maxW: 4,
      minH: 1,
      maxH: 2,
      ...rest
    }
  })
}

function getBlockHeightRatio(width: number, cols: number) {
  return (width * 0.7) / cols
}

/**
 * @description 레이아웃 변경시 블록의 위치를 업데이트합니다.
 * @description 참조값만 바꾸기 때문에 리렌더링이 발생하지 않습니다.
 */
function updateBlockPosition(changedLayout: Layout[], blocks: SharePage['children']) {
  changedLayout.forEach((item) => {
    const block = blocks.find((block) => block.objectId === item.i)
    if (!block) return block
    block.x = item.x
    block.y = item.y
    block.w = item.w
    block.h = item.h
    return block
  })
  return blocks
}