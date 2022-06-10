import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useApprove } from "../hooks/contracts/JUSD";
import useBalance from "../hooks/contracts/JUSD/useBalance";
import useAccounts from "../hooks/useAccount";
import Address from "../constants/Address.json";
import {
  Card,
  Input,
  Button,
  Text,
  Grid,
  Modal,
  Image,
} from "@nextui-org/react";
import axios from "axios";

import Products from "../__mock__/Product";

const Home = () => {
  const { address } = useAccounts();
  const [amount, setAmount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);

  const { JUSDBalance } = useBalance(address);

  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const getUser = async () => {
    const response = await axios.get("https://mc.aom.engineer/api/users.php");
    setUsers(JSON.parse(response.data));
  };

  useEffect(() => {
    getUser();
  }, []);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  //create instance for approve
  const { handleApprove, data: approveData } = useApprove(
    Address.Bank,
    amount == 0
      ? ethers.utils.parseEther("0.1")
      : ethers.utils.parseEther(amount)
  );

  //handle approve
  // const handleClickApprove = () => {
  //   setLoading(true);
  //   handleApprove();
  // };

  //check confirm tx
  // useEffect(() => {
  //   approveData?.wait().then((resp) => {
  //     setLoading(false);
  //   });
  // }, [approveData]);

  return (
    <>
      <center>
        <h1>Market</h1>
        <small> Account: {address}</small>
        <br />
        <small>JUSD Balance: {JUSDBalance?.toString() / 1e18} </small>

        <br />
        <Grid.Container gap={2} style={{ paddingTop: "50px" }} justify="center">
          {Products?.map((product, index) => {
            return (
              <Grid key={product.name} xs={3} style={{ margin: 10 }}>
                <Card>
                  <div style={{ marginTop: "10px" }}>
                    <Image
                      height={100}
                      src={"/assets/images/" + product.name + ".png"}
                      alt={product.name}
                    />
                  </div>
                  <h3 style={{ paddingTop: "20px" }}>
                    <center>
                      {product.name}
                      <br />
                      <small>
                        <font color="blue">Price ${product.price} JUSD</font>
                      </small>
                    </center>
                  </h3>
                  <Card.Footer>
                    <Button style={{ width: "100%" }} onClick={handler}>
                      Buy
                    </Button>
                  </Card.Footer>
                </Card>
              </Grid>
            );
          })}
        </Grid.Container>
      </center>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Buy Minecraft
            <Text b size={18}>
              {" "}
              Item
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <label>Buy to:</label>
          <select>
            {users?.map((user) => {
              return (
                <option key={user.uuid} value={user.name}>
                  {user.name}
                </option>
              );
            })}
          </select>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="quantity"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto onClick={closeHandler}>
            Buy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Home;
