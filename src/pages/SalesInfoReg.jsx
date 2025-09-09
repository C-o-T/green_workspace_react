import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './SalesInfoReg.module.css';
import PageTitle from '../common/PageTitle';
import Input from '../common/Input';
import Button from '../common/Button';

const SalesInfoReg = () => {
  const nav = useNavigate();

  //판매 정보 등록 데이터를 저장할 state 변수
  const [salesInputData, setSalesInputData] = useState({
    color: '',
    buyerName: '',
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
    axios.get('/api/cars')
      .then(res => {
        setCarModels(res.data);
        if (res.data.length > 0 && !salesInputData.modelNum) {
          setSalesInputData(prev => ({ ...prev, modelNum: res.data[0].modelNum }));
        }
      })
      .catch(e => {
        console.error('차량 모델 목록을 불러오는 중 오류 발생:', e);
        alert('차량 모델 목록을 불러오는 데 실패했습니다.'); 
        setCarModels([]);
      });
  };

  const doRegisterSale = () => {
    if (!salesInputData.color || !salesInputData.buyerName || !salesInputData.modelNum) {
      alert('색상, 구매자명, 모델명은 필수 입력 정보입니다.');
      return;
    }

    if (salesInputData.contact && !/^010-\d{4}-\d{4}$/.test(salesInputData.contact)) {
      alert('연락처는 "010-XXXX-YYYY" 형식으로 입력해 주세요.');
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
        console.log("판매 정보 등록 성공:", res.data);
        alert('판매 정보가 성공적으로 등록되었습니다!');
        
        setSalesInputData({ 
            color: '', 
            buyerName: '', 
            contact: '', 
            modelNum: carModels.length > 0 ? carModels[0].modelNum : ''
        });
        
        nav('/sales-list');
      })
      .catch(e => {
        console.error('판매 정보 등록 중 오류 발생:', e);
        alert('판매 정보 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      });
  };

  useEffect(() => {
    getCarModels();
  }, []);

  return (
    <div className={styles.container}>
      <PageTitle title='판매 정보 등록'/>
      <div className={styles.formSection}>
        <div className={styles.formGroup}>
          <label htmlFor="color" className={styles.label}>색상</label>
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
          <label htmlFor="modelNum" className={styles.label}>모델</label>
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
          <label htmlFor="buyerName" className={styles.label}>구매자명</label>
          <Input 
            id="buyerName" 
            name="buyerName" 
            value={salesInputData.buyerName} 
            onChange={handleInputDataChange} 
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contact" className={styles.label}>연락처</label>
          <Input 
            id="contact" 
            name="contact" 
            type="text"
            value={salesInputData.contact} 
            onChange={handleInputDataChange} 
            placeholder="010-XXXX-YYYY"
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