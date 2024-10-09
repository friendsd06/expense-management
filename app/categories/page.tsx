"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Food' },
    { id: 2, name: 'Transport' },
    { id: 3, name: 'Utilities' },
    { id: 4, name: 'Entertainment' },
  ]);
  const [newCategory, setNewCategory] = useState('');
  const { toast } = useToast();

  const handleAddCategory = () => {
    if (!newCategory) {
      toast({
        title: "Error",
        description: "Please enter a category name.",
        variant: "destructive",
      });
      return;
    }

    const categoryExists = categories.some(
      (category) => category.name.toLowerCase() === newCategory.toLowerCase()
    );

    if (categoryExists) {
      toast({
        title: "Error",
        description: "This category already exists.",
        variant: "destructive",
      });
      return;
    }

    const newCategoryItem = {
      id: Date.now(),
      name: newCategory,
    };

    setCategories([...categories, newCategoryItem]);
    setNewCategory('');

    toast({
      title: "Category added",
      description: "Your new category has been successfully added.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Categories</h1>
      
      <div className="flex gap-4 mb-8">
        <Input
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button onClick={handleAddCategory}>Add Category</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}