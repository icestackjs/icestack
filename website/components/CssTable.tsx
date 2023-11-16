// import {componentsNames} from '@icestack/ui/components'
import type { FC } from 'react'
import { useMemo } from 'react'
import { useI18n } from '../locales'
import tableData from '../table'
// import { useRouter } from 'next/router'
const Com: FC<{ name: string }> = (props) => {
  const t = useI18n()
  const { name } = props
  const res = useMemo(() => {
    if (name in tableData) {
      return tableData[name]
    }
    return {
      base: [],
      styled: [],
      utils: []
    }
  }, [name])
  return (
    <div className="overflow-x-auto">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>{t('components.table.className')}</th>
            <th>{t('components.table.type')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {res.base.map((x) => {
            return (
              <tr key={x}>
                <td>{x}</td>
                <td>
                  <span className="badge badge-primary badge-sm">base</span>
                </td>
                <td></td>
              </tr>
            )
          })}

          {res.styled.map((x) => {
            return (
              <tr key={x}>
                <td>{x}</td>
                <td>
                  <span className="badge badge-success badge-sm">styled</span>
                </td>
                <td></td>
              </tr>
            )
          })}

          {res.utils.map((x) => {
            return (
              <tr key={x}>
                <td>{x}</td>
                <td>
                  <span className="badge badge-warning badge-sm">utils</span>
                </td>
                <td></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Com
