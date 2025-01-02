import { Avatar, Button, Popover } from 'antd';
import Title from 'antd/es/typography/Title';
import { LogoutOutlined } from '@ant-design/icons';

type UserAvatarType = {
  displayName: string;
  email: string;
  photoURL: string;
  googleSignout: () => void;
};
export default function UserAvater(props: UserAvatarType) {
  return (
    <Popover placement="bottom" content={<PopoverContent {...props} />}>
      <Avatar size={50} src={<img src={props.photoURL} />} />
    </Popover>
  );
}

function PopoverContent(props: UserAvatarType) {
  return (
    <div style={{ textAlign: 'center' }}>
      <Avatar size={100} src={<img src={props.photoURL} />} />
      <Title level={3}>{props.displayName}</Title>
      <p>{props.email}</p>
      <Button icon={<LogoutOutlined />} onClick={props.googleSignout}>
        로그아웃
      </Button>
    </div>
  );
}
