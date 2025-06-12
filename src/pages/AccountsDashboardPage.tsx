import React from 'react';
import { useNavigate } from 'react-router-dom';
import AccountSummaryCard from '@/components/AccountSummaryCard';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from '@/components/ui/button';
import { LogOut, Settings, CreditCard } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Account {
  accountId: string;
  accountName: string;
  accountMaskedNumber: string;
  balance: number;
  currencySymbol?: string;
  quickInfo?: {
    title?: string;
    content: React.ReactNode;
  };
}

const placeholderAccounts: Account[] = [
  {
    accountId: 'acc123',
    accountName: 'Everyday Checking',
    accountMaskedNumber: '•••• 6789',
    balance: 5250.75,
    quickInfo: {
      title: 'Recent Transactions',
      content: (
        <ul>
          <li>Withdrawal: $50.00 - ATM</li>
          <li>Deposit: $200.00 - Mobile Check</li>
          <li>Payment: $75.20 - Gas Station</li>
        </ul>
      ),
    },
  },
  {
    accountId: 'acc456',
    accountName: 'High-Yield Savings',
    accountMaskedNumber: '•••• 1234',
    balance: 12870.22,
    currencySymbol: '$',
    quickInfo: {
      title: 'Interest Earned',
      content: <p>Last interest payment: $12.50</p>,
    },
  },
  {
    accountId: 'acc789',
    accountName: 'Home Loan Account',
    accountMaskedNumber: 'Loan •••• 5555',
    balance: -150000.00, // Negative for loan
  },
];

const AccountsDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  console.log('AccountsDashboardPage loaded');

  const handleMoveMoneyClick = (accountId: string) => {
    console.log(`Navigate to move money for account: ${accountId}`);
    navigate(`/move-money?accountId=${accountId}`);
  };

  const handleLogout = () => {
    console.log("User logging out");
    navigate('/login'); // Navigate to login page on logout
  };
  
  const handleCardControls = (accountId: string) => {
    console.log(`Navigate to card controls for account: ${accountId}`);
    navigate(`/card-controls?accountId=${accountId}`);
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-700">TSB Dashboard</div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/accounts-dashboard" className={navigationMenuTriggerStyle()}>
                  Accounts
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/move-money" className={navigationMenuTriggerStyle()}>
                  Move Money
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/card-controls" className={navigationMenuTriggerStyle()}>
                  Card Controls
                </NavigationMenuLink>
              </NavigationMenuItem>
               <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="https://placehold.co/40x40/007bff/white?text=U" alt="User" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">TSB User</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          user@example.tsb.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/settings')}> {/* Placeholder */}
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/card-controls')}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Card Management</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Accounts</h1>
        <ScrollArea className="h-[calc(100vh-12rem)]"> {/* Adjust height as needed */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderAccounts.map((account) => (
              <AccountSummaryCard
                key={account.accountId}
                accountId={account.accountId}
                accountName={account.accountName}
                accountMaskedNumber={account.accountMaskedNumber}
                balance={account.balance}
                currencySymbol={account.currencySymbol}
                onMoveMoneyClick={handleMoveMoneyClick}
                quickInfo={account.quickInfo}
              />
            ))}
            {placeholderAccounts.length === 0 && (
              <p className="col-span-full text-center text-gray-500">No accounts to display.</p>
            )}
          </div>
        </ScrollArea>
      </main>
      <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TSB Bank Plc. All rights reserved.
      </footer>
    </div>
  );
};

export default AccountsDashboardPage;