import { Breadcrumb } from 'antd'

export function BreadCrumbBox() {
  return (
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
  )
}
