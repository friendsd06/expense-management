import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="gradient-bg text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ExpenseTracker</h3>
            <p className="text-sm">Manage your personal finances with ease.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:text-blue-200">Home</Link></li>
              <li><Link href="/expenses" className="text-sm hover:text-blue-200">Expenses</Link></li>
              <li><Link href="/reports" className="text-sm hover:text-blue-200">Reports</Link></li>
              <li><Link href="/account" className="text-sm hover:text-blue-200">Account</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">Email: support@expensetracker.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-400 text-center">
          <p className="text-sm">&copy; 2023 ExpenseTracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;