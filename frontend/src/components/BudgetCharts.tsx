"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface BudgetChartsProps {
  budget: {
    transport: number;
    stay: number;
    meals: number;
    activities: number;
  };
}

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'];

export function BudgetPieChart({ budget }: BudgetChartsProps) {
  const data = [
    { name: 'Transport', value: budget.transport },
    { name: 'Stay', value: budget.stay },
    { name: 'Meals', value: budget.meals },
    { name: 'Activities', value: budget.activities },
  ].filter(item => item.value > 0);

  if (data.length === 0) {
    return <div className="flex h-full items-center justify-center text-slate-500">No budget data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <RechartsTooltip formatter={(value: any) => `$${value}`} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function BudgetBarChart({ budget }: BudgetChartsProps) {
  const data = [
    { name: 'Transport', cost: budget.transport },
    { name: 'Stay', cost: budget.stay },
    { name: 'Meals', cost: budget.meals },
    { name: 'Activities', cost: budget.activities },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis tickFormatter={(value) => `$${value}`} axisLine={false} tickLine={false} width={60} />
        <RechartsTooltip formatter={(value: any) => `$${value}`} cursor={{ fill: 'transparent' }} />
        <Bar dataKey="cost" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
