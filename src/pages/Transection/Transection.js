import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import BottomMenu from "../../components/BottomMenu";
import axios from 'axios';
import { Chip } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { APIGetAllTransactions } from '../../helpers/APIs/TransactionAPI';
import CircularProgress from '@mui/material/CircularProgress';
import { addCommasToNumber } from '../../helpers/NumberHelper';
import { useLocation } from 'react-router-dom';
import styles from './Transection.module.css';

const Transection = () => {
  const { search } = useLocation();

  const [transections, setTransections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState(false);
  const [activeTab, setActiveTab] = useState(search ? "2" : "1");


  useEffect(() => {
    transactionsAPI();
  }, []);


  const transactionsAPI = async () => {
    setLoading(true);
    const res = await APIGetAllTransactions(localStorage.getItem('auth_token'));
    if (res) {
      setTransections(res);
      setSelectedTransactions(res.filter(t => t.transaction_purpose === (search ? "withdraw" : "deposit")))
    }
    else {
      setTransections([]);
    }
    setLoading(false);
  }

  const handleChange = (e, newValue) => {
    setActiveTab(newValue);
    if (newValue === "1") {
      setSelectedTransactions(transections.filter(t => t.transaction_purpose === "deposit"));
    } else {
      setSelectedTransactions(transections.filter(t => t.transaction_purpose === "withdraw"));
    }
  }


  return (
    <div className={styles.transactionOverlay}>
      <Header />
      <div className={styles.transactionWrapper}>
        <h3 style={{ margin: '0px', color: 'white' }}>Giao Dịch</h3>
        <Tabs variant='fullWidth' value={activeTab} onChange={handleChange} sx={{ "& button.Mui-selected": { color: '#F7DB89' } }} TabIndicatorProps={{ style: { backgroundColor: "#F7DB89" } }}>
          <Tab label="Nạp Tiền" value="1" />
          <Tab label="Rút Tiền" value="2" />
        </Tabs>
        {loading ? <div style={{ textAlign: "center", marginTop: "15px" }}><CircularProgress style={{ color: "white" }} /></div> :
          selectedTransactions ?
            <div className={styles.transactionTable}>
              <table border={0} width="100%" style={{ color: 'white' }}>
                <thead>
                  <tr>
                    <th style={{ paddingBottom: '10px' }}>{activeTab === "1" ? "Số Tiền Nạp" : "Số Tiền Rút"}</th>
                    <th style={{ paddingBottom: '10px' }}>Ngày</th>
                    <th style={{ paddingBottom: '10px' }}>Trạng thái</th>
                  </tr>
                </thead>
                {selectedTransactions && selectedTransactions.map((transection) => {
                  return (
                    <tbody key={transection.id}>
                      <tr>
                        <td>{transection.transaction_purpose == 'deposit' ? '+' : '-'}{addCommasToNumber(transection.transaction_amount)}</td>
                        <td >{new Date(transection.created_at).toLocaleString("vi-VN")}</td>
                        <td><Chip label={transection.is_approved === 0 ? 'Đang xử lý' : transection.is_approved === 1 ? 'Đã phê duyệt' : 'Từ chối'}
                          sx={{ backgroundColor: transection.is_approved === 0 ? '#53a9a3' : transection.is_approved === 1 ? 'green' : '#ad2626', color: 'white' }} /></td>
                      </tr>
                    </tbody>
                  )
                })}
              </table>
            </div>
            :
            <h3 style={{ margin: '0px', color: 'white' }}>Không có giao dịch</h3>}
      </div>

      <BottomMenu />
    </div>
  )
}

export default Transection