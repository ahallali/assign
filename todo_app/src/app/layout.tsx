'use client';
import "./globals.css";
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeButton from '@/components/ThemeButton';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider>
            <ThemeButton />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
