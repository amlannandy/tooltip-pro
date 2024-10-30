export interface ITooltipProps {
  content: string;
  triggerType: 'hover' | 'click';
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}
