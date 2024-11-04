import React, { useEffect, useState } from 'react';
import { AxisOptions, Chart } from 'react-charts';


const API_URL = '//localhost:8000'

type YieldInfo = {
  avg_interest_rate_amt: string,
  // record_calendar_day: string,
  // record_calendar_month: string,
  // record_calendar_quarter: string,
  // record_calendar_year: string,
  record_date: string,
  // record_fiscal_quarter: string,
  // record_fiscal_year: string,
  security_desc: string,
  // security_type_desc: string,
  // src_line_nbr: string,
}

type Series = {
  label: string,
  data: YieldInfo[],
}

// Testing data:
/*
{
  "data": [
    {
      "record_date": "2024-01-31",
      "security_type_desc": "Marketable",
      "security_desc": "Treasury Bills",
      "avg_interest_rate_amt": "5.411",
      "src_line_nbr": "1",
      "record_fiscal_year": "2024",
      "record_fiscal_quarter": "2",
      "record_calendar_year": "2024",
      "record_calendar_quarter": "1",
      "record_calendar_month": "01",
      "record_calendar_day": "31"
    },
    ...
  ]    
*/

// const DATA: Series[] = [
//   {
//     label: 'Treasury Yields',
//     data: [
//       {
//         record_date: '2024-01-31',
//         avg_interest_rate_amt: '5.411',
//       },
//       {
//         record_date: '2024-02-28',
//         avg_interest_rate_amt: '6.411',
//       },
//       {
//         record_date: '2024-03-31',
//         avg_interest_rate_amt: '1.411',
//       },
//     ],
//   },
// ]

interface ChartYieldsProps {
  terms?: string;
  year?: string;
}

function ChartYields(props: ChartYieldsProps) {
  const [data, setData] = useState<Series[]>();
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/treasury_yields?terms=${props.terms}&year=${props.year}`);
      const res = await response.json();
      console.log(res);
      if (res && res.data && res.data.length) {
        setMessage('')
        setData(new Array({
          label: 'Treasury Yields',
          data: res.data,
        }));
      } else {
        setMessage('No Data');
      }
    };

    fetchData();
  }, [props.terms, props.year]);

  const primaryAxis = React.useMemo(
    (): AxisOptions<YieldInfo> => ({
      getValue: datum => datum.record_date,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<YieldInfo>[] => [
      {
        getValue: datum => parseFloat(datum.avg_interest_rate_amt),
        elementType: 'line',
      },
    ],
    []
  );

  console.log('data=', data);

  return (data ? <>
    <Chart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
      }}
    />
  </> : <p>{message !== '' ? message : 'Loading...'}</p>)
}


export default ChartYields;
