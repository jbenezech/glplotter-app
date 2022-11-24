import React from 'react';
import {ReactElement} from 'react';
import {Typography, TypographyProps, Theme} from '@mui/material';
import {makeStyles, createStyles} from '@mui/styles';

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
  })
);

export interface TextProps extends TypographyProps {
  component?: React.ElementType;
  weight?: 'bold' | 'medium' | 'regular';
}

export const Text = React.forwardRef<HTMLSpanElement, TextProps>(function Text(
  {className, weight, children, ...props}: TextProps,
  ref
): ReactElement {
  const classes = useStyles();
  return (
    <Typography
      {...props}
      ref={ref}
      className={`${className || ''} ${weight ? classes[weight] : ''}`}
    >
      {children}
    </Typography>
  );
});
