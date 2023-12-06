import { UserOutlined } from "@ant-design/icons";
import { SearchBox } from "@/components/atoms/SearchBox";
import { Avatar, Dropdown } from "antd";
import type { MenuProps } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface HeaderProps {
  isSearchVisible?: boolean;
}

export function Header({ isSearchVisible }: HeaderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const logoSize = isMobile ? 55 : 150;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <p className="font-bold" onClick={() => router.push("/reservations")}>
          Trips
        </p>
      ),
    },
  ];

  useEffect(() => {
    const checkWindowSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);

    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  return (
    <header className="border-b border-b-gray-300 w-full flex-1">
      <div className="max-w-screen-xl mx-auto w-full flex flex-row p-2 md:p-4 justify-between items-center">
        <Image
          src={isMobile ? "/m-logo.png" : "/logo.png"}
          alt="logo"
          width={logoSize}
          height={logoSize}
          className="mx-1 cursor-pointer"
          onClick={() => router.push("/")}
        />
        {isSearchVisible && (
          <div className="flex justify-center w-full mx-3">
            <SearchBox />
          </div>
        )}

        <Dropdown menu={{ items }} placement="bottom">
          <div className="cursor-pointer">
            <Avatar size={50} src="/user.jpg" icon={<UserOutlined />} />
          </div>
        </Dropdown>
      </div>
    </header>
  );
}
