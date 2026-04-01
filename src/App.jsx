import { useNetworkStatus } from './hooks/useNetworkStatus';
import { useBackgroundRotation } from './hooks/useBackgroundRotation';
import NetworkTable from './components/NetworkTable';
import ActionButtons from './components/ActionButtons';
import Footer from './components/Footer';
import SakanaWidget from './components/SakanaWidget';
import { useLayoutEffect } from 'react';
import './App.css';

function App() {
  const { data } = useNetworkStatus();
  const currentBackground = useBackgroundRotation();

  // 使用 useLayoutEffect 在 DOM 绘制前设置背景，避免首屏闪烁
  useLayoutEffect(() => {
    const previousBackgroundImage = document.body.style.backgroundImage;
    if (currentBackground) {
      document.body.style.backgroundImage = `url(${currentBackground})`;
    }
    return () => {
      document.body.style.backgroundImage = previousBackgroundImage;
    };
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
