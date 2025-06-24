import React from 'react';
import styled from 'styled-components';
import { Device, Colors } from '../../helpers/constants';
import { Link } from 'react-router';

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Nav = styled.nav`
  background-color: ${Colors.concrete};
  webkit-box-shadow: 0 1px 3px rgba(41, 70, 97, 0.15);
  moz-box-shadow: 0 1px 3px rgba(41, 70, 97, 0.15);
  box-shadow: 0 1px 3px rgba(41, 70, 97, 0.15);
  margin-bottom: 1.5rem;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1rem;

  @media only screen and ${Device.tablet} {
    justify-content: start;
  }
`;

export const Badge = styled.span`
  position: absolute;
  background-color: red;
  border-radius: 100px;
  width: 20px;
  height: 20px;
  color: ${Colors.white};
  font-weight: bold;
`;

export const RightContainer = styled.div`
  align-items: center;
  @media only screen and ${Device.tablet} {
    flex: 1;
    justify-content: space-between;
  }
`;

export const LeftContainer = styled.div`
  /* align-self: flex-start; */
`;

const RouterLink = ({ isLogo, children, ...props }) => {
  return <Link {...props}>{children}</Link>;
};

export const Anchor = styled(RouterLink)`
  font-size: ${props => (props.isLogo ? '1.26rem' : '0.75rem')};
  text-align: center;
  padding: 0;
  color: rgba(0, 0, 0, 0.5);
  :hover {
    text-decoration: none;
    color: rgba(0, 0, 0, 1);
  }
`;

export const Icon = styled.span`
  font-size: 2.5em;
  display: block;
  line-height: 1;
  align-items: center;
  @media only screen and ${Device.tablet} {
    font-size: 2em;
  }
`;

export const Logo = styled.img`
  height: 3.5em;
  @media only screen and ${Device.tablet} {
    height: 2.1em;
    position: relative;
    top: -2px;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  flex: 1;
  justify-content: flex-end;
  padding-left: 0;
  align-items: center;
  padding-top: ${props => (props.isLoggedIn ? '0.5em ' : '1.25em')};
  padding-bottom: ${props => (props.isLoggedIn ? '0.5em ' : '1.25em')};
  @media only screen and ${Device.tablet} {
    padding-top: 5px;
    padding-bottom: 5px;
    justify-content: ${props =>
      props.isLoggedIn ? 'space-between' : 'flex-end'};
  }
`;

export const Item = styled.li`
  margin-right: 3rem;
  position: ${props => (props.isLogo ? 'absolute' : 'relative')};
  left: 0;
  @media only screen and ${Device.tablet} {
    margin-right: ${props => (props.isLoggedIn ? 0 : '1rem')};
    position: ${props =>
      !props.isLoggedIn && props.isLogo ? 'absolute' : 'relative'};
  }
`;

export const NotificationComponent = styled.div`
  min-width: 300px;
  position: absolute;
  right: 0;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-color: ${Colors.white};
  padding: 2px;
`;

export const Arrow = styled.div`
  position: absolute;
  bottom: 0;
  height: 13px;
  right: 20px;
  color: rgba(0, 0, 0, 0.5);
`;
