import { SpaceListBar } from '@/components/Menus/SpaceListBar'
import { UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Button, Layout, Menu, Space } from 'antd'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, children?: MenuItem[], type?: 'group'): MenuItem {
  return {
    key,
    children,
    label,
    type
  } satisfies MenuItem
}

const items: MenuProps['items'] = [
  getItem('연락처 그룹', '연락처 그룹', [
    getItem('전체보기', '전체보기'),
    getItem('임직원', '임직원'),
    getItem('관계자', '관계자')
  ]),
  getItem('문서보관함', '문서보관함', [
    getItem('발신함', '발신함'),
    getItem('수신함', '수신함'),
    getItem('보관 문서함', '보관 문서함')
  ]),
  getItem('관리및문의', '관리및문의', [getItem('어쩌구', '어쩌구'), getItem('저쩌구', '저쩌구')])
]

export function SideNavBar(props: any) {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      collapsedWidth="0"
      style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ display: 'flex', height: '100%' }}>
        <SpaceListBar />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80%',
              margin: '0 auto'
            }}
          >
            <Space direction="vertical" style={{ marginTop: '20px' }}>
              <div>
                <UserOutlined />
              </div>
              <Avatar size={{ xl: 80, xxl: 100 }} icon={<UserOutlined />} style={{ backgroundColor: '#4C61FF' }} />
            </Space>
            <h2 style={{ margin: 'none' }}>김자버</h2>
            <Button style={{ backgroundColor: '#4C61FF', color: '#FFFFFF', border: 'none' }} block>
              공유페이지
            </Button>
            <Button style={{ backgroundColor: '#ECECFB', color: '#4C61FF', border: 'none' }} block>
              문서보내기
            </Button>
            <Button style={{ backgroundColor: '#ECECFB', color: '#4C61FF', border: 'none' }} block>
              연락처추가
            </Button>
          </div>
          <Menu mode="inline" defaultSelectedKeys={['1']} items={items} />
        </div>
      </div>
    </Sider>
  )
}
