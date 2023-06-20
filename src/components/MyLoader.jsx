import { CircularProgress } from '@mui/material';

const MyLoader = () => {
  return (
    <div style={{textAlign:'center'}}>
      <CircularProgress size={30} style={{color:'white', margin: '10px'}}/>    
    </div>
  )
}

export default MyLoader