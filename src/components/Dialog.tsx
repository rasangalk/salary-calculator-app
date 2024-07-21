import React from 'react';
import {
  Dialog as UIDialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  result: {
    grossSalary: string;
    payeeTax: string;
    deductions: string;
    netSalary: string;
  };
}

const Dialog = ({ isOpen, onOpenChange, result }: Props) => (
  <UIDialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>
      <button className='hidden'>Open</button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Calculation Result</DialogTitle>
        <DialogDescription>
          <p>Gross Salary: LKR {result.grossSalary}</p>
          <p>Payee Tax: LKR {result.payeeTax}</p>
          <p>Deductions: LKR {result.deductions}</p>
          <p>Net Salary: LKR {result.netSalary}</p>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </UIDialog>
);

export default Dialog;
