import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeaderLayout.module.css';

const HeaderLayout = () => {
  const nav = useNavigate();

  return (
    <div className={styles.container}>
        <h1>차량 판매 정보 시스템</h1>

      <div className={styles.menu_div}>
        <div onClick={() => nav('/')} className={styles.menuHome}>홈</div>
        <div onClick={() => nav('/car-management')} className={styles.carManagement}>차량관리</div>
        <div onClick={() => nav('/sales-registration')} className={styles.salesInfoReg}>판매정보등록</div>
        <div onClick={() => nav('/sales-list')} className={styles.salesList}>판매목록조회</div>
      </div>
    </div>
  );
};

export default HeaderLayout;