import { BarChart, BarSeriesOption } from 'echarts/charts';
import {
  GridComponent,
  GridComponentOption,
  TitleComponent,
  TitleComponentOption,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect, useRef } from 'react';
const BarCharts = ({
  title,
  xData,
  sData,
  style = { width: '400px', height: '300px' },
}: {
  title: string;
  xData: string[];
  sData: number[];
  style?: React.CSSProperties;
}) => {
  const chartRef = useRef(null);
  useEffect(() => {
    // 保证dom可用才进行图表渲染
    echarts.use([TitleComponent, GridComponent, BarChart, CanvasRenderer]);

    type EChartsOption = echarts.ComposeOption<
      TitleComponentOption | GridComponentOption | BarSeriesOption
    >;
    // 1. 获取渲染图表的DOM节点
    const chartDom = chartRef.current;
    // 2. 初始化图表实例对象
    const myChart = echarts.init(chartDom);
    // 3.准备图表参数
    const option: EChartsOption = {
      title: [
        {
          text: title,
        },
      ],
      xAxis: {
        type: 'category',
        data: xData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: sData,
          type: 'bar',
        },
      ],
    };

    option && myChart.setOption(option);
  }, []);
  return <div ref={chartRef} style={style}></div>;
};

export default BarCharts;
