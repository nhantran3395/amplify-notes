"use client"
import { type PropsWithChildren } from "react";

import { Button, Flex, Grid, View, Text, Authenticator } from "@aws-amplify/ui-react";

function Main({ children } : PropsWithChildren) {
    return (
        <Authenticator>
            {({signOut, user}) => (
                <Grid
                    templateRows={'1fr 3fr 1fr'}
                    margin={'32px'}
                >
                    <Flex
                        justifyContent={'flex-end'}
                        alignItems={'center'}
                    >
                        <Text>{user?.username || ''}</Text>
                        <Button onClick={signOut}>Sign out</Button>
                    </Flex>
                    {children}
                    <View margin={'16px auto'}>Created by Nhan Tran</View>
                </Grid>
            )}
        </Authenticator>
    );
}

export default Main;