import {showMessage} from 'react-native-flash-message';

export const showToast = (message, type) => {
  showMessage({
    message,
    type,
    floating: true,
    style: {marginTop: 30},
  });
};
