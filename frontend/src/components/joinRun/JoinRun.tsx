'use client';

import { Button, Flex, Input } from "@chakra-ui/react";
import { JSX } from "react";

export const JoinRun = () : JSX.Element => {
    return (
        <Flex>
            <Input placeholder="Enter Run Code" />
            <Button>Join run</Button>
        </Flex>
    )
}
export default JoinRun;