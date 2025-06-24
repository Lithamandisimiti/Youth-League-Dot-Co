import styled from 'styled-components';

export const Heading = styled.div`
  color: rgb(153, 153, 153);
  background-color: rgb(249, 249, 249);
  border-top: 1px solid whitesmoke;
`;
export const ProfileRow = styled.div`
  border-top: 1px solid whitesmoke;
  cursor: pointer;
`;

export const UserRow = styled.div`
  border-bottom: 1px solid whitesmoke;
  cursor: pointer;
  padding: 10px;
`;

export const Icon = styled.div`
  font-size: ${props => (props.size ? props.size : '14px')};
  color: rgb(153, 153, 153);
`;

export const Checklist = styled.div`
  height: 400px;
  overflow: scroll;
`;

export const UserImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 100%;
`;

export const Span = styled.span`
  font-size: ${props => (props.size ? props.size : '1em')};
`;
