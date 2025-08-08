
'use client';

import { chakra, createListCollection, Select } from "@chakra-ui/react";
import { JSX } from "react";

export const Selector = ({
        collection,
        selectLabel,
        selectValueText,
        onSelectCallCapture
    }:
    {
        collection: string[],
        selectLabel: string,
        selectValueText: string,
        onSelectCallCapture: (value: string) => void
    }) : JSX.Element => {
    const transformedCollection = createListCollection({
        items: collection.map((loc) => ({
            value: loc,
            label: loc
        }))
    })
    return (
        <chakra.section px="10">
            <Select.Root size={"md"} collection={transformedCollection} onSelect={(details) => onSelectCallCapture(details.value)}>
                <Select.Control>
                    <Select.Label>{selectLabel}</Select.Label>
                    <Select.Trigger>
                        <Select.ValueText placeholder={selectValueText} />
                    </Select.Trigger>
                </Select.Control>
                <Select.Content>
                    {transformedCollection.items.map((item) => (
                        <Select.Item item={item} key={item.value}>{item.label}</Select.Item>
                    ))}
                </Select.Content>
            </Select.Root>
        </chakra.section>
    );
}

export default Selector;