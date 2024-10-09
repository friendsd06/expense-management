"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

export default function GoalsPage() {
  const [goals, setGoals] = useState([
    { id: 1, name: 'Emergency Fund', target: 10000, current: 5000 },
    { id: 2, name: 'Vacation', target: 5000, current: 2000 },
    { id: 3, name: 'New Car', target: 30000, current: 10000 },
  ]);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const { toast } = useToast();

  const handleAddGoal = () => {
    if (!newGoalName || !newGoalTarget) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const newGoal = {
      id: Date.now(),
      name: newGoalName,
      target: parseFloat(newGoalTarget),
      current: 0,
    };

    setGoals([...goals, newGoal]);
    setNewGoalName('');
    setNewGoalTarget('');

    toast({
      title: "Goal Added",
      description: "Your new savings goal has been added.",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Savings Goals</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Goal Name"
              value={newGoalName}
              onChange={(e) => setNewGoalName(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Target Amount"
              value={newGoalTarget}
              onChange={(e) => setNewGoalTarget(e.target.value)}
            />
            <Button onClick={handleAddGoal}>Add Goal</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <Card key={goal.id}>
            <CardHeader>
              <CardTitle>{goal.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Target: ${goal.target}</p>
              <p className="mb-2">Current: ${goal.current}</p>
              <Progress value={(goal.current / goal.target) * 100} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                {((goal.current / goal.target) * 100).toFixed(2)}% of goal reached
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}