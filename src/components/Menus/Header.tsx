import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Layout } from 'antd'

export function Header(props: any) {
  return (
    <Layout style={{ padding: 0, display: 'flex' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          type="text"
          icon={props.collapsed ? <RightOutlined /> : <LeftOutlined />}
          onClick={() => {
            props.collapsedChange(!props.collapsed)
          }}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64
          }}
        />
        <Breadcrumb
          separator=">"
          items={[
            {
              title: 'Home'
            },
            {
              title: 'Application Center',
              href: ''
            },
            {
              title: 'Application List',
              href: ''
            },
            {
              title: 'An Application'
            }
          ]}
        />
      </div>
    </Layout>
  )
}
