import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata = {
  title: 'Mahmudul Hasan | Full-Stack Portfolio',
  description: 'Senior Full-Stack Engineer — Next.js, Express.js, MongoDB, Tailwind CSS.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="purplenight" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('portfolio_theme') || 'dark';
                  if (t === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'purplenight');
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased selection:bg-violet-600 selection:text-white overflow-x-hidden transition-colors duration-300">
        <ThemeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

