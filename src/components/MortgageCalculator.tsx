'use client';

import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, CalendarDays, ShieldCheck } from 'lucide-react';

interface MortgageCalculatorProps {
  initialPrice?: number;
}

export default function MortgageCalculator({ initialPrice = 2500000 }: MortgageCalculatorProps) {
  const [homePrice, setHomePrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);

  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const loanAmount = homePrice - downPaymentAmount;

  // Monthly mortgage calculation formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  let monthlyPrincipalAndInterest = 0;
  if (monthlyInterestRate > 0) {
    monthlyPrincipalAndInterest =
      (loanAmount *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  } else {
    monthlyPrincipalAndInterest = loanAmount / numberOfPayments;
  }

  const estimatedPropertyTaxMonthly = (homePrice * 0.012) / 12;
  const estimatedInsuranceMonthly = (homePrice * 0.004) / 12;
  const totalMonthlyPayment = Math.round(
    monthlyPrincipalAndInterest + estimatedPropertyTaxMonthly + estimatedInsuranceMonthly
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Mortgage & Payment Estimator</h3>
          <p className="text-xs text-slate-400">Estimate your monthly investment and financing terms</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Home Price Input */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
              <span>Home Purchase Price</span>
              <span className="text-amber-400 font-bold">${homePrice.toLocaleString()}</span>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-slate-500">$</span>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-8 pr-4 text-white text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>
            <input
              type="range"
              min={200000}
              max={10000000}
              step={50000}
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full mt-2 accent-amber-500"
            />
          </div>

          {/* Down Payment */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Down Payment (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={5}
                  max={50}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-white text-sm focus:border-amber-500 focus:outline-none"
                />
                <Percent className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Down Payment Amount
              </label>
              <div className="py-2.5 px-3 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 text-sm font-bold">
                ${Math.round(downPaymentAmount).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Interest Rate & Term */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="15"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-white text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Loan Term (Years)
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-white text-sm focus:border-amber-500 focus:outline-none"
              >
                <option value={30}>30 Years Fixed</option>
                <option value={20}>20 Years Fixed</option>
                <option value={15}>15 Years Fixed</option>
                <option value={10}>10 Years Fixed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary Box */}
        <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block mb-1">
              Estimated Monthly Payment
            </span>
            <div className="text-3xl lg:text-4xl font-black text-amber-400 tracking-tight">
              ${totalMonthlyPayment.toLocaleString()}{' '}
              <span className="text-sm font-medium text-slate-400">/ mo</span>
            </div>

            <div className="mt-6 space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-900">
                <span className="text-slate-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  Principal & Interest
                </span>
                <span className="font-bold text-white">
                  ${Math.round(monthlyPrincipalAndInterest).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-900">
                <span className="text-slate-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />
                  Property Tax Est. (1.2%)
                </span>
                <span className="font-bold text-white">
                  ${Math.round(estimatedPropertyTaxMonthly).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-900">
                <span className="text-slate-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  Homeowner Insurance Est.
                </span>
                <span className="font-bold text-white">
                  ${Math.round(estimatedInsuranceMonthly).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-900 text-[11px] text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Estimates provided for informational purposes. Pre-approval required for exact lender terms.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
