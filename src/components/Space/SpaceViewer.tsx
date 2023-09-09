import type { Space, BlockType } from '@/models/space'
import { SwithViewerBlock } from '@/components/Space/SwithViewerBlock'
import { Layout, Responsive, WidthProvider } from 'react-grid-layout'
import { useEffect, useState } from 'react'
import { useSpaceModeStore } from '@/store/spaceMode'
import { useSpaceStore } from '@/store/space'

const ResponsiveGridLayout = WidthProvider(Responsive)

export function SpaceViewer() {
  const [rowHeight, setRowHeight] = useState(100)
  const { mode } = useSpaceModeStore()
  const { space } = useSpaceStore()
  const [state, setState] = useState({
    breakpoints: 'lg',
    layouts: { lg: getBlockLayout(space.blocks, mode) } // , md: layout, sm: layout, xs: layout, xxs: layout
  })

  useEffect(() => {
    const nextLayout = getBlockLayout(space.blocks, mode)
    setState(() => ({ breakpoints: 'lg', layouts: { lg: nextLayout } }))
  }, [mode])

  return (
    <>
      <h1 className="text-3xl">{space.title}</h1>
      <p className="text-xl text-slate-500">{space.description}</p>
      <div className="max-w-[750px] mx-auto">
        <ResponsiveGridLayout
          layouts={state.layouts}
          breakpoints={{
            lg: 1200
          }}
          cols={{ lg: 4 }}
          rowHeight={rowHeight}
          width={1000}
          margin={[30, 30]}
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
              setState(() => ({ breakpoints: 'lg', layouts: { lg: changedLayout } }))
            }
          }}
        >
          {space.blocks.map((block) => {
            return (
              <div className="bg-gray-300" key={block.blockId}>
                <SwithViewerBlock mode={mode} type={block.type} block={block} />
              </div>
            )
          })}
        </ResponsiveGridLayout>
      </div>
    </>
  )
}

type BlockItem = {
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
    const { blockId: block_id, ...rest } = block
    return {
      block_id,
      i: block_id,
      isDraggable: mode === 'view' ? false : true,
      isResizable: mode === 'view' ? false : true,
      static: mode === 'view' ? true : false,
      minW: 1,
      maxW: 4,
      minH: 1,
      maxH: 2,
      ...rest
    }
  })
}
