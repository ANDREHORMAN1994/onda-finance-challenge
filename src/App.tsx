import { AppProviders } from '@/app/providers/appProviders';
import { AppRouter } from '@/app/router';

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
