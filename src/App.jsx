import { useNetworkStatus } from './hooks/useNetworkStatus';
import { useBackgroundRotation } from './hooks/useBackgroundRotation';
import NetworkTable from './components/NetworkTable';
import ActionButtons from './components/ActionButtons';
import Footer from './components/Footer';
import SakanaWidget from './components/SakanaWidget';
import { useEffect } from 'react';
import './App.css';

function App() {
  const { data, loadData } = useNetworkStatus();
  const currentBackground = useBackgroundRotation();

  // 将背景图设置在 body 元素上
  useEffect(() => {
    document.body.style.backgroundImage = `url(${currentBackground})`;
  }, [currentBackground]);

  return (
    <>
      <div className="content-wrapper">
        <h2 className="network-status-title">
          本机校园网状态
        </h2>
        <div className="table-container">
          <NetworkTable data={data} />
          <ActionButtons data={data} />
        </div>
      </div>

      <Footer />
      <SakanaWidget />
    </>
  );
}

export default App;
