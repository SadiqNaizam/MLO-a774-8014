import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowLeft, Send } from 'lucide-react';
import { toast } from "sonner";


const moveMoneyFormSchema = z.object({
  fromAccount: z.string().min(1, "Please select an account to transfer from."),
  toAccount: z.string().min(1, "Recipient account number is required."),
  amount: z.coerce.number().positive("Amount must be positive."),
  reference: z.string().optional(),
});

type MoveMoneyFormValues = z.infer<typeof moveMoneyFormSchema>;

const placeholderFromAccounts = [
  { id: 'acc123', name: 'Everyday Checking (•••• 6789)', balance: 5250.75 },
  { id: 'acc456', name: 'High-Yield Savings (•••• 1234)', balance: 12870.22 },
];

const MoveMoneyPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const defaultFromAccountId = queryParams.get('accountId') || placeholderFromAccounts[0]?.id || "";

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
  console.log('MoveMoneyPage loaded');

  const form = useForm<MoveMoneyFormValues>({
    resolver: zodResolver(moveMoneyFormSchema),
    defaultValues: {
      fromAccount: defaultFromAccountId,
      toAccount: "",
      amount: 0,
      reference: "",
    },
  });

  function onSubmit(data: MoveMoneyFormValues) {
    console.log('Move money submission:', data);
    // Simulate API call for transfer
    setSubmissionStatus('success');
    setSubmissionMessage(`Successfully initiated transfer of $${data.amount} from account ${data.fromAccount} to ${data.toAccount}.`);
    toast.success("Transfer Initiated!", {
      description: `Amount: $${data.amount}, To: ${data.toAccount}`,
    });
    form.reset();
    // navigate('/accounts-dashboard'); // Or to a confirmation page
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <header className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/accounts-dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Move Money</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Move Money</CardTitle>
          <CardDescription>Transfer funds between your accounts or to external recipients.</CardDescription>
        </CardHeader>
        <CardContent>
          {submissionStatus === 'success' && submissionMessage && (
            <Alert variant="default" className="mb-4 bg-green-50 border-green-300 text-green-700">
              <AlertTitle>Transfer Successful</AlertTitle>
              <AlertDescription>{submissionMessage}</AlertDescription>
            </Alert>
          )}
          {submissionStatus === 'error' && submissionMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Transfer Failed</AlertTitle>
              <AlertDescription>{submissionMessage}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fromAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Account</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an account to transfer from" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {placeholderFromAccounts.map(acc => (
                          <SelectItem key={acc.id} value={acc.id}>
                            {acc.name} - Balance: ${acc.balance.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="toAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To Account / Recipient ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter recipient account number or ID" {...field} />
                    </FormControl>
                    <FormDescription>For external transfers, ensure details are correct.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} step="0.01" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reference (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Rent payment, Birthday gift" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <CardFooter className="flex justify-between p-0 pt-6">
                <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  <Send className="mr-2 h-4 w-4" /> Submit Transfer
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoveMoneyPage;