import {showMessage} from 'react-native-flash-message';

export const showToast = (message, type) => {
  showMessage({
    message,
    type,
    backgroundColor: type === 'success' ? '#05BC01' : '#DC0000',
    floating: true,
    style: {marginTop: 30},
  });
};
