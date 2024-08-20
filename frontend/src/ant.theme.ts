import type { ThemeConfig } from 'antd';

export const color_theme = {
  primary: '#1E2A5E',
  secondary: '#E1D7B7'
}

export const theme: ThemeConfig = {
  token: {
    fontSize: 13,
    colorPrimary: color_theme.primary,
  },
  components: {
    Modal: {
      titleFontSize: 16
    }
  }
};