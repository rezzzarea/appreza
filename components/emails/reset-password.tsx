import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Button,
  Tailwind,
} from '@react-email/components';

interface ForgotPasswordEmailProps{
    username:string
    resetUrl:string
    userEmail:string
}

const ForgotPasswordEmail = (props:ForgotPasswordEmailProps) => {
  const { username,userEmail,resetUrl } = props;

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Reset your password - Action required</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] mx-auto p-[40px] max-w-[580px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[24px] font-bold text-gray-900 m-0 mb-[8px]">
                Reset Your Password
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                Hello, {username}
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                Someone requested a password reset for your account associated with {userEmail}. 
                If this was you, click the button below to reset your password.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[24px]">
                If you didn&apos;t request this, you can safely ignore this email.
              </Text>

              {/* Reset Button */}
              <Section className="text-center mb-[24px]">
                <Button
                  href={resetUrl}
                  className="bg-blue-600 text-white text-[16px] font-medium py-[12px] px-[32px] rounded-[8px] box-border no-underline inline-block"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-500 leading-[20px] m-0 mb-[16px]">
                This link will expire in 24 hours for security reasons.
              </Text>
              <Text className="text-[14px] text-gray-500 leading-[20px] m-0">
                If the button doesn&apos;t work, copy and paste this link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 leading-[20px] m-0 break-all">
                <Link href={resetUrl} className="text-blue-600 underline">
                  {resetUrl}
                </Link>
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                This email was sent to {userEmail}. If you have any questions, please contact our support team.
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                © 2024 Your Company Name. All rights reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                123 Business Street, Jakarta, Indonesia 12345
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// PasswordResetEmail.PreviewProps = {
//   userEmail: "rezzzarea@gmail.com",
//   resetUrl: "https://example.com/reset-password?token=abc123xyz789",
// };

export default ForgotPasswordEmail;