import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import { ITooltipProps } from './types';

const Tooltip: React.FC<ITooltipProps> = ({
  content,
  triggerType,
  position = 'top',
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      hideTooltip();
    }
  };

  useEffect(() => {
    if (triggerType === 'click' && isVisible) {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          tooltipRef.current &&
          !tooltipRef.current.contains(event.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node)
        ) {
          hideTooltip();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible, triggerType]);

  return (
    <div className='tooltip-wrapper' onKeyDown={handleKeyPress}>
      <div
        className='tooltip-trigger'
        ref={triggerRef}
        // Show the tooltip on hover on
        onMouseEnter={triggerType === 'hover' ? showTooltip : undefined}
        // Hide the tooltip on hover off
        onMouseLeave={triggerType === 'hover' ? hideTooltip : undefined}
        // Show the tooltip on click
        onClick={triggerType === 'click' ? showTooltip : undefined}
        // Make the trigger focusable
        tabIndex={0}>
        {children}
      </div>
      {isVisible && (
        <div
          className={`tooltip-content ${position}`}
          ref={tooltipRef}
          role='tooltip'
          aria-hidden={!isVisible}>
          {content}
          {triggerType === 'click' && (
            <button
              onClick={hideTooltip}
              className='tooltip-close-btn'
              aria-label='Close tooltip'>
              ×
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
