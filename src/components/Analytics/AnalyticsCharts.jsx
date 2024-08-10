import React, { useState } from 'react';
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

const LoadingOrError = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: ${props => props.isError ? 'red' : 'black'};
`;


function Chart({ title, data, isModalVisible, setIsModalVisible }) {
  if (!data || !data.labels || !data.datasets) {
    return <p style={styles.loadingOrError}>No data available for {title}</p>;
  }

  const currentMonthIndex = new Date().getMonth();
  const numberOfMonths = 3;
  const prevMonths = currentMonthIndex - numberOfMonths >= 1 ? currentMonthIndex - numberOfMonths : 0;

  const currentChartData = {
    labels: data.labels.slice(prevMonths, currentMonthIndex + 1),
    datasets: [{
      ...data.datasets[0],
      data: data.datasets[0].data.slice(prevMonths, currentMonthIndex + 1),
    }],
  };

  return (
    <div style={styles.chartWrapper}>
      <span style={styles.titleContainer}>
          <h2 style={styles.chartTitle}>{title}</h2>
          <button style={styles.showButton} onClick={() => setIsModalVisible(true)}>Show Full Year Graph</button>
      </span>
      <Line data={currentChartData} options={chartConfig} />
      <FullScreenGraphModal
        title={title}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        chartData={data}
      />
    </div>
  );
}

const FullScreenGraphModal = ({ title, visible, onClose, chartData }) => {
  if (!chartData || !chartData.labels || !chartData.datasets) {
    return (
      <div style={visible ? styles.modalOverlay : { display: 'none' }}>
        <div style={styles.modalContent}>
          <p style={styles.loadingOrError}>No data available for {title}</p>
        </div>
      </div>
    );
  }

  const currentChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: chartData.datasets,
  };

  return (
    <div style={visible ? styles.modalOverlay : { display: 'none' }}>

    <div style={styles.popupOverlay}>
      <div style={styles.popupContent}>
        <span style={styles.titleContainer}><h2 style={styles.chartTitle}>{title} </h2>
        <button onClick={onClose} style={styles.closeButton}>Close</button> </span>
        <Line data={currentChartData} options={chartConfig} />
      </div>
    </div>
    </div>
  );
};

export function ExpenseVsTimeChart({ data, isModalVisible, setIsModalVisible }) {
  return (
    <div>
      <Chart title="Expenses vs Time" data={data} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </div>
  );
}

export function SavingsRemainingChart({ data, isModalVisible, setIsModalVisible }) {
  return (
    <div>
           <Chart title="Savings Remaining vs Time" data={data} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
     </div>
  );
}

function AnalyticsCharts() {
    const [isExpanseModalVisible, setIsExpanseModalVisible] = useState(false);
    const [isSavingModalVisible, setIsSavingModalVisible] = useState(false);
    const [isForcastModalVisible, setIsForcastModalVisible] = useState(false);
    const { expenseVsTimeData, savingsRemainingData, expenseForecastData, isLoading, error } = useAnalytics();

  if (isLoading) return <LoadingOrError>Loading charts...</LoadingOrError>;
  if (error) return <LoadingOrError isError>Error loading charts: {error}</LoadingOrError>;

  return (
    <ChartsContainer>
      <h1 style={styles.heading}>Analytics Dashboard</h1>
      <i style={styles.subHeading}>View your financial performance over time</i>
      <div style={styles.chartContainer}>
        <Chart title="Expenses vs Time" data={expenseVsTimeData} isModalVisible={isExpanseModalVisible} setIsModalVisible={setIsExpanseModalVisible} />
        <Chart title="Savings Remaining vs Time" data={savingsRemainingData} isModalVisible={isSavingModalVisible} setIsModalVisible={setIsSavingModalVisible} />
        <Chart title="Expense Forecast" data={expenseForecastData} isModalVisible={isForcastModalVisible} setIsModalVisible={setIsForcastModalVisible}/>
      </div>
      <AIAssistant
        context="analytics"
        data={{ expenseVsTimeData, savingsRemainingData, expenseForecastData }}
      />
    </ChartsContainer>
  );
}
const chartConfig = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
const styles = {
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '400px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  },
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
  showButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '5px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: '5px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
  titleContainer: {
      "display": "flex",
      "justifyContent": "space-between"
  },
  chartContainer: {
      "display": "flex",
      "flexDirection": "column",
      "gap": '20px',
      "padding": "20px"
  }
};
export default AnalyticsCharts;