// orderplaced: total income (operation = sum) or total orders placed (operation = count)
// unit: cada país
import LineChartContent from '../components/Metrics/DataAnalysis/LineChartContent'
import StackedBarChartContent from '../components/Metrics/DataAnalysis/StackedBarChartContent'
import BarChartContent from '../components/Metrics/DataAnalysis/BarChartContent';

export default [
  {
    'ChartType': LineChartContent,
    'storedash': {
      'metricName': 'orderpulse',
      'metricParams': {
        'operation': 'sum',
        'from': 'now-1h',
        'to': 'now',
        'interval': '10m'
      }
    }
  },
  {
    'ChartType': BarChartContent,
    'storedash': {
      'metricName': 'orderplaced',
      'metricParams': {
        'from': '2018-11-09T12:00:00-03:00',
        'to': '2018-11-09T12:01:00-03:00',
        'operation': 'sum',
        'aggregateBy': 'unit'
      },
    }
  }
]






// não sei por que, deu problema. Atencao para o que a interface storeDashInput tem
// aggregateBy: "unit",
// from: "2017-11",
// to: "now",
// interval: "hour",
// operation: "count"
// {
//   'chartType': 'LineChart',
//   'storedash': {
//     'metricName': 'approveditem',
//     'metricParams': {
//       'accountName': 'boticario',
//       'aggregateBy': 'unit,data.sku',
//       'day': '2017-01-12',
//       'interval': 'hour',
//       'operation': 'count'
//     }
//   }
// }

