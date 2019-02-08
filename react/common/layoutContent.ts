import MemoryUsageLineChart from '../components/Metrics/DataAnalysis/Charts/MemoryUsageLineChart'
import StatusCodeBarChart from '../components/Metrics/DataAnalysis/Charts/StatusCodeBarChart'

export default [
  {
    ChartComponent: MemoryUsageLineChart,
    chartType: 'LineChart',
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
  {
    ChartComponent: StatusCodeBarChart,
    chartType: 'BarChart',
    id: 2,
    storedash: {
      metricParams: {
        aggregateBy: 'data.key.httpStatus',
        fields: 'data.summary.count',
        metricName: 'routeStats',
        operation: 'sum',
      },
      name: 'runtime',
    },
  },
]

