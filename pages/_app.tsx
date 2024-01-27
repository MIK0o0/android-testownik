import '/styles/globals.css';
import type { AppProps } from 'next/app';
import StatsTrackerProvider from '/providers/StatsTrackerProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StatsTrackerProvider>
      <Component {...pageProps} />
    </StatsTrackerProvider>
  );
}
