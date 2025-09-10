import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './HeaderLayout.module.css';

const HeaderLayout = () => {
  const nav = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.menu_div}>
        <div onClick={e => nav('/')} className={styles.menuHome}>홈</div>
        <div onClick={e => nav('/car-management')} className={styles.carManagement}>차량관리</div>
        <div onClick={e => nav('/sales-registration')} className={styles.salesInfoReg}>판매정보등록</div>
        <div onClick={e => nav('/sales-list')} className={styles.salesList}>판매목록조회</div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default HeaderLayout;