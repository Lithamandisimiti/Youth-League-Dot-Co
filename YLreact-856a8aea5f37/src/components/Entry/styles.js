import styled from 'styled-components';

export const Container = styled.div`
  height: 70vh;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Icon = styled.i`
  font-size: 150px;
  color: grey;
`;

export const Paragraph = styled.p`
  text-align: center;
  color: grey;
  margin: auto;
  font-size: 20px;
  width: ${({ width }) => (width ? width : 'none')};

  @media only screen and (min-width: 767px) {
    width: ${({ width }) => (width ? '500px' : 'none')};
  }
`;
