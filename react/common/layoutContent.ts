import CpuUsageLineChart from '../components/Metrics/DataAnalysis/CpuUsageLineChart'
import MemoryUsageLineChart from '../components/Metrics/DataAnalysis/MemoryUsageLineChart'

export default [
  {
    'ChartType': MemoryUsageLineChart,
    'storedash': {
      'name': 'runtime',
      'metricParams': {
        'appName': 'render-server',
        'metricName': 'memoryUsage',
        'from': 'now-2d/h',
        'to': 'now-1d/h',
        'interval': '1h',
        'operation': 'sum',
        'fields': 'data.summary.external, data.summary.heapTotal, data.summary.heapUsed, data.summary.rss, count',
        'timezone': '-02:00',
      }
    }
  },
]


// {
//   'ChartType': CpuUsageLineChart,
//   'storedash': {
//     'name': 'runtime',
//     'metricParams': {
//       'appName': 'render-server',
//       'metricName': 'cpuUsage',
//       'from': 'now-2d/h',
//       'to': 'now-1d/h',
//       'interval': '1h',
//       'operation': 'sum',
//       'fields': 'data.summary.system, data.summary.user, count',
//     }
//   }
// },

// 'appVersion': '8.1.0',
// 'region': 'aws-us-east-1',
