import MemoryUsageLineChart from '../components/Metrics/DataAnalysis/Charts/MemoryUsageLineChart'

export default [
  {
    'ChartType': MemoryUsageLineChart,
    'storedash': {
      'metricParams': {
        'appName': 'render-server',
        'fields': 'data.summary.external, data.summary.heapTotal, data.summary.heapUsed, data.summary.rss, count',
        'from': 'now-2d/h',
        'interval': '1h',
        'metricName': 'memoryUsage',
        'operation': 'sum',
        'timezone': '-02:00',
        'to': 'now-1d/h',
      },
      'name': 'runtime',
    },
  },
]

