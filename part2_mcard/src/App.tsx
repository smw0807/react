import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Input from '@shared/Input'
import TextField from '@shared/TextField'
import Alert from '@shared/Alert'
import './App.css'
import { useAlertContext } from '@contexts/AlertContext'
function App() {
  const { open } = useAlertContext()
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

      <div style={{ height: 10, width: '100%', background: '#efefef' }}></div>
      <Input placeholder="이름을 입력해주세요" />
      <Input aria-invalid />
      <div style={{ height: 10, width: '100%', background: '#efefef' }}></div>
      <TextField label="이름" />
      <TextField label="이름" hasError />
      <TextField
        label="이름"
        hasError
        helpMessage="영문 대소문자, 숫자만 입력해주세요"
      />

      <div style={{ height: 10, width: '100%', background: '#efefef' }}></div>
      {/* <Alert
        open
        title="알림"
        description="알림 내용"
        buttonLabel="확인"
        onButtonClick={() => {}}
      /> */}
      <Button
        onClick={() =>
          open({
            title: '알림',
            description: '알림 내용',
            buttonLabel: '확인',
            onButtonClick: () => {},
          })
        }
      >
        알림 열기
      </Button>
    </div>
  )
}

export default App
