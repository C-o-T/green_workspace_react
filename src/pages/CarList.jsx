import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CarList = () => {
  // 입력한 차량 정보를 저장할 state 변수
  // const [insertCar, setInsertCar] = useState({
  //   'manufacturer' : '',
  //   'modelName' : '',
  //   'price' : ''
  // })

  // 등록된 차량을 조회하여 저장할 state 변수
  const [carList, setCarList] = useState([]);

  // // 등록 버튼 실행 시 차량 등록 함수
  // // const handleInsertCar = () => {
  // //   axios.put()
  // //   .then()
  // //   .catch(e => console.log(e))
  // // }

  // 마운트 될 때마다 차량 정보 조회 함수
  useEffect(() => {
    axios.get('/api/cars')
      .then(res => {
        console.log(res.data);
        setCarList(res.data);
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>No</td>
            <td>모델번호</td>
            <td>모델명</td>
            <td>제조사</td>
          </tr>
        </thead>
        <tbody>
          {carList.length === 0 ? (
            <tr>
              <td colSpan="4">등록된 차량이 없습니다.</td> 
            </tr>
          ) : (
            carList.map((car, i) => {
              return (
                <tr key={i}>
                  <td>{carList.length - i}</td>
                  <td>{car.modelNum}</td>
                  <td>{car.modelName}</td>
                  <td>{car.manufacturer}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CarList;