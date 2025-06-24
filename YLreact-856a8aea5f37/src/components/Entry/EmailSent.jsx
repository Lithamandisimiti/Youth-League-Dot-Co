import React from 'react';
import { Container, Icon, Paragraph } from './styles';
const EmailSent = () => (
  <Container>
    <div>
      <Paragraph>
        <Icon className="icon ion-ios-checkmark-circle-outline"></Icon>
      </Paragraph>
      <Paragraph width="90%">
        Email is being sent.Please check you mail in a few minutes to change
        your password. Remember to check your spam folder should you not see it
        in your main inbox.
      </Paragraph>
    </div>
  </Container>
);

export default EmailSent;
