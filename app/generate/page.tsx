"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import BusinessModelOptions from '@/components/BusinessModelOptions';
import SuccessPlan from '@/components/SuccessPlan';
import { generateBusinessModels, generateSuccessPlan } from '@/lib/gemini-api';

const formSchema = z.object({
  interests: z.string().min(2, { message: "Interests must be at least 2 characters." }),
  skills: z.string().min(2, { message: "Skills must be at least 2 characters." }),
  budget: z.enum(["low", "medium", "high"]),
  introduction: z.string().min(10, { message: "Introduction must be at least 10 characters." }),
});

export default function GeneratePage() {
  const [loading, setLoading] = useState(false);
  const [businessModels, setBusinessModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [successPlan, setSuccessPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: "",
      skills: "",
      budget: "low",
      introduction: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const models = await generateBusinessModels(values);
      setBusinessModels(models);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate business models. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleModelSelect(model: string) {
    setSelectedModel(model);
    setLoading(true);
    try {
      const plan = await generateSuccessPlan(model, form.getValues());
      setSuccessPlan(plan);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate success plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Generate Your Business Model</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Form fields remain the same */}
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate Business Models
          </Button>
        </form>
      </Form>

      {businessModels.length > 0 && (
        <BusinessModelOptions
          models={businessModels}
          onSelect={handleModelSelect}
          loading={loading}
        />
      )}

      {successPlan && <SuccessPlan plan={successPlan} />}
    </div>
  );
}