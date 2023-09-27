import { SpaceListBar } from '@/components/Menus/SpaceListBar'
import { CloseOutlined, RightOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Button, Drawer, Layout, Menu, Space } from 'antd'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BreadCrumbBox } from './BreadCrumb'
import styles from './Header.module.scss'
import { HomeHeader } from './HomeHeader'

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

export function Header(props: any) {
  const [open, setOpen] = useState(false)

  const onOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
  const location = useLocation()

  return (
    <Layout className={styles.container}>
      <div className={styles.cover}>
        {location.pathname !== '/' && (
          <>
            <Button
              type="text"
              icon={<RightOutlined />}
              onClick={onOpen}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64
              }}
            />
            <Drawer placement="left" bodyStyle={{ padding: 0 }} closable={false} onClose={onClose} open={open}>
              <div style={{ position: 'relative', display: 'flex', height: '100%' }}>
                <Button
                  onClick={onClose}
                  icon={<CloseOutlined />}
                  type="text"
                  style={{ position: 'absolute', top: 0, right: 0 }}
                />
                <SpaceListBar />
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
                      <Avatar
                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                        icon={<UserOutlined />}
                        style={{ backgroundColor: '#4C61FF' }}
                      />
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
            </Drawer>
          </>
        )}
        {location.pathname === '/' ? <HomeHeader /> : <BreadCrumbBox />}
      </div>
    </Layout>
  )
}
