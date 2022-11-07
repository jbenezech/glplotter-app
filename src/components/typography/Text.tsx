import React from 'react';
import {ReactElement} from 'react';
import {Typography, TypographyProps, Theme} from '@mui/material';
import {makeStyles, createStyles} from '@mui/styles';
import {APP_THEME} from '@Theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bold: {
      fontWeight: theme.typography.fontWeightBold,
    },
    medium: {
      fontWeight: theme.typography.fontWeightMedium,
    },
    regular: {
      fontWeight: theme.typography.fontWeightRegular,
    },
    blackCoral: {
      color: APP_THEME.color.default.blackCoral,
    },
    white: {
      color: APP_THEME.color.default.white,
    },
    alto: {
      color: APP_THEME.color.default.alto,
    },
    gray: {
      color: APP_THEME.color.default.gray,
    },
    silver: {
      color: APP_THEME.color.default.silver,
    },
    dovegray: {
      color: APP_THEME.color.default.dovegray,
    },
  })
);

export interface TextProps extends TypographyProps {
  component?: React.ElementType;
  weight?: 'bold' | 'medium' | 'regular';
  customColor?:
    | 'blackCoral'
    | 'white'
    | 'alto'
    | 'gray'
    | 'silver'
    | 'dovegray';
}

export const Text = React.forwardRef<HTMLSpanElement, TextProps>(function Text(
  {customColor, className, weight, children, ...props}: TextProps,
  ref
): ReactElement {
  const classes = useStyles();
  return (
    <Typography
      {...props}
      ref={ref}
      className={`${className || ''} ${weight ? classes[weight] : ''} ${
        customColor ? classes[customColor] : ''
      }`}
    >
      {children}
    </Typography>
  );
});
