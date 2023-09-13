import type { MenuProps } from 'antd'
import { Button, Layout, Menu, Space } from 'antd'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } satisfies MenuItem
}

const items: MenuProps['items'] = [
  getItem(
    '연락처 그룹',
    '연락처 그룹',
    null,
    [getItem('전체보기', '전체보기'), getItem('임직원', '임직원'), getItem('관계자', '관계자')],
    'group'
  ),
  getItem(
    '문서보관함',
    '문서보관함',
    null,
    [getItem('발신함', '발신함'), getItem('수신함', '수신함'), getItem('보관 문서함', '보관 문서함')],
    'group'
  ),
  getItem('관리및문의', '관리및문의', null, [], 'group')
]

export function SideNavBar(props: any) {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      collapsedWidth="0"
      style={{ backgroundColor: 'white' }}
    >
      <Space className="site-button-ghost-wrapper" wrap direction="horizontal">
        <Button>문서보내기</Button>
        <Button>연락처추가</Button>
      </Space>
      <Button block>공유페이지</Button>
      <Menu mode="inline" defaultSelectedKeys={['1']} items={items} />
    </Sider>
  )
}
