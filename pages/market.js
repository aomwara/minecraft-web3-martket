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
  Loading,
} from "@nextui-org/react";
import axios from "axios";

// import Products from "../__mock__/Product";
import { useProducts, useBuy } from "../hooks/contracts/Market";

const Home = () => {
  const { address } = useAccounts();
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const { Products, isLoading: product_load } = useProducts();

  const { JUSDBalance } = useBalance(address);

  //data to send tx
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemPrice, setItemPrice] = useState(0);
  const [recipient, setRecipient] = useState(null);
  const [quantity, setQuantity] = useState(0);

  const [visible, setVisible] = useState(false);
  const handler = (item, price) => {
    setVisible(true);
    setSelectedItem(item);
    setItemPrice(price);
  };

  const getUser = async () => {
    const response = await axios.get("https://mc.aom.engineer/api/users.php");
    setUsers(JSON.parse(response.data));
  };

  const mintItem = async () => {
    const resp = await axios.get(
      `https://mc.aom.engineer/api/mint.php?to=${recipient}&item=${selectedItem}&quantity=${quantity}`
    );
    if (resp.data == "minted") {
      setRecipient(null);
      setQuantity(0);
      setSelectedItem(null);
      setItemPrice(0);
      alert("Mint Item Success!");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (users) {
      setRecipient(users[0].name);
    }
  }, [users]);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  //create instance for approve
  const { handleApprove, data: approveData } = useApprove(
    Address.MARKET,
    itemPrice * quantity <= 0
      ? ethers.utils.parseEther("0.1")
      : ethers.utils.parseEther(((itemPrice / 1e18) * quantity).toString())
  );

  const { handleBuy, data: buyData } = useBuy(
    recipient,
    selectedItem,
    quantity
  );

  const handleChangeRecipient = (e) => {
    setRecipient(e.target.value);
  };

  const handleChanegQuantity = (e) => {
    setQuantity(e.target.value);
  };

  //handle approve
  const handleClickApprove = () => {
    setLoading(true);
    handleApprove();
  };

  //check confirm tx
  useEffect(() => {
    approveData?.wait().then((resp) => {
      handleBuy();
    });
  }, [approveData]);

  useEffect(() => {
    buyData?.wait().then((resp) => {
      mintItem();
      setLoading(false);
    });
  }, [buyData]);

  return (
    <>
      <center>
        <h1>Market</h1>
        <small> Account: {address}</small>
        <br />
        <small>JUSD Balance: {JUSDBalance?.toString() / 1e18} </small>
        {product_load ? <Loading /> : ""}
        <br />
        <Grid.Container gap={2} style={{ paddingTop: "50px" }} justify="center">
          {Products?.map((product, index) => {
            return (
              <Grid key={product.name} xs={3} style={{ margin: 10 }}>
                <Card>
                  <div style={{ marginTop: "10px" }}>
                    <Image
                      height={100}
                      src={"/assets/images/" + product[0] + ".png"}
                      alt={product.name}
                    />
                  </div>
                  <h3 style={{ paddingTop: "20px" }}>
                    <center>
                      {product[0]}
                      <br />
                      <small>
                        <font color="blue">
                          Price ${product[1].toString() / 1e18} JUSD
                        </font>
                      </small>
                    </center>
                  </h3>

                  <Card.Footer>
                    <Button
                      style={{ width: "100%" }}
                      onClick={() => {
                        handler(product[0], product[1].toString());
                      }}
                    >
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
          <Text id="modal-title" size={20}>
            Item: {selectedItem}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <label>Buy to:</label>
          <select
            style={{ borderRadius: "10px", padding: "10px" }}
            onChange={handleChangeRecipient}
          >
            {users?.map((user) => {
              return (
                <option key={user.uuid} value={user.name}>
                  {user.name}
                </option>
              );
            })}
          </select>
          <label>Quantity</label>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            type="number"
            value={quantity}
            onChange={handleChanegQuantity}
            placeholder="quantity"
          />
          <div style={{ border: "1px #f5f5f5 solid" }}></div>
          <Text style={{ marginTop: "6px" }}>
            Total: ${(quantity * itemPrice) / 1e18} JUSD
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
          <Button auto disabled={isLoading} onClick={handleClickApprove}>
            {isLoading ? <Loading /> : "Buy"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Home;
