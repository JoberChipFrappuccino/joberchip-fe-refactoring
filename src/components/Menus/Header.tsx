import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout } from 'antd'

export function Header(props: any) {
  return (
    <Layout style={{ padding: 0 }}>
      <Button
        type="text"
        icon={props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => {
          props.collapsedChange(!props.collapsed)
        }}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64
        }}
      />
    </Layout>
  )
}
