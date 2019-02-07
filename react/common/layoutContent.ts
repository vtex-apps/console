import MemoryUsageLineChart from '../components/Metrics/DataAnalysis/Charts/MemoryUsageLineChart'

export default [
  {
    ChartType: MemoryUsageLineChart,
    id: 1,
    storedash: {
      metricParams: {
        fields: 'data.summary.external, data.summary.heapTotal, data.summary.heapUsed, data.summary.rss, count',
        metricName: 'memoryUsage',
        operation: 'sum',
      },
      name: 'runtime',
    },
  },
]

