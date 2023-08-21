import { Injectable } from '@angular/core';

export const darkTheme = {
  'primary-color': '#455363',
  'background-color': 'rgb(30,30,30)',
  'text-color': '#fff',
  'background-color-dropdown': '#333333',
  'text-color-dropdown': '#fff',
  'text-color-header':'rgb(124,141,216)',
  'background-color-form': 'rgb(30,30,30)',
  'text-color-card':'#ffffff',
  'text-mint':'#03dac6',
  'drop-bg':'rgb(30,30,30)',
  'drop-text':'#03dac6',
  'text-mute':'#bbbbbb',
  'table-hover':'rgb(30,30,30)'
};

export const lightTheme = {
  'primary-color': '#fff',
  'background-color': '#e5e5e5',
  'text-color': '#2d2d2d',
  'background-color-dropdown': '#fdfdfd',
  'text-color-dropdown': '#000000',
  'text-color-header':'#000000',
  'background-color-form': '#fff',
  'text-color-card':'#343a40',
  'text-mint':'#000000',
  'drop-bg':'#aaaaaa',
  'drop-text':'#ffffff',
  'text-mute':'rgb(110,117,124)',
  'table-hover':'rgb(234,234,234)'
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  toggleDark() {
      console.log("dark toggle")
    this.setTheme(darkTheme);
  }

  toggleLight() {
      console.log("light toggle")
    this.setTheme(lightTheme);
  }

  private setTheme(theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
}
