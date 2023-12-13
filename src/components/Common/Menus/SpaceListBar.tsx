import { ConfigProvider, Layout } from 'antd'
import styles from './SpaceList.module.scss'

const { Sider } = Layout

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  backgroundColor: '#292D32'
}

const USER = ['김PM', '신UI', '정FE', '신BE']

export function SpaceListBar() {
  return (
    <Sider width={75} style={siderStyle}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#fff'
          }
        }}
      >
        <div className={styles.tabContainer}>
          <div className={styles.topWrap}>
            <div className={`${styles.tabButton} ${styles.homeButton}`}>
              <img src="/sideBar/home.svg" alt="home" />
            </div>
            <div className={`${styles.tabButton} ${styles.ownerButton}`}>김자버</div>
          </div>
          {USER.map((user) => (
            <div key={user} className={`${styles.tabButton} ${styles.userButton}`}>
              {user}
            </div>
          ))}
          <div className={`${styles.tabButton} ${styles.plusButton}`}>
            <img src="/sideBar/plus.svg" alt="plus" />
          </div>
        </div>
      </ConfigProvider>
    </Sider>
  )
}
