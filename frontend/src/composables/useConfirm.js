import { ref, reactive, h } from 'vue';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

export const useConfirm = (title, message) => {
  const promise = ref(null);

  const confirm = () => new Promise((resolve) => {
    promise.value = { resolve };
  });

  const handleClose = () => {
    promise.value = null;
  };

  const handleConfirm = () => {
    if (promise.value) {
      promise.value.resolve(true);
    }
    handleClose();
  };

  const handleCancel = () => {
    if (promise.value) {
      promise.value.resolve(false);
    }
    handleClose();
  };

  const ConfirmationDialog = {
    setup() {
      return () => h(
        Dialog,
        { open: promise.value !== null },
        () => [
          h(DialogContent, null, [
            h(DialogHeader, null, [
              h(DialogTitle, null, title),
              h(DialogDescription, null, message)
            ]),
            h(DialogFooter, { class: 'pt-2' }, [
              h(Button, { onClick: handleCancel, variant: 'outline' }, 'Cancel'),
              h(Button, { onClick: handleConfirm }, 'Confirm')
            ])
          ])
        ]
      );
    }
  };

  return [ConfirmationDialog, confirm];
};