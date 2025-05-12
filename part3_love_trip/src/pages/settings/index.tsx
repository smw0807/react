import { Link } from 'react-router-dom'
import ListRow from '@shared/ListRow'

function SettingsPage() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/settings/like">
            <ListRow
              as="div"
              content={
                <ListRow.Texts title="찜하기" subtitle="찜한 호텔 순서 변경" />
              }
              withArrow
            />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SettingsPage
