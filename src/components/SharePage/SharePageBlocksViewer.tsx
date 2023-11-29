import type { BlockType, SharePage } from '@/models/space'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { Responsive, WidthProvider, type Layout } from 'react-grid-layout'
import { fetchBlockPosition, type FetchBlockPositionBlocksParam } from '@/apis/space'
import { ViewerBox } from '@/components/Common/SwitchCases/ViewerBox'
import { DROPDOWN_TRIGGER_ICON_ID } from '@/constants'
import { BREAKPOINTS, LAYOUT_DEBOUNCE_TIME } from '@/constants/sharePageConstant'
import { useBlockAction } from '@/store/blockAction'
import { useSharePageStore } from '@/store/sharePage'
import { to, toast } from '@/utils'
import { useDebounce } from '@/hooks/debounce'
import MainBlockInfo from '../Common/Ui/MainBlockInfo'
import { SpaceActionBar } from './ActionBar/SpaceActionBar'
import { ViewerBlockBase } from './Blocks/ViewerBlockBase'
import styles from './SharePageBlocksViewer.module.scss'
import '@/styles/reactGridLayout.scss'

const ResponsiveGridLayout = WidthProvider(Responsive)

export function BlocksViewer() {
  const [rowHeight, setRowHeight] = useState(100)
  const [margin, setMargin] = useState(40)
  // TODO grid hooks로 뺴기
  const { sharePage, setSharePage, mode } = useSharePageStore()
  const [grid, setGridLayout] = useState({
    breakpoints: 'lg',
    layouts: { lg: getBlockLayout(sharePage.children, 'edit') }
  })
  const [viewModeGrid, setViewModeGrid] = useState({
    breakpoints: 'lg',
    layouts: { lg: getBlockLayout(sharePage.children, 'view') }
  })
  const { activeBlockId, setActiveBlockId } = useBlockAction()

  useDebounce(grid.layouts.lg, LAYOUT_DEBOUNCE_TIME, (nextLayout) => {
    if (mode === 'view') return
    // TODO : ComponentDidMount시 useDebounce hook의 콜백이 호출됩니다. 이를 방지하려면 object.id, w,h,x,y를 비교하는 로직을 추가하여 해결합니다.
    to(fetchBlockPosition(sharePage.pageId, convertLayoutToBlockParams(sharePage.children, nextLayout))).then((res) => {
      toast(res.message, res.status, { autoClose: 500 })
    })
  })

  // * "edit" 또는 "view" 모드가 변경되면 이에 맞는 레이아웃을 다시 그립니다.
  useEffect(() => {
    const nextLayout = getBlockLayout(sharePage.children, 'edit')
    setGridLayout(() => ({ breakpoints: 'lg', layouts: { lg: nextLayout } }))
    const nextViewLayout = getBlockLayout(
      sharePage.children.filter((item) => item.visible),
      mode
    )
    setViewModeGrid(() => ({ breakpoints: 'lg', layouts: { lg: nextViewLayout } }))
  }, [mode])

  // TODO : DND 컴포넌트 분리
  return (
    <div className={styles.layout}>
      {sharePage.children.length === 0 && <MainBlockInfo />}
      <div className={styles.gridBox}>
        <ResponsiveGridLayout
          layouts={mode === 'edit' ? grid.layouts : viewModeGrid.layouts}
          breakpoints={BREAKPOINTS}
          cols={{ lg: 4 }}
          rowHeight={rowHeight}
          width={1000}
          margin={[margin, margin]}
          onWidthChange={(width, _margin, cols) => {
            if (width > 768) {
              setMargin(40)
              setRowHeight(getBlockHeightRatio(width, cols, 0.7))
            } else {
              setMargin(18)
              setRowHeight(getBlockHeightRatio(width, cols, 1))
            }
          }}
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
            if (targetElement.id === DROPDOWN_TRIGGER_ICON_ID) targetElement.closest('button')?.click()
          }}
        >
          {sharePage.children.map((block) => {
            if (mode === 'view' && !block.visible) return null
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
      </div>
      {/* * Deprecated * */}
      {/* <BlockActionBar isActive={activeBlockId !== ''} /> */}
      {mode === 'edit' && <SpaceActionBar isActive={activeBlockId === ''} />}
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
    const { objectId, ...rest } = block
    return {
      objectId,
      i: objectId,
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

function getBlockHeightRatio(width: number, cols: number, radio: number) {
  return (width * radio) / cols
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

function convertLayoutToBlockParams(
  children: SharePage['children'],
  layout: Layout[]
): FetchBlockPositionBlocksParam[] {
  return layout.map((item) => {
    const type = children.find((child) => child.objectId === item.i)?.type
    if (typeof type === 'undefined') {
      throw new Error('type is undefined')
    }
    const { i, x, y, w, h } = item
    return {
      blockId: i,
      blockType: type,
      x,
      y,
      w,
      h
    }
  })
}
