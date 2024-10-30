import React, { useState, useRef, useEffect, useCallback } from 'react';
import './styles.css';
import { ITooltipProps } from './types';

const Tooltip: React.FC<ITooltipProps> = ({
  content,
  triggerType,
  position = 'top',
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      hideTooltip();
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
    if (isVisible) {
      adjustTooltipPosition();
    }
  }, [isVisible, adjustTooltipPosition]);

  useEffect(() => {
    if (triggerType === 'click' && isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible, triggerType, handleClickOutside]);

  return (
    <div className='tooltip-wrapper' onKeyDown={handleKeyPress}>
      <div
        className='tooltip-trigger'
        ref={triggerRef}
        onMouseEnter={triggerType === 'hover' ? showTooltip : undefined}
        onMouseLeave={triggerType === 'hover' ? hideTooltip : undefined}
        onClick={triggerType === 'click' ? showTooltip : undefined}
        tabIndex={0}>
        {children}
      </div>
      {isVisible && (
        <div
          className={`tooltip-content ${adjustedPosition}`}
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
