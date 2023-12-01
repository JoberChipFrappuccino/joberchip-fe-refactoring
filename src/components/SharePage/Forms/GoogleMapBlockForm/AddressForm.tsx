import { TiDeleteOutline } from '@react-icons/all-files/ti/TiDeleteOutline'
import { Input } from 'antd'
import { useMapStore } from '@/store/map'
import styles from './GoogleMapBlockForm.module.scss'

export default function AddressForm() {
  const { address, setAddress } = useMapStore()

  return (
    <div className={styles.forms}>
      <h3>상세주소</h3>
      <div className={styles.inputbox}>
        <Input
          className={styles.input}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="주소를 입력해주세요"
        />
        {address && (
          <button type="button" className={styles.delTitle} onClick={() => setAddress('')}>
            <TiDeleteOutline />
          </button>
        )}
      </div>
    </div>
  )
}
