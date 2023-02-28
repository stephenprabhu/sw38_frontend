import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import BottomMenu from "../../components/BottomMenu";
import { Chip } from '@mui/material';
import { allTransationsAPI } from '../../helpers/APIs/TransactionAPI';

const Transection = () => {
  const [transections, setTransections] = useState()

  useEffect(() => {
    // All transections API
    const allTransations = async () => {
      const res = await allTransationsAPI()
      setTransections(res.response && res.response)
    }
    allTransations()
  }, [])

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column', gap: 15 }}>
      <Header />
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'auto', gap: 15 }}>
        <h3 style={{ margin: '0px', color: 'white' }}>Giao Dịch</h3>
        {transections ?
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
          <h3 style={{ margin: '0px', color: 'white' }}>Không có giao dịch</h3>
        }
      </div>

      <BottomMenu />
    </div>
  )
}

export default Transection