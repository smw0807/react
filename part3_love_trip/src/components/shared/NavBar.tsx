import { useCallback } from 'react'
import styled from '@emotion/styled'
import { Link, useLocation } from 'react-router-dom'
import useUser from '@hooks/auth/useUser'

import { colors } from '@styles/colorPalette'

import Flex from './Flex'
import Button from './Button'

function NavBar() {
  const location = useLocation()
  const showSignButton =
    ['/signin', '/signup'].includes(location.pathname) === false

  const user = useUser()

  const renderButton = useCallback(() => {
    if (user !== null) {
      return (
        <Link to="/my">
          {/* <MyImage /> */}
          <img
            src={
              user.photoURL ??
              'https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-512.png'
            }
            alt=""
            width={40}
            height={40}
            style={{ borderRadius: '100%' }}
          />
        </Link>
      )
    }
    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }
    return null
  }, [user, showSignButton])
  return (
    <Container justify="space-between" align="center">
      <Link to="/">Love Trip</Link>
      {renderButton()}
    </Container>
  )
}

const Container = styled(Flex)`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray};
`
export default NavBar
