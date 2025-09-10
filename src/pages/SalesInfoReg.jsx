import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './SalesInfoReg.module.css';
import Input from '../common/Input';
import Button from '../common/Button';

const SalesInfoReg = () => {
  const nav = useNavigate();

  //판매 정보 등록 데이터를 저장할 state 변수
  const [salesInputData, setSalesInputData] = useState({
    buyerName: '',
    color: '',
    contact: '',
    modelNum: ''
  });

  //차량 모델 목록을 저장할 state 변수
  const [carModels, setCarModels] = useState([]);

  const colors = ['화이트', '블랙', '레드'];

  //값이 변경될 때마다 실행되는 함수
  const handleInputDataChange = (e) => {
    setSalesInputData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getCarModels = () => {
    axios.get('/api/car')
      .then(res => {
        setCarModels(res.data);
        if (res.data.length > 0 && !salesInputData.modelNum) {
          setSalesInputData(prev => ({ ...prev, modelNum: res.data[0].modelNum }));
        }
      })
      .catch(e => {
        console.log(e)
      });
  };

  const doRegisterSale = () => {
    if (!salesInputData.color || !salesInputData.buyerName || !salesInputData.modelNum) {
      alert('색상, 구매자명, 모델명은 필수 입력 정보입니다.');
      return;
    }

    const salePayload = {
      color: salesInputData.color,
      buyerName: salesInputData.buyerName,
      buyerContact: salesInputData.contact,
      modelNum: parseInt(salesInputData.modelNum),
      saleDate: new Date().toISOString()
    };

    axios.post('/api/sales', salePayload)
      .then(res => {
        console.log("판매 정보 등록 성공");
        alert('판매 정보가 성공적으로 등록되었습니다!');
        
        setSalesInputData({ 
          buyerName: '', 
            color: '', 
            contact: '', 
            modelNum: carModels.length > 0 ? carModels[0].modelNum : ''
        });
        
        nav('/sales-list');
      })
      .catch(e => {
        console.log(e)
      });
  };

  useEffect(() => {
    getCarModels();
  }, []);

  console.log(salesInputData)

  return (
    <div className={styles.container}>
      <h2>판매 정보 등록</h2>
      <div className={styles.formSection}>
        <div className={styles.formGroup}>
          <span className={styles.span}>색상</span>
          <select 
            id="color" 
            name="color" 
            value={salesInputData.color} 
            onChange={handleInputDataChange} 
            className={styles.selectField}
          >
            <option value="">선택</option>
            {colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <span className={styles.span}>모델</span>
          {carModels.length === 0 ? (
            <p className={styles.noModelsMessage}>등록된 차량 모델이 없습니다.</p>
          ) : (
            <select 
              id="modelNum" 
              name="modelNum" 
              value={salesInputData.modelNum} 
              onChange={handleInputDataChange} 
              className={styles.selectField}
            >
              {carModels.map(model => (
                <option key={model.modelNum} value={model.modelNum}>
                  {model.modelName} ({model.manufacturer})
                </option>
              ))}
            </select>
          )}
        </div>

        <div className={styles.formGroup}>
          <span className={styles.span}>구매자명</span>
          <Input 
            id="buyerName" 
            name="buyerName" 
            value={salesInputData.buyerName} 
            onChange={handleInputDataChange} 
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <span className={styles.span}>연락처</span>
          <Input 
            id="contact" 
            name="contact" 
            type="text"
            value={salesInputData.contact} 
            onChange={handleInputDataChange} 
            className={styles.inputField}
          />
        </div>
        
        <Button 
          title='등록'
          onClick={doRegisterSale} 
          className={styles.registerButton}
        />
      </div>
    </div>
  );
};

export default SalesInfoReg;