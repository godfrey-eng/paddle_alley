import type { ThemeConfig } from 'antd';

// Brand colours taken from the logo and the court.
// Keep in sync with the CSS variables at the top of styles.css.
export const COLORS = {
  navy: '#1B3A66',
  green: '#1E5A52',
  lime: '#C3D82E',
  white: '#FFFFFF',
} as const;

export const antTheme: ThemeConfig = {
  token: {
    colorPrimary: COLORS.lime,
    colorTextLightSolid: COLORS.navy,
    colorText: COLORS.navy,
    colorInfo: COLORS.green,
    fontFamily: 'Poppins, system-ui, sans-serif',
    borderRadius: 8,
  },
};
