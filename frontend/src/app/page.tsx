"use client"
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CreateBuzzForm from '@/components/CreateBuzzForm';

interface Buzz {
  id: string;
  content: string;
  createdAt: string;
  author: string | null;
}

const fetchBuzzes = async (): Promise<Buzz[]> => {
  const res = await fetch('http://localhost:8080/api/buzz', {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch buzzes');
  }

  return res.json();
};

export default function Home() {
  const [buzzes, setBuzzes] = useState<Buzz[]>([]);

  useEffect(() => {
    const loadBuzzes = async () => {
      try {
        const fetchedBuzzes = await fetchBuzzes();
        setBuzzes(fetchedBuzzes);
      } catch (error) {
        console.error('Error fetching buzzes:', error);
      }
    };

    loadBuzzes();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="max-w-5xl mx-auto flex space-x-4">
      <div className="flex-1 space-y-4">
        {buzzes.map((buzz) => (
          <div key={buzz.id} className="mb-4">
            <Card>
              <CardHeader>
                <CardTitle>{buzz.content}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Created at: {formatDate(buzz.createdAt)}
                </CardDescription>
                <CardDescription>
                  Author: {buzz.author || 'Anonymous'}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <div className="w-80">
        <Card>
          <CardHeader>
            <CardTitle>Create Buzz</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateBuzzForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
