import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Grid, Spacer, Text } from "@nextui-org/react";
import { FaShoppingBasket } from "react-icons/fa";
import Link from "next/link";

const menu = [
  { label: "Home", href: "/" },
  { label: "Market", href: "/market" },
];

const Navbar = () => {
  return (
    <>
      <Grid.Container gap={2} justify="center">
        <Grid xs={2}>
          <FaShoppingBasket
            style={{ marginRight: 10, marginBottom: 8 }}
            size={40}
          />
          <Text
            h4
            css={{ mt: 5 }}
            display={{ base: "none", md: "flex", lg: "flex" }}
          >
            Jack MC Shop
          </Text>
        </Grid>
        <Grid xs={6} css={{ mt: 6 }} style={{ textAlign: "left" }}>
          {menu.map((item, index) => {
            return (
              <>
                <Link href={item.href}>
                  <Text
                    style={{ cursor: "pointer" }}
                    p
                    css={{ mt: 2, mr: 3 }}
                    display={{ base: "none", md: "flex", lg: "flex" }}
                  >
                    {item.label}
                  </Text>
                </Link>
                <Spacer x={2} />
              </>
            );
          })}
        </Grid>
        <Grid xs={4} style={{ justifyContent: "flex-end" }}>
          <ConnectButton />
        </Grid>
      </Grid.Container>
    </>
  );
};

export default Navbar;
