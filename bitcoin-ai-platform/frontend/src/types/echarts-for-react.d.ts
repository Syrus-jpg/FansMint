declare module 'echarts-for-react' {
  import React from 'react';
  
  interface ReactEChartsProps {
    option: any;
    notMerge?: boolean;
    lazyUpdate?: boolean;
    style?: React.CSSProperties;
    className?: string;
    theme?: string | object;
    onChartReady?: (instance: any) => void;
    showLoading?: boolean;
    loadingOption?: object;
    onEvents?: Record<string, Function>;
  }
  
  class ReactECharts extends React.Component<ReactEChartsProps> {}
  
  export default ReactECharts;
} 