import * as React from 'react';

interface EmailTemplateProps {
  amount: number;
}

export function EmailTemplate({ amount }: EmailTemplateProps) {
  return (
    <div>
      <p>Your booking has been confirmed.</p>
      <p>Amount Paid: ${amount}</p>
    </div>
  );
}