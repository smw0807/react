import { fetchForSSR } from '~/common/fetchForSSR';
import { Role, Status } from '~/components/user/EditUser';

type User = {
  type: string;
  email: string;
  name: string;
  phoneNumber: string;
  profileImage: string;

  role: Role;
  status: Status;
  createdAt: string;
  lastLoginAt: string;
};
const fetchData = fetchForSSR();
const getUsers = async (pageSize: number, page: number, keyword: string) => {
  const res = await (
    await fetchData
  )(`/api/user?size=${pageSize}&page=${page}&keyword=${keyword}`);

  return res.user;
};
export default async function SsrUsers() {
  const users = await getUsers(10, 1, '');
  console.log(users);
  return <>saf</>;
}
