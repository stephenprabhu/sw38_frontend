import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import BottomMenu from "../../components/BottomMenu";
import { Chip } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { APIGetAllTransactions } from '../../helpers/APIs/TransactionAPI';
import CircularProgress from '@mui/material/CircularProgress';


const Transection = () => {
  const [transections, setTransections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    transactionsAPI();
  }, []);


  const transactionsAPI = async () => {
    setLoading(true);
    const res = await APIGetAllTransactions(localStorage.getItem('auth_token'));
    if (res) {
      setTransections(res);
      setSelectedTransactions(res.filter(t => t.transaction_purpose === "deposit"))
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
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column', gap: 15 }}>
      <Header />
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto', gap: 15 }}>
        <h3 style={{ margin: '0px', color: 'white' }}>Giao Dịch</h3>
        <Tabs value={activeTab} onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Nạp Tiền" value="1" />
          <Tab label="Rút Tiền" value="2" />
        </Tabs>
        {loading ? <div style={{ textAlign: "center", marginTop: "15px" }}><CircularProgress style={{ color: "white" }} /></div> :
          selectedTransactions ?
            <table border={0} style={{ color: 'white' }} width="100%">
              <thead>
                <tr>
                  <th style={{ paddingBottom: '10px' }}>Số Điểm Nạp</th>
                  <th style={{ paddingBottom: '10px' }}>Ngày</th>
                  <th style={{ paddingBottom: '10px' }}>Trạng thái</th>
                </tr>
              </thead>
              {transections && transections.map((transection) => {
                return (
                  <tbody key={transection.id}>
                    <tr>
                      <td>{transection.transaction_purpose == 'deposit' ? '+' : '-'}{transection.transaction_amount}</td>
                      <td>{new Date(transection.created_at).toLocaleDateString("vi-VN")}</td>
                      <td><Chip label={transection.is_approved === 0 ? 'Đang xử lý' : transection.is_approved === 1 ? 'Đã phê duyệt' : 'Từ chối'}
                        sx={{ backgroundColor: transection.is_approved === 0 ? '#53a9a3' : transection.is_approved === 1 ? 'green' : '#ad2626', color: 'white' }} /></td>
                    </tr>
                  </tbody>
                )
              })}
            </table>
            :
            <h3 style={{ margin: '0px', color: 'white' }}>Không có giao dịch</h3>}
      </div>

      <BottomMenu />
    </div>
  )
}

export default Transection