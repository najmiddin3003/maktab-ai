import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

const SHOW_EVENT = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
const HIDE_EVENT = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

/** Klaviatura ochilganda ScrollView pastida qo‘shimcha joy (tab bar + bo‘shliq). */
export function useKeyboardBottomInset(extraGap = 48) {
  const [inset, setInset] = useState(0);

  useEffect(() => {
    const onShow = Keyboard.addListener(SHOW_EVENT, (e) => {
      setInset(e.endCoordinates.height + extraGap);
    });
    const onHide = Keyboard.addListener(HIDE_EVENT, () => {
      setInset(0);
    });
    return () => {
      onShow.remove();
      onHide.remove();
    };
  }, [extraGap]);

  return inset;
}
