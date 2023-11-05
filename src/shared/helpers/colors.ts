import chalk from 'chalk';

export const CHALK_COLORS = ['yellow', 'red', 'green', 'blue', 'bold'] as const;

const enable = () => {
  CHALK_COLORS.forEach((color) => {
    Object.defineProperty(String.prototype, color, {
      get() {
        return chalk[color](this);
      }
    });
  });
};

export const colors = {
  enable
};


