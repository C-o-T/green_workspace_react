import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CarManagement.module.css';
import Input from '../common/Input';
import Button from '../common/Button';

const CarManagement = () => {
  //차량 등록 데이터를 저장할 state 변수
  const [carInputData, setCarInputData] = useState({
    manufacturer: '',
    modelName: '',
    price: ''
  });

 const manufacturerOptions = ['현대', '기아'];

  //차량 목록 데이터를 저장할 state 변수
  const [registeredCars, setRegisteredCars] = useState([]);

  // 값이 변경될 때마다 실행되는 함수
  const handleInputDataChange = (e) => {
    setCarInputData({
      ...carInputData,
      [e.target.name]: e.target.value
    });
  };

  const getRegisteredCarList = () => {
    axios.get('/api/car')
      .then(res => {
        console.log("차량 목록 조회 성공:", res.data);
        setRegisteredCars(res.data);
      })
      .catch(e => {console.log(e)});
  };

  // 차량 등록 버튼 클릭 시 실행되는 함수
  const doRegisterCar = () => {
    if (!carInputData.manufacturer || !carInputData.modelName || !carInputData.price) {
      alert('모든 필수 정보를 입력해 주세요 (제조사, 모델명, 차량가격).');
      return;
    }
    const priceValue = parseInt(carInputData.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      alert('차량가격은 유효한 숫자로 입력해 주세요.');
      return;
    }
    axios.put('/api/car', {
      manufacturer: carInputData.manufacturer,
      modelName: carInputData.modelName,
      price: priceValue
    })
      .then(res => {
        console.log(res.data);
        alert('차량 등록이 성공적으로 완료되었습니다!');
        setCarInputData({ manufacturer: '', modelName: '', price: '' });
        getRegisteredCarList();
      })
      .catch(e => {
        console.log(e)
      });
  };

  // 마운트될 때 차량 목록 불러오기
  useEffect(() => {
    getRegisteredCarList();
  }, []);

  return (
    <div className={styles.container}>
      <h2>차량 관리</h2> 

      <div className={styles.formSection}>
        <div className={styles.formGroup}>
          <span className={styles.span}>제조사</span>
          <select 
            id="manufacturer" 
            name="manufacturer" 
            value={carInputData.manufacturer} 
            onChange={handleInputDataChange} 
            className={styles.selectField}
          >
            <option value="">선택</option>
            {manufacturerOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <span className={styles.span}>모델명</span>
          <Input 
            id="modelName" 
            name="modelName" 
            value={carInputData.modelName} 
            onChange={handleInputDataChange} 
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <span className={styles.span}>차량가격</span>
          <Input 
            id="price" 
            name="price" 
            type="number"
            value={carInputData.price} 
            onChange={handleInputDataChange} 
            className={styles.inputField}
          />
        </div>
        
        <Button 
          title='등록'
          onClick={doRegisterCar} 
          className={styles.registerButton}
        />
      </div>

      <h3 className={styles.listTitle}>등록된 차량 목록</h3>
      <div className={styles.listSection}>
        {registeredCars.length === 0 ? (
          <p className={styles.noDataMessage}>아직 등록된 차량이 없습니다.</p>
        ) : (
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <td>No</td>
                <td>모델번호</td>
                <td>모델명</td>
                <td>제조사</td>
                <td>차량가격</td>
              </tr>
            </thead>
            <tbody>
              {registeredCars.map((carInfo, i) => (
                <tr key={carInfo.modelNum || i}> 
                  <td>{registeredCars.length - i}</td>
                  <td>{carInfo.modelNum}</td>
                  <td>{carInfo.modelName}</td>
                  <td>{carInfo.manufacturer}</td>
                  <td>{carInfo.price.toLocaleString()}원</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CarManagement;