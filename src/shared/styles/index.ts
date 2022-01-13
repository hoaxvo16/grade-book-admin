import { CSSProperties } from 'react';

export const fullHeightFlex = (direction: 'column' | 'row'): CSSProperties => {
   return {
      height: '100%',
      display: 'flex',
      flexDirection: direction,
   };
};

export const fullWidthFlex = (
   direction: 'column' | 'row',
   padding?: number
): CSSProperties => {
   return {
      width: '100%',
      display: 'flex',
      flexDirection: direction,
      padding: padding,
   };
};

export const centerHorizontal: CSSProperties = {
   display: 'flex',
   alignItems: 'center',
};

export const centerVertical: CSSProperties = {
   display: 'flex',
   alignItems: 'center',
   flexDirection: 'column',
};
