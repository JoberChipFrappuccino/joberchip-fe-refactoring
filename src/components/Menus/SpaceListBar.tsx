import { Avatar, Layout, Tabs } from 'antd'

const { Sider } = Layout

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  backgroundColor: '#EAEAEA'
}

export function SpaceListBar() {
  return (
    <Sider width={100} style={siderStyle} collapsible>
      <Tabs
        tabPosition={'left'}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1)
          return {
            label: (
              <Avatar size={50} shape="square" style={{ backgroundColor: '#292D32' }}>
                {id}
              </Avatar>
            ),
            key: id
          }
        })}
      />
    </Sider>
  )
}
