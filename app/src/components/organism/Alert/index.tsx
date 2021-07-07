import React from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';

interface Props {
    isOpen: boolean;
    onCancel: () => void;
    onContinue: () => void;

    values: {
        title?: string;
        body: string;
        cancelButton?: string;
        dangerButton: string;
    };
}

const Alert: React.FC<Props> = ({ isOpen, onCancel, onContinue, values }) => {
    const cancelRef = React.useRef(null);

    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onCancel}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    {values.title ? (
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {values.title}
                        </AlertDialogHeader>
                    ) : null}

                    <AlertDialogBody>{values.body}</AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onCancel}>
                            {values.cancelButton}
                        </Button>
                        <Button colorScheme="red" onClick={onContinue} ml={3}>
                            {values.dangerButton}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default Alert;
