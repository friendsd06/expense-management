"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState([
    { id: 1, name: 'Stock A', type: 'Stock', amount: 5000, returns: 7.5 },
    { id: 2, name: 'Bond B', type: 'Bond', amount: 10000, returns: 3.2 },
    { id: 3, name: 'ETF C', type: 'ETF', amount: 7500, returns: 5.8 },
  ]);
  const [newInvestmentName, setNewInvestmentName] = useState('');
  const [newInvestmentType, setNewInvestmentType] = useState('');
  const [newInvestmentAmount, setNewInvestmentAmount] = useState('');
  const { toast } = useToast();

  const handleAddInvestment = () => {
    if (!newInvestmentName || !newInvestmentType || !newInvestmentAmount) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const newInvestment = {
      id: Date.now(),
      name: newInvestmentName,
      type: newInvestmentType,
      amount: parseFloat(newInvestmentAmount),
      returns: 0, // Initial returns
    };

    setInvestments([...investments, newInvestment]);
    setNewInvestmentName('');
    setNewInvestmentType('');
    setNewInvestmentAmount('');

    toast({
      title: "Investment Added",
      description: "Your new investment has been added to your portfolio.",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Investment Portfolio</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Investment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Investment Name"
              value={newInvestmentName}
              onChange={(e) => setNewInvestmentName(e.target.value)}
            />
            <Select value={newInvestmentType} onValueChange={setNewInvestmentType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Stock">Stock</SelectItem>
                <SelectItem value="Bond">Bond</SelectItem>
                <SelectItem value="ETF">ETF</SelectItem>
                <SelectItem value="Mutual Fund">Mutual Fund</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Amount"
              value={newInvestmentAmount}
              onChange={(e) => setNewInvestmentAmount(e.target.value)}
            />
            <Button onClick={handleAddInvestment}>Add Investment</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Investments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Returns (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investments.map((investment) => (
                <TableRow key={investment.id}>
                  <TableCell>{investment.name}</TableCell>
                  <TableCell>{investment.type}</TableCell>
                  <TableCell>${investment.amount.toFixed(2)}</TableCell>
                  <TableCell>{investment.returns}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}