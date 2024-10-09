"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Custom wrapper components for XAxis and YAxis
const CustomXAxis = (props) => <XAxis {...props} />;
const CustomYAxis = (props) => <YAxis {...props} />;

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('expenses');

  // Mock data for the charts
  const expensesData = [
    { category: 'Food', amount: 300 },
    { category: 'Transport', amount: 150 },
    { category: 'Entertainment', amount: 100 },
    { category: 'Utilities', amount: 200 },
  ];

  const incomeData = [
    { source: 'Salary', amount: 3000 },
    { source: 'Freelance', amount: 500 },
    { source: 'Investments', amount: 200 },
  ];

  const data = selectedReport === 'expenses' ? expensesData : incomeData;
  const dataKey = selectedReport === 'expenses' ? 'category' : 'source';

  const axisProps = {
    tick: { fill: 'currentColor' },
    axisLine: { stroke: 'currentColor' },
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Reports</h1>
      
      <div className="mb-4">
        <Select onValueChange={(value) => setSelectedReport(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expenses">Expenses</SelectItem>
            <SelectItem value="income">Income</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{selectedReport === 'expenses' ? 'Expense' : 'Income'} Report</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <CustomXAxis dataKey={dataKey} {...axisProps} />
              <CustomYAxis {...axisProps} />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="mt-4">
        <Button>Download Report</Button>
      </div>
    </div>
  );
}