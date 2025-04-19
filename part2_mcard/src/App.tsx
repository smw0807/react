import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Text from '@shared/Text'
import Button from '@shared/Button'
import logo from './logo.svg'
import './App.css'

function App() {
  return (
    <div>
      <Text typography="t1" display="block" color="red">
        T1
      </Text>
      <Text typography="t2" display="block" color="blue">
        T2
      </Text>
      <Text typography="t3" display="block" color="green">
        T3
      </Text>
      <Text typography="t4" display="block" color="yellow">
        T4
      </Text>
      <Text typography="t5" display="block" color="purple">
        T5
      </Text>

      <div style={{ height: 10, width: '100%', background: '#efefef' }}></div>
      <Button>클릭해주세요</Button>
      <Button color="success">클릭해주세요</Button>
      <Button color="error">클릭해주세요</Button>
      <Button color="success">클릭해주세요</Button>
      <Button color="success" weak>
        클릭해주세요
      </Button>
      <Button color="success" size="medium">
        클릭해주세요
      </Button>
      <Button color="success" size="large" full>
        클릭해주세요
      </Button>
      <Button color="success" size="large" full disabled>
        클릭해주세요
      </Button>
    </div>
  )
}

export default App
