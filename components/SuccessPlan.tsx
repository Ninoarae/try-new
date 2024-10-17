import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface SuccessPlanProps {
  plan: string;
}

const SuccessPlan: React.FC<SuccessPlanProps> = ({ plan }) => {
  const downloadPlan = () => {
    const element = document.createElement('a');
    const file = new Blob([plan], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'success_plan.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Your Success Plan</CardTitle>
        <CardDescription>Here's a detailed plan to help you succeed with your chosen business model.</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="whitespace-pre-wrap bg-secondary p-4 rounded-md">{plan}</pre>
        <Button onClick={downloadPlan} className="mt-4">
          <Download className="mr-2 h-4 w-4" /> Download Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuccessPlan;