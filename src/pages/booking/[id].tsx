import { UserOutlined } from "@ant-design/icons";
import { Header } from "@/components/molecules/Header";
import { ResarvationCard } from "@/components/molecules/ReservationCard";
import { GetServerSideProps } from "next";
import { ImageGrid } from "@/components/molecules/ImageGrid";

interface BookingProps {
  id: number;
}

export default function Booking({ id }: BookingProps) {
  return (
    <div>
      <Header />
      <ResarvationCard homeId={id} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id || "";
  const numericId: number = Number(id);

  if (isNaN(numericId)) {
    return {
      notFound: true,
    };
  }

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
