import React from 'react';

import UserSection from './Sections/UserSection';
import ItemSection from './Sections/ItemSection';
import { useLoanView } from './useLoanView';
import './LoanView.css';

const LoanView = () => {
  useLoanView();

  return (
    <React.Fragment>
      <UserSection />
      <ItemSection />
    </React.Fragment>
  );
};

export default LoanView;
