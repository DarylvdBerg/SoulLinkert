import { Box, ChakraProvider, defaultSystem, Flex } from "@chakra-ui/react"
import type { Preview } from '@storybook/nextjs'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ChakraProvider value={defaultSystem}>
        <Flex p={10} w='full' justifyContent={'center'} h='full'>
          
          <Story  />
        </Flex>
      </ChakraProvider>
    ),
  ]
};

export default preview;