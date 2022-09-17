import {showToast} from '../toast';
import {removeItem} from '../storage';

export const generateError = (e, navigation) => {
  if (e.response.data.code === 6001 || e.response.data.code === 6002) {
    showToast(
      `${e.response.data.code || 500}: ${e.response.data.message}`,
      'danger',
    );
    removeItem('user')
      .then(() => {
        return navigation.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        });
      })
      .catch(() => {
        navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
      });
  } else {
    showToast(
      `${e.response.data.code || 500}: ${
        e.response.data.message || 'API Error'
      }`,
      'danger',
    );
  }
};
