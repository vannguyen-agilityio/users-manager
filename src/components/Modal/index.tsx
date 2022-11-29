import React, { useState } from 'react';
import {
  Modal as ModalChakra,
  ModalProps as ModalPropsChakra,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  CloseButton,
  Box
} from '@chakra-ui/react';

// Components
import { Button } from '../Button';
import { Text } from '../Text';

export interface ModalProps extends ModalPropsChakra {
  title?: string;
  label?: string;
  description?: string;
  children: React.ReactNode;
  size?: string;
  variant?: 'normal' | 'primary' | 'secondary';
  bgColor?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  isDisabledSubmit?: boolean;
  isDisabledOutsideClick?: boolean;
  isLoading?: boolean;
  onSubmit?: (event: React.MouseEvent<HTMLButtonElement>, id?: number) => void;
}

export const Modal = ({
  isOpen = false,
  onClose,
  title,
  label,
  description,
  returnFocusOnClose = false,
  isCentered = false,
  children,
  size = 'default',
  variant = 'primary',
  bgColor = 'default.light',
  submitButtonText,
  cancelButtonText,
  isDisabledSubmit = true,
  isDisabledOutsideClick = false,
  isLoading,
  onSubmit,
  ...props
}: ModalProps) => {
  const btnRef = React.useRef();
  const [isOpenModal, setOpenModal] = useState(isOpen);
  const handleOnOpen = () => {
    setOpenModal(true);
    return;
  };

  const handleOnClose = () => {
    if (!isDisabledOutsideClick) {
      setOpenModal(false);
      onClose();
    }
    return;
  };

  return (
    <>
      <Button
        variant="transparent"
        onClick={handleOnOpen}
        p={0}
        textTransform="inherit"
      >
        {label}
      </Button>
      <ModalChakra
        size={size}
        variant={variant}
        isOpen={isOpenModal}
        onClose={handleOnClose}
        finalFocusRef={btnRef}
        isCentered={isCentered}
        returnFocusOnClose={returnFocusOnClose}
        {...props}
      >
        <ModalOverlay />
        <ModalContent bg={bgColor}>
          <ModalHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text
              size="medium"
              variant="caption"
              letterSpacing="wide"
              w="100%"
              marginRight="30px"
              color="default.grey.600"
              value={title}
            />
            <CloseButton
              outline="0"
              borderColor="transparent"
              color="default.grey.500"
              onClick={handleOnClose}
            />
          </ModalHeader>
          <ModalBody>
            {description && <Text color="default.light" value={description} />}
            {children}
          </ModalBody>
          <ModalFooter pt="0px" display="flex" justifyContent="center">
            <Box>
              {submitButtonText && (
                <Button
                  isLoading={isLoading}
                  isDisabled={isDisabledSubmit}
                  label={submitButtonText}
                  onClick={onSubmit}
                  size="default"
                />
              )}
              {cancelButtonText && (
                <Button
                  label={cancelButtonText}
                  variant="transparent"
                  mr={3}
                  onClick={handleOnClose}
                />
              )}
            </Box>
          </ModalFooter>
        </ModalContent>
      </ModalChakra>
    </>
  );
};
