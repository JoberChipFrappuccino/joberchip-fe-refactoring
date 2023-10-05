import { SpaceListBar } from '@/components/Menus/SpaceListBar'
import { CloseOutlined, RightOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Drawer, Layout, Menu, Space } from 'antd'
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
  getItem('관리및문의', '관리및문의', [getItem('관리', '관리'), getItem('문의', '문의')])
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
        {location.pathname !== '/' && !location.pathname.includes('/sign') && (
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
                    <Space direction="vertical" style={{ marginTop: '20px' }} align="center">
                      <div className={styles.userProfile}>
                        <img src="/sideBar/user.svg" alt="user" />
                      </div>
                    </Space>
                    <h2 style={{ margin: 'none' }}>김자버</h2>
                    <Button
                      style={{
                        backgroundColor: '#4C61FF',
                        color: '#FFFFFF',
                        border: 'none',
                        height: '50px',
                        marginBottom: '10px',
                        fontSize: '16px',
                        fontWeight: '700'
                      }}
                      block
                    >
                      공유페이지
                    </Button>
                    <Button
                      style={{
                        backgroundColor: '#ECECFB',
                        color: '#4C61FF',
                        border: 'none',
                        height: '50px',
                        marginBottom: '10px',
                        fontSize: '16px'
                      }}
                      block
                    >
                      문서보내기
                    </Button>
                    <Button
                      style={{
                        backgroundColor: '#ECECFB',
                        color: '#4C61FF',
                        border: 'none',
                        height: '50px',
                        marginBottom: '40px',
                        fontSize: '16px'
                      }}
                      block
                    >
                      연락처추가
                    </Button>
                  </div>
                  <Menu mode="inline" defaultSelectedKeys={['1']} items={items} />
                </div>
              </div>
            </Drawer>
          </>
        )}
        {location.pathname === '/' || location.pathname.includes('/sign') ? <HomeHeader /> : <BreadCrumbBox />}
      </div>
    </Layout>
  )
}
