"use client"
import { type PropsWithChildren } from "react";
import { Theme } from '@radix-ui/themes';

import { Authenticator } from "@aws-amplify/ui-react";
import { Button, Flex, Text } from "@radix-ui/themes";

function Main({ children } : PropsWithChildren) {
    return (
        <Authenticator>
            {({signOut, user}) => (
                <Theme>
                    <Flex
                        justify={'end'}
                        align={'center'}
                    >
                        <Text>{user?.username || ''}</Text>
                        <Button onClick={signOut}>Sign out</Button>
                    </Flex>
                    {children}
                </Theme>
            )}
        </Authenticator>
    );
}

export default Main;