import { Avatar, Image, Tooltip } from 'antd';
import { useState } from 'react';

type UserAvatarType = {
  displayName: string;
  email: string;
  photoURL: string;
};
export default function UserAvater(props: UserAvatarType) {
  const [title] = useState(`${props.displayName}[${props.email}]`);
  return (
    <Tooltip placement="bottom" title={title}>
      <Avatar size={50}>
        <Image src={props.photoURL} />
      </Avatar>
    </Tooltip>
  );
}
