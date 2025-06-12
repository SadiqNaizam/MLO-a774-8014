import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Lock, Unlock, ShieldAlert, CreditCard, ArrowLeft } from 'lucide-react';
import { toast } from "sonner";


const CardControlsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const accountId = queryParams.get('accountId'); // To identify which card if multiple
  
  console.log('CardControlsPage loaded for accountId:', accountId);

  const [isCardFrozen, setIsCardFrozen] = useState(false);
  const [spendingLimitEnabled, setSpendingLimitEnabled] = useState(false);
  const [spendingLimit, setSpendingLimit] = useState(500); // Example limit
  const [transactionTypes, setTransactionTypes] = useState<string[]>(['online', 'atm']);

  const handleFreezeToggle = (checked: boolean) => {
    setIsCardFrozen(checked);
    toast.info(`Card is now ${checked ? 'Frozen' : 'Unfrozen'}.`);
  };

  const handleReportLostStolen = () => {
    setIsCardFrozen(true); // Automatically freeze
    toast.error("Card Reported Lost/Stolen!", {
      description: "Your card has been frozen. Please contact support for a replacement.",
      duration: 10000,
    });
    // Further logic to report card
  };
  
  const handleSaveChanges = () => {
    console.log("Saving card control changes:", { isCardFrozen, spendingLimitEnabled, spendingLimit, transactionTypes });
    toast.success("Card settings updated successfully!");
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
              <BreadcrumbPage>Card Controls</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <CreditCard className="mr-3 h-7 w-7 text-blue-600" /> Card Controls
          </CardTitle>
          <CardDescription>Manage your debit/credit card settings. {accountId && `(For account ending ${accountId.slice(-4)})`}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="freeze-card" className="text-base font-medium">
                {isCardFrozen ? "Card Frozen" : "Freeze Card"}
              </Label>
              <p className="text-sm text-gray-500">
                Temporarily block all transactions on your card.
              </p>
            </div>
            <Switch
              id="freeze-card"
              checked={isCardFrozen}
              onCheckedChange={handleFreezeToggle}
              className="data-[state=checked]:bg-red-500"
            />
          </div>

          <div className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
                 <Label htmlFor="spending-limit-toggle" className="text-base font-medium">
                    Spending Limit
                 </Label>
                 <Switch
                    id="spending-limit-toggle"
                    checked={spendingLimitEnabled}
                    onCheckedChange={setSpendingLimitEnabled}
                  />
            </div>
            {spendingLimitEnabled && (
                 <div>
                    <Label htmlFor="spending-limit-amount">Set Limit Amount ($)</Label>
                    <input
                      id="spending-limit-amount"
                      type="number"
                      value={spendingLimit}
                      onChange={(e) => setSpendingLimit(Number(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                      placeholder="e.g., 500"
                    />
                 </div>
            )}
             <p className="text-sm text-gray-500">
                Control your monthly spending.
              </p>
          </div>
          
          <div className="p-4 border rounded-lg space-y-3">
            <Label className="text-base font-medium">Allowed Transaction Types</Label>
            <ToggleGroup
              type="multiple"
              variant="outline"
              value={transactionTypes}
              onValueChange={(value) => {
                if (value) setTransactionTypes(value);
              }}
              className="flex flex-wrap gap-2"
            >
              <ToggleGroupItem value="online" aria-label="Toggle online transactions">Online Purchases</ToggleGroupItem>
              <ToggleGroupItem value="in-store" aria-label="Toggle in-store transactions">In-Store Purchases</ToggleGroupItem>
              <ToggleGroupItem value="atm" aria-label="Toggle ATM withdrawals">ATM Withdrawals</ToggleGroupItem>
              <ToggleGroupItem value="contactless" aria-label="Toggle contactless payments">Contactless</ToggleGroupItem>
            </ToggleGroup>
             <p className="text-sm text-gray-500">
                Enable or disable specific types of card usage.
              </p>
          </div>

          <Alert variant="default" className="bg-yellow-50 border-yellow-300 text-yellow-800">
            <ShieldAlert className="h-5 w-5 text-yellow-600" />
            <AlertTitle>Security Tip</AlertTitle>
            <AlertDescription>
              Regularly review your card settings and report any suspicious activity immediately.
            </AlertDescription>
          </Alert>

        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 pt-6">
          <Button variant="outline" onClick={() => navigate(-1)} className="w-full sm:w-auto">
             <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button variant="destructive" onClick={handleReportLostStolen} className="w-full sm:w-auto">
                <ShieldAlert className="mr-2 h-4 w-4" /> Report Lost/Stolen
            </Button>
            <Button onClick={handleSaveChanges} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                Save Changes
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardControlsPage;