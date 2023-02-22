import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import BottomMenu from "../../components/BottomMenu";
import axios from 'axios';
import { Chip } from '@mui/material';

const Transection = () => {
  const [transections, setTransections] = useState()

  useEffect(() => {
    // All transections API
    const transectiosAPI = async () => {
      const res = await axios.get("https://bo.ssv388.info/api/account/user_transaction", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      setTransections(res.data.response && res.data.response)
    }
    transectiosAPI()
  }, [])

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column', gap: 15 }}>
      <Header />
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto', gap: 15 }}>
        <h3 style={{ margin: '0px', color: 'white' }}>giao dịch</h3>
        {transections ?
          <table border={0} style={{ color: 'white' }} width="100%">
            <tr>
              <th style={{ paddingBottom: '10px' }}>Số Điểm Nạp</th>
              <th style={{ paddingBottom: '10px' }}>Ngày</th>
              <th style={{ paddingBottom: '10px' }}>Trạng thái</th>
            </tr>
            {transections && transections.map((transection) => {
              return (
                <tr key={transection.id}>
                  <td>{transection.transaction_purpose == 'deposit' ? '+' : '-'}{transection.transaction_amount}</td>
                  <td>{new Date(transection.created_at).toLocaleDateString("vi-VN")}</td>
                  <td><Chip label={transection.is_approved === 0 ? 'Pending' : transection.is_approved === 1 ? ' Approved' : 'Cancel'}
                    sx={{ backgroundColor: transection.is_approved === 0 ? '#53a9a3' : transection.is_approved === 1 ? 'green' : '#ad2626', color: 'white' }} /></td>
                </tr>
              )
            })}
          </table>
          :
          <h3 style={{ margin: '0px', color: 'white' }}>Không có giao dịch</h3>
        }
      </div>

      <BottomMenu />
    </div>
  )
}

export default Transection