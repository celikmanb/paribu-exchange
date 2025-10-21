import { ref, computed, watch } from 'vue';
import type { Theme } from '@/types';

const lightTheme: Theme = {
  primary: '#1a1a1a',
  secondary: '#f5f5f5',
  background: '#ffffff',
  surface: '#fafafa',
  text: '#1a1a1a',
  textSecondary: '#666666'
};

const darkTheme: Theme = {
  primary: '#ffffff',
  secondary: '#1a1a1a',
  background: '#0f0f0f',
  surface: '#1a1a1a',
  text: '#ffffff',
  textSecondary: '#a0a0a0'
};

// Global theme state - check if we're in browser environment
const isDark = ref(false);
const currentTheme = computed(() => isDark.value ? darkTheme : lightTheme);

// Initialize theme from localStorage only in browser
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  isDark.value = localStorage.getItem('theme') === 'dark';
}

// Apply theme to document when it changes
const applyTheme = (isDarkMode: boolean) => {
  if (typeof document !== 'undefined') {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};

// Initialize theme on page load
if (typeof document !== 'undefined') {
  applyTheme(isDark.value);
}

// Watch for theme changes and apply to document
watch(isDark, (newValue) => {
  applyTheme(newValue);
});

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    // Save to localStorage only in browser
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    }
  };
  
  return {
    isDark,
    currentTheme,
    toggleTheme
  };
}
