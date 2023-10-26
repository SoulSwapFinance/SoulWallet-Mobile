import { useCallback } from 'react'
import { makeMutable } from 'react-native-reanimated'
import type { GestureResponderEvent } from 'react-native'

export const MARK_ID_FOR_SELECT_HIDE = 'mark-id-for-select-hide'

// if (platformEnv.isRuntimeBrowser) {
//   document.addEventListener('click', autoHideSelectFunc);
// }


// to disable onPress when conflict with other gestures
export const enableOnPressAnim = makeMutable(1);

export const useBeforeOnPress = (onPress?: ((e: any) => void) | null) =>
  useCallback(
    (e: GestureResponderEvent | MouseEvent) => {
    //   if (!platformEnv.isNative) {
        // const { autoHideSelectFunc } =
        //   require('./SelectAutoHide') as typeof import('./SelectAutoHide');
        // autoHideSelectFunc(e as MouseEvent);
    //   }
      // console.log('beforeOnPress', enableOnPressAnim.value);
      if (enableOnPressAnim.value === 1 && onPress) {
        // doHapticsWhenEnabled();

        onPress(e);
      }
    },
    [onPress],
  );
