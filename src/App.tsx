import React from 'react';
import { Provider } from 'react-redux';
import BottomTabs from './navigation/BottomTabNavigation';
import { store } from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BottomTabs />
    </Provider>
  );
};

export default App;
