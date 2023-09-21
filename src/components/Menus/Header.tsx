import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Layout } from 'antd'
import { useLocation } from 'react-router-dom'
import { BreadCrumbBox } from './BreadCrumb'
import styles from './Header.module.scss'
import { HomeHeader } from './HomeHeader'

export function Header(props: any) {
  const location = useLocation()

  return (
    <Layout className={styles.container}>
      <div className={styles.cover}>
        {location.pathname !== '/' && (
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
        )}
        {location.pathname === '/' ? <HomeHeader /> : <BreadCrumbBox />}
      </div>
    </Layout>
  )
}
