import React from 'react';
import {Scanner} from '../../components';
import {StatusBar} from 'expo-status-bar';

const ScanIn = () => {
  return (
    <>
      <StatusBar hidden={true} />
      <Scanner type="scannerIn" />
    </>
  );
};

export default ScanIn;
