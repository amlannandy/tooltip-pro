import React, { useState, useRef, useEffect, useCallback } from 'react';
import './styles.css';
import { ITooltipProps } from './types';

const Tooltip: React.FC<ITooltipProps> = ({
  content,
  triggerType,
  position = 'top',
  children,
}) => {
  const [isTooltipVisible, toggleIsTooltipVisible] = useState(false);
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const showTooltip = () => toggleIsTooltipVisible(true);
  const hideTooltip = () => toggleIsTooltipVisible(false);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      hideTooltip();
    }
    if (
      (event.key === 'Enter' || event.key === ' ') &&
      triggerType === 'click'
    ) {
      event.preventDefault();
      toggleIsTooltipVisible(prev => !prev);
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      hideTooltip();
    }
  }, []);

  useEffect(() => {
    if (triggerType === 'click' && isTooltipVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isTooltipVisible, triggerType, handleClickOutside]);

  const adjustTooltipPosition = useCallback(() => {
    if (triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newPosition = position;
      if (position === 'top' && triggerRect.top < 0) {
        newPosition = 'bottom';
      } else if (position === 'bottom' && triggerRect.bottom > viewportHeight) {
        newPosition = 'top';
      } else if (position === 'left' && triggerRect.left < 0) {
        newPosition = 'right';
      } else if (position === 'right' && triggerRect.right > viewportWidth) {
        newPosition = 'left';
      }
      setAdjustedPosition(newPosition);
    }
  }, [position]);

  useEffect(() => {
    if (isTooltipVisible) {
      adjustTooltipPosition();
    }
  }, [isTooltipVisible, adjustTooltipPosition]);

  return (
    <div className='tooltip-wrapper'>
      <div
        className='tooltip-trigger'
        ref={triggerRef}
        onMouseEnter={triggerType === 'hover' ? showTooltip : undefined}
        onMouseLeave={triggerType === 'hover' ? hideTooltip : undefined}
        onFocus={triggerType === 'hover' ? showTooltip : undefined}
        onBlur={triggerType === 'hover' ? hideTooltip : undefined}
        onClick={triggerType === 'click' ? showTooltip : undefined}
        onKeyDown={handleKeyPress}
        tabIndex={0}
        aria-expanded={isTooltipVisible}
        aria-describedby='tooltip-content'
        aria-haspopup='true'>
        {children}
      </div>
      {isTooltipVisible && (
        <div
          id='tooltip-content'
          className={`tooltip-content ${adjustedPosition}`}
          ref={tooltipRef}
          role='tooltip'
          aria-hidden={!isTooltipVisible}
          aria-live='polite'>
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
