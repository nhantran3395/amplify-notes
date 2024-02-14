"use client"
import { type PropsWithChildren } from "react";
import { Theme, Container } from '@radix-ui/themes';

import { Authenticator } from "@aws-amplify/ui-react";
import { Button, Flex, Text } from "@radix-ui/themes";

function Main({ children } : PropsWithChildren) {
    return (
        <Authenticator>
            {({signOut, user}) => (
                <Theme>
                    <Container>
                        <Flex
                            justify={'end'}
                            align={'center'}
                            gap={'2'}
                            mt={'2'}
                        >
                            <Text>{user?.username || ''}</Text>
                            <Button onClick={signOut}>Sign out</Button>
                        </Flex>
                        {children}
                    </Container>
                </Theme>
            )}
        </Authenticator>
    );
}

export default Main;