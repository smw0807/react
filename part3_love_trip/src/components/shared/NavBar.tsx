import { useCallback } from 'react'
import styled from '@emotion/styled'
import { Link, useLocation } from 'react-router-dom'
import useUser from '@hooks/auth/useUser'

import { colors } from '@styles/colorPalette'

import Flex from './Flex'
import Button from './Button'
import Spacing from './Spacing'

function NavBar() {
  const location = useLocation()
  const showSignButton =
    ['/signin', '/signup'].includes(location.pathname) === false

  const user = useUser()

  const renderButton = useCallback(() => {
    if (user !== null) {
      return (
        <Flex align="center">
          <Link to="/my">
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
          <Spacing size={4} direction="horizontal" />
          <Link to="/settings">
            <img
              src="https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-06-64.png"
              alt="설정"
              width={40}
              height={40}
            />
          </Link>
        </Flex>
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
