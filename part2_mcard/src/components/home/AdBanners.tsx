import styled from '@emotion/styled'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { colors } from '@styles/colorPalette'
import { getAdBanners } from '@remote/adBanner'

import 'swiper/css'

function AdBanners() {
  const { data } = useQuery(['adBanners'], () => getAdBanners())
  if (!data) return null
  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link}>
                <BannerContainer direction="column">
                  <Text bold>{banner.title}</Text>
                  <Text typography="t7">{banner.description}</Text>
                </BannerContainer>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`

const BannerContainer = styled(Flex)`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`

export default AdBanners
