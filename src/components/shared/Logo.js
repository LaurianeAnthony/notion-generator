import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { space, typography } from "styled-system";

const useStyles = makeStyles(theme => ({
  logo: {
    fontWeight: "700",
    fontSize: "50px",
    marginTop: "50px",
    marginBottom: "100px",
    color: theme.palette.primary.light
  },
  logoSub: {
    fontWeight: "300"
  }
}));

const LogoStyled = styled.h1`
    ${({ theme }) => `
        color: ${theme.palette.primary.light};
    `}
    ${({ white }) =>
      white &&
      `
        color: #fff;
    `}
    ${typography}
    ${space}
`;

const Logo = props => {
  const classes = useStyles();

  return (
    <LogoStyled {...props}>
      Notion <span className={classes.logoSub}>Generator</span>
    </LogoStyled>
  );
};

export default Logo;
