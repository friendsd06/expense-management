"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

export default function BudgetPage() {
  const [budgets, setBudgets] = useState([
    { category: 'Food', amount: 500, spent: 300 },
    { category: 'Transport', amount: 300, spent: 150 },
    { category: 'Utilities', amount: 200, spent: 180 },
    { category: 'Entertainment', amount: 150, spent: 100 },
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const { toast } = useToast();

  const handleAddBudget = () => {
    if (!newCategory || !newAmount) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const newBudget = {
      category: newCategory,
      amount: parseFloat(newAmount),
      spent: 0,
    };

    setBudgets([...budgets, newBudget]);
    setNewCategory('');
    setNewAmount('');

    toast({
      title: "Budget added",
      description: "Your new budget category has been successfully added.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Set Budget</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Input
          placeholder="Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Budget Amount"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
        />
        <Button onClick={handleAddBudget}>Add Budget</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{budget.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Budget: ${budget.amount}</p>
              <p className="mb-2">Spent: ${budget.spent}</p>
              <Progress value={(budget.spent / budget.amount) * 100} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                {((budget.spent / budget.amount) * 100).toFixed(2)}% of budget used
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}