import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SalesList.module.css';
import PageTitle from '../common/PageTitle';

const SalesList = () => {
  //판매 목록 데이터를 저장할 state 변수
  const [salesList, setSalesList] = useState([]);

  //판매 목록을 조회하는 함수
  useEffect(() => {
    axios.get('/api/sales')
      .then(res => {
        console.log("판매 목록 조회 성공:", res.data);
        setSalesList(res.data)
      })
      .catch(e => {
        console.log(e)
        setSalesList([]);
      });
  }, [])

  return (
    <div className={styles.container}>
      <PageTitle title='판매 목록 조회'/>
      <h3 className={styles.listTitle}>판매 내역</h3>
      <div className={styles.listSection}>
        {salesList.length === 0 ? (
          <p className={styles.noDataMessage}>등록된 판매 기록이 없습니다.</p>
        ) : (
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <td>No</td>
                <td>구매자명</td>
                <td>연락처</td>
                <td>구매일</td>
                <td>색상</td>
                <td>모델명</td>
                <td>가격</td>
              </tr>
            </thead>
            <tbody>
              {salesList.map((saleInfo, i) => (
                <tr key={saleInfo.saleNum || i}> 
                  <td>{salesList.length - i}</td>
                  <td>{saleInfo.buyerName}</td>
                  <td>{saleInfo.buyerContact ? saleInfo.buyerContact : '-'}</td> 
                  <td>{saleInfo.saleDate}</td> 
                  <td>{saleInfo.color}</td>
                  <td>{saleInfo.modelName}</td>
                  <td>{saleInfo.price.toLocaleString()}원</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SalesList;