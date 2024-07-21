'use client';

import Dialog from '@/components/Dialog';
import { useState, useEffect } from 'react';

interface CalculationResult {
  grossSalary: string;
  payeeTax: string;
  deductions: string;
  netSalary: string;
}

const calculateSalaryTax = (annualSalary: number) => {
  const monthlySalary = annualSalary / 12;

  // Tax not applicable for annual salaries below 1.2M
  if (annualSalary <= 1200000) {
    return 0;
  }

  let tax = 0;
  let taxableIncome = monthlySalary - 1200000 / 12;

  const taxBrackets = [
    { limit: 500000 / 12, rate: 0.06 },
    { limit: 500000 / 12, rate: 0.12 },
    { limit: 500000 / 12, rate: 0.18 },
    { limit: 500000 / 12, rate: 0.24 },
    { limit: 500000 / 12, rate: 0.3 },
  ];

  for (const bracket of taxBrackets) {
    if (taxableIncome <= 0) {
      break;
    }

    const taxableAtThisRate = Math.min(bracket.limit, taxableIncome);
    tax += taxableAtThisRate * bracket.rate;
    taxableIncome -= taxableAtThisRate;
  }

  return tax;
};

export default function Home() {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [salaryUSD, setSalaryUSD] = useState('');
  const [usdRateLKR, setUsdRateLKR] = useState('');
  const [result, setResult] = useState<CalculationResult>({
    grossSalary: '',
    payeeTax: '',
    deductions: '',
    netSalary: '',
  });

  useEffect(() => {
    console.log('result', result);
  }, [result]);

  const salaryCal = (rate: number, salaryInUsd: number) => {
    let salary = salaryInUsd * rate;
    const grossSalary = salary.toLocaleString('en-US');

    const annualSalary = salary * 12;
    let apiit = calculateSalaryTax(annualSalary);
    const payeeTax = apiit.toLocaleString('en-US');

    let deductions = salary * 0.11 + apiit;
    let netSalary = salary - deductions;

    setResult({
      grossSalary: grossSalary,
      payeeTax: payeeTax,
      deductions: deductions.toLocaleString('en-US'),
      netSalary: netSalary.toLocaleString('en-US'),
    });

    setSalaryUSD('');
    setUsdRateLKR('');
  };

  const handleCalculate = () => {
    salaryCal(Number(usdRateLKR), Number(salaryUSD));
    setIsResultModalOpen(true);
  };

  return (
    <div className='bg-custom-gradient w-screen h-screen flex flex-col justify-center items-center gap-4 p-4 '>
      <h1 className='text-3xl font-bold text-gray-900 dark:text-white mt-20'>
        Salary Calculator
      </h1>
      <p className='text-gray-700 dark:text-gray-300 text-center'>
        Calculate your USD pegged salary after Sri Lankan Payee tax and EPF
        deductions
      </p>
      <div className='py-5 w-[20rem] mt-1 flex flex-col gap-1.5 items-center justify-center'>
        <div className='w-full'>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Salary in USD
          </label>
          <input
            type='number'
            value={salaryUSD}
            onChange={(e) => setSalaryUSD(e.target.value)}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='100'
            required
          />
        </div>
        <div className='w-full'>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            USD rate in LKR
          </label>
          <input
            type='number'
            value={usdRateLKR}
            onChange={(e) => setUsdRateLKR(e.target.value)}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='300'
            required
          />
        </div>
        <button
          type='button'
          className='text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-sm py-2.5 mb-2 focus:outline-none w-full mt-4'
          onClick={handleCalculate}
          disabled={!salaryUSD || !usdRateLKR}
        >
          Calculate
        </button>
      </div>
      <Dialog
        isOpen={isResultModalOpen}
        onOpenChange={setIsResultModalOpen}
        result={result}
      />
      <span className='block mb-2 text-sm font-light text-gray-900 dark:text-white'>
        &copy; {new Date().getFullYear()} developed by rasangalk. All rights
        reserved.
      </span>
    </div>
  );
}
