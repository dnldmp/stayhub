import { Button } from "@/components/atoms/Button";
import { Header } from "@/components/molecules/Header";
import { GetServerSideProps } from "next";

interface BookingProps {
  id: string;
}

export default function Booking({ id }: BookingProps) {
  return (
    <div>
      <Header />
      <Button text="Reserve" />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id || "";

  if (!id) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      id,
    },
  };
};
