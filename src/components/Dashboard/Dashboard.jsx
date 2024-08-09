import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import OverviewCard from './OverviewCard';
// import RecentTransactions from './RecentTransactions';
import AIAssistant from '../AIAssistant/AIAssistant';
import { ExpenseVsTimeChart, SavingsRemainingChart } from '../Analytics/AnalyticsCharts';
import { useTransactions } from '../../hooks/useTransactions';
import { useAnalytics } from '../../hooks/useAnalytics';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function Dashboard() {
  const [isExpanseModalVisible, setIsExpanseModalVisible] = useState(false);
  const [isSavingModalVisible, setIsSavingModalVisible] = useState(false);
  const { totalBalance, totalIncome, totalExpenses } = useTransactions();
  const { expenseVsTimeData, savingsRemainingData, refreshData } = useAnalytics();
const aiAssistantData = {
    balance: totalBalance,
    income: totalIncome,
    expenses: totalExpenses,
  };

    useCallback(() => {
      refreshData();
    }, [])
  return (
    <DashboardContainer>
      <MainContent>
        <h1 style={styles.heading}>Overview of Financial Data</h1>
        <OverviewCard
          balance={totalBalance}
          income={totalIncome}
          expenses={totalExpenses}
        />
        <ChartsContainer>
            <ExpenseVsTimeChart data={expenseVsTimeData} isModalVisible={isExpanseModalVisible} setIsModalVisible={setIsExpanseModalVisible} />
        </ChartsContainer>
{/* //         <RecentTransactions transactions={transactions.slice(0, 5)} /> */}
      </MainContent>
      <AIAssistant
        context='dashboard'
        data={
           aiAssistantData
        }
      />
    </DashboardContainer>
  );
}


const styles = {
  heading: {
    textAlign: 'center',
    margin: '20px 0 0 0',
    fontSize: '2em',
  },
};
export default Dashboard;