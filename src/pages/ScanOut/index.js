import React from 'react';
import {Scanner} from '../../components';
import {StatusBar} from 'expo-status-bar';

const ScanIn = () => {
  return (
    <>
      <Scanner type="scannerOut" />
      <StatusBar hidden={true} />
    </>
  );
};

export default ScanIn;
