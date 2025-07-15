import styles from './page.module.css';
import ClientComponent from './client-component';
import ServerComponent from './server-component';

export default function Home() {
  return (
    <div className={styles.page}>
      인덱스 페이지
      {/* 클라이언트 컴포넌트에 서버 컴포넌트를 import하지 않고, children으로 전달하는게 나음 */}
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
