import React from 'react';
import styled from 'styled-components';
import OverviewCard from './OverviewCard';
// import RecentTransactions from './RecentTransactions';
import AIAssistant from '../AIAssistant/AIAssistant';
import { ExpenseVsTimeChart, SavingsRemainingChart } from '../Analytics/AnalyticsCharts';
import { useTransactions } from '../../hooks/useTransactions';
import { useAIAssistant } from '../../hooks/useAIAssistant';
import { useAnalytics } from '../../hooks/useAnalytics';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
  padding: 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

function Dashboard() {
  const { transactions, totalBalance, totalIncome, totalExpenses } = useTransactions();
  const { expenseVsTimeData, savingsRemainingData } = useAnalytics();
const aiAssistantData = {
    balance: totalBalance,
    income: totalIncome,
    expenses: totalExpenses,
  };
  return (
    <DashboardContainer>
      <MainContent>
        <OverviewCard
          balance={totalBalance}
          income={totalIncome}
          expenses={totalExpenses}
        />
        <ChartsContainer>
          <ExpenseVsTimeChart data={expenseVsTimeData} />
          <SavingsRemainingChart data={savingsRemainingData} />
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

export default Dashboard;