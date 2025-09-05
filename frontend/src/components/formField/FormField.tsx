import { Field, Input } from '@chakra-ui/react';
import { JSX } from 'react';

export const FormField = ({
    label,
    isRequired,
    onFieldValueChangeCallback,
}: {
    label: string;
    isRequired: boolean;
    onFieldValueChangeCallback: (value: string) => void;
}): JSX.Element => {
    return (
        <Field.Root required={isRequired}>
            <Field.Label>
                {label}
                <Field.RequiredIndicator hidden={!isRequired} />
            </Field.Label>
            <Input onChange={(input) => onFieldValueChangeCallback(input.target.value)} />
        </Field.Root>
    );
};

export default FormField;
