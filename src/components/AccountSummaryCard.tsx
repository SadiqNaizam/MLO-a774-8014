import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight, Plus, Minus, DollarSign } from 'lucide-react'; // Using ChevronRight for move money, Plus/Minus for collapsible

// Define a type for individual quick info items if they have a structure
// For simplicity, quickInfo.content is React.ReactNode
// interface QuickInfoItem {
//   id: string;
//   description: string;
//   amount: string;
//   date: string;
// }

interface AccountSummaryCardProps {
  accountId: string;
  accountName: string;
  accountMaskedNumber: string; // e.g., "•••• 1234" or "Savings Account"
  balance: number;
  currencySymbol?: string;
  onMoveMoneyClick: (accountId: string) => void;
  quickInfo?: {
    title?: string; // e.g., "Recent Activity"
    content: React.ReactNode; // Could be a list of transactions, etc.
  };
  // TSB (The hypothetical bank) specific colors - using generic Tailwind colors for now
  // For "TSB blue", we'll use 'bg-blue-600 hover:bg-blue-700'. This can be customized in tailwind.config.js
  // For "blue stroke", Button variant="outline" typically uses the primary color.
}

const AccountSummaryCard: React.FC<AccountSummaryCardProps> = ({
  accountId,
  accountName,
  accountMaskedNumber,
  balance,
  currencySymbol = '$',
  onMoveMoneyClick,
  quickInfo,
}) => {
  const [isQuickInfoOpen, setIsQuickInfoOpen] = useState(false);
  console.log(`Rendering AccountSummaryCard for ${accountName} (ID: ${accountId})`);

  const handleMoveMoney = () => {
    console.log(`Move money clicked for account ID: ${accountId}`);
    onMoveMoneyClick(accountId);
  };

  const formatBalance = (amount: number) => {
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-800">{accountName}</CardTitle>
            <p className="text-sm text-gray-500">{accountMaskedNumber}</p>
          </div>
          {quickInfo && (
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsQuickInfoOpen(!isQuickInfoOpen)}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8" // TSB blue background
                aria-label={isQuickInfoOpen ? "Collapse quick info" : "Expand quick info"}
              >
                {isQuickInfoOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </Button>
            </CollapsibleTrigger>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <div className="text-3xl font-bold text-gray-900 my-4">
          {currencySymbol}
          {formatBalance(balance)}
        </div>
        
        {quickInfo && (
          <Collapsible open={isQuickInfoOpen} onOpenChange={setIsQuickInfoOpen}>
            {/* Trigger is outside, part of CardHeader for layout reasons */}
            <CollapsibleContent className="mt-2 space-y-2 text-sm text-gray-700 border-t pt-3">
              {quickInfo.title && <h4 className="font-medium mb-1">{quickInfo.title}</h4>}
              {quickInfo.content}
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button
          variant="outline" // For white background, blue stroke (assuming primary is blue)
          className="w-full rounded-full text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700" // Pill shape, specific styling
          onClick={handleMoveMoney}
        >
          Move money
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountSummaryCard;