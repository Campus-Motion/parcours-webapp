import './globals.css';

export const metadata = {
  title: 'Campus Motion',
  description: 'Connected sport course tracker',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="main-container">
          {children}
        </main>
      </body>
    </html>
  );
}
