import { Avatar, Image, Tooltip, TooltipProps } from 'antd';
import { useMemo, useState } from 'react';

type UserAvatarType = {
  displayName: string;
  email: string;
  photoURL: string;
};
export default function UserAvater(props: UserAvatarType) {
  const [arrow] = useState<'Show' | 'Hide' | 'Center'>('Show');
  const [title] = useState(`${props.displayName}[${props.email}]`);
  const mergedArrow = useMemo<TooltipProps['arrow']>(() => {
    if (arrow === 'Hide') {
      return false;
    }

    if (arrow === 'Show') {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);
  return (
    <Tooltip placement="bottom" title={title} arrow={mergedArrow}>
      <Avatar size={50}>
        <Image sizes="50px" src={props.photoURL} />
      </Avatar>
    </Tooltip>
  );
}
