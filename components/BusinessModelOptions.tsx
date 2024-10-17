import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface BusinessModelOptionsProps {
  models: string[];
  onSelect: (model: string) => void;
  loading: boolean;
}

const BusinessModelOptions: React.FC<BusinessModelOptionsProps> = ({ models, onSelect, loading }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Suggested Business Models</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {models.map((model, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{model}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                This business model aligns with your interests, skills, and budget.
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button onClick={() => onSelect(model)} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  'Select & Generate Plan'
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BusinessModelOptions;