import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useAnalytics } from '../../hooks/useAnalytics';
import AIAssistant from '../AIAssistant/AIAssistant';
// import PDFDownloadButton from '../common/PDFDownloadButton';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const ChartWrapper = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const LoadingOrError = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: ${props => props.isError ? 'red' : 'black'};
`;

function Chart({ title, data }) {

  if (data === undefined && title === undefined)
    return <div></div>
  if (!data || !data.labels || !data.datasets) {
      console.log(data, title)
    return <LoadingOrError>No data available for {title}</LoadingOrError>;
  }

  return (
    <ChartWrapper>
      <h2>{title}</h2>
      <Line data={data} />
    </ChartWrapper>
  );
}

export function ExpenseVsTimeChart({ data }) {
    return <Chart title="Expenses vs Time" data={data} />
}


export function SavingsRemainingChart({ data }) {
    return <Chart title="Savings Remaining vs Time" data={data} />
}


function AnalyticsCharts() {
  const { expenseVsTimeData, savingsRemainingData, expenseForecastData, isLoading, error } = useAnalytics();

  if (isLoading) return <LoadingOrError>Loading charts...</LoadingOrError>;
  if (error) return <LoadingOrError isError>Error loading charts: {error}</LoadingOrError>;

  return (
    <ChartsContainer>
      <h1 style={styles.heading}>Analytics Dashboard</h1>
      <i style={styles.subHeading}>View your financial performance over time</i>
      <div>
        <Chart title="Expenses vs Time" data={expenseVsTimeData} />
        <Chart title="Savings Remaining vs Time" data={savingsRemainingData} />
        <Chart title="Expense Forecast" data={expenseForecastData} />
{/*         <PDFDownloadButton data={{expenseVsTimeData, savingsRemainingData, expenseForecastData}} filename="financial_report.pdf" /> */}
      </div>
      <AIAssistant
        context="analytics"
        data={{ expenseVsTimeData, savingsRemainingData, expenseForecastData }}
      />
    </ChartsContainer>
  );
}

const styles = {
  heading: {
    textAlign: 'center',
    margin: '20px 0 0 0',
    fontSize: '2em',
  },
  subHeading: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '1.2em',
    color: '#666',
  },
};
export default AnalyticsCharts;