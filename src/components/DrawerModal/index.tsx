import React, { useState } from 'react';
import {
  DrawerProps as DrawerPropsChakra,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react';

// Components
import { Button } from '../Button';

export interface DrawerProps extends DrawerPropsChakra {
  isDisabledSubmit?: boolean;
  isError?: boolean;
  children: React.ReactNode;
  title?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  onSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DrawerModal = ({
  children,
  title,
  cancelButtonText = 'Cancel',
  submitButtonText = 'Submit',
  isDisabledSubmit,
  isError = true,
  isOpen = false,
  onClose,
  onSubmit,
  ...props
}: DrawerProps) => {
  const [isOpenAddUserModal, setOpenAddUserModal] = useState<boolean>(isOpen);

  const onOpenModal = () => {
    setOpenAddUserModal(true);
    return;
  };

  const onCloseModal = () => {
    setOpenAddUserModal(false);
    return;
  };

  const handleSubmit = (e) => {
    onSubmit(e);
    if (!isError) {
      setOpenAddUserModal(false);
    }
    return;
  };

  return (
    <>
      <Button onClick={onOpenModal} ml={3}>
        {title}
      </Button>
      <Drawer
        isOpen={isOpenAddUserModal}
        placement="right"
        onClose={onCloseModal}
        {...props}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>

          <DrawerBody>{children}</DrawerBody>

          <DrawerFooter>
            <Button variant="cancel" mr={3} onClick={onCloseModal}>
              {cancelButtonText}
            </Button>
            <Button
              isDisabled={isDisabledSubmit}
              onClick={(e) => handleSubmit(e)}
            >
              {submitButtonText}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
