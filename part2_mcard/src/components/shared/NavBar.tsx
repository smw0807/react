import styled from '@emotion/styled'
import { Link, useLocation } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '@remote/firebase'

import { colors } from '@styles/colorPalette'
import useUser from '@hooks/auth/useUser'

import Flex from './Flex'
import Button from './Button'
import { useCallback } from 'react'
function NavBar() {
  const location = useLocation()
  const showSignButton =
    ['/signin', '/signup'].includes(location.pathname) === false

  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  const user = useUser()
  const renderButton = useCallback(() => {
    if (user !== null) {
      return <Button onClick={handleLogout}>로그아웃</Button>
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
      <Link to="/">홈</Link>
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
  border-bottom: 1px solid ${colors.grey};
`
export default NavBar
