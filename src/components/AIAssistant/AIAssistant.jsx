// src/components/AIAssistant/AIAssistant.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAIAssistant } from '../../hooks/useAIAssistant';

const AIAssistantContainer = styled.div`
  background: #f0f8ff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

function AIAssistant({ context, data }) {
  const { getAdvice, isLoading, error } = useAIAssistant();
  const [advice, setAdvice] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchAdvice = async () => {
      try {
          let jsonData = JSON.stringify(data)
        const newAdvice = await getAdvice(context, jsonData);
        if (isMounted) {
          setAdvice(newAdvice);
        }
      } catch (err) {
        console.error('Error fetching advice:', err);
      }
    };

    fetchAdvice();

    return () => {
      isMounted = false;
    };
  }, [context, data, getAdvice]);

  if (isLoading) return <div>Loading advice...</div>;
  if (error) return <div>Error loading advice: {error.message}</div>;

  return (
    <AIAssistantContainer>
      <h2>AI Financial Assistant</h2>
      <p>{advice}</p>
    </AIAssistantContainer>
  );
}

export default React.memo(AIAssistant);