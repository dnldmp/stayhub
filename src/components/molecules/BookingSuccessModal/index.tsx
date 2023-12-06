import { Button } from "@/components/atoms/Button";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

interface BookingSuccessModalProps {
  open: boolean;
  onCancel: () => void;
}

export function BookingSuccessModal({
  open,
  onCancel,
}: BookingSuccessModalProps) {
  const router = useRouter();

  return (
    <Modal
      data-testid="BookingSuccessModal"
      title="Reservervation created with success"
      onCancel={onCancel}
      open={open}
      footer={null}
    >
      <div className="flex flex-col items-center">
        <p className="text-center mb-4">
          Your booking has been confirmed. You can view your booking details in
          the Trips section of your account page.
        </p>
        <Button
          text="Go to trips"
          onClick={() => router.push("/reservations")}
        />
      </div>
    </Modal>
  );
}
