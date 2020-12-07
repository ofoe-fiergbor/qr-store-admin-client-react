import React from "react";
import { connect } from "react-redux";
import { Button, Modal } from "semantic-ui-react";
import QRCode from "qrcode.react";
import ItemCard from "../components/ItemCard";

const SingleMerchant = ({ yourMerchants, match }) => {
  const [open, setOpen] = React.useState(false);

  let postId = match.params.id;

  let currentMerchant =
    yourMerchants && yourMerchants.filter((e) => e.id === postId);
  //   console.log(currentMerchant[0]);
  const { name, items, likes, id } = currentMerchant[0];

  return (
    <div>
      <Modal
        closeIcon
        open={open}
        trigger={<Button color="teal">QR CODE</Button>}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Modal.Content>
          <QRCode value={id} />
        </Modal.Content>
      </Modal>
      <h1>{name}</h1>
      <div>
        {items.map((e) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <ItemCard />
            </div>
          );
        })}
      </div>
    </div>
  );
};

function mstp(state) {
  return {
    yourMerchants: state.merch.merchants,
  };
}
export default connect(mstp)(SingleMerchant);
