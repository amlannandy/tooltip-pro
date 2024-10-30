import Tooltip from './Tooltip/Tooltip';
import './App.css';

function App() {
  return (
    <div className='app'>
      <h1 className='app-heading'>TooltipPro Examples</h1>
      {/* Different types of trigger - Click vs Hover */}
      <div className='content-row'>
        <Tooltip content='I appear on click!' triggerType='click'>
          <span className='tooltip-btn'>On Click Example</span>
        </Tooltip>
        <Tooltip content='I appear on hover!' triggerType='hover'>
          <span className='tooltip-btn'>On Hover Example</span>
        </Tooltip>
      </div>
      {/* Different positions */}
      <div className='content-row'>
        <Tooltip content='Left position!' triggerType='hover' position='left'>
          <span className='tooltip-btn'>Left</span>
        </Tooltip>
        <Tooltip content='Top position!' triggerType='hover' position='top'>
          <span className='tooltip-btn'>Top</span>
        </Tooltip>
        <Tooltip
          content='Bottom position!'
          triggerType='hover'
          position='bottom'>
          <span className='tooltip-btn'>Bottom</span>
        </Tooltip>
        <Tooltip content='Right position!' triggerType='hover' position='right'>
          <span className='tooltip-btn'>Right</span>
        </Tooltip>
      </div>
    </div>
  );
}

export default App;
