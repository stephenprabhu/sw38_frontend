import styles from './Layout.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';
import { useState } from 'react';
import Download from '../components/Download';

const Layout = ({children, title}) => {
  // const [downloadButtons, setDownloadButtons] = useState(true)
  return (
    <div className={styles.layoutOverlay}>
      <Header title={title}/>
      <div className={styles.layoutChildOverlay}>
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout

// {downloadButtons && <Download setDownloadButtons={setDownloadButtons} />}