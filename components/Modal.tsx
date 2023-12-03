"use client";
import { Button, Fade, Modal, Box, Divider } from "@mui/material";
import React from "react";

const ResultModal = ({
  netSpeed,
  accuracy,
  openModal,
  handleCloseModal,
}: {
  netSpeed: any;
  accuracy: any;
  openModal: any;
  handleCloseModal: any;
}) => {
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
    >
      <Fade in={openModal}>
        <Box
          className="bg-[#31304D] flex flex-col gap-3 outline-none"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            padding: "20px",
            border: "2px solid white",
            borderRadius: "8px",
            width: "40%",
          }}
        >
          <h2
            id="modal-modal-title "
            className="text-center font-bold text-2xl text-white"
          >
            Typing Test Results
          </h2>
          <Divider />
          <p id="modal-modal-description" className="text-white text-xl">
            WPM: <span className="text-yellow-400"> {netSpeed} WPM</span>
          </p>
          <p className="text-white text-xl">
            {" "}
            Acc: <span className="text-yellow-400"> {accuracy}% </span>
          </p>
          {/* <Divider />
          <Button
            variant="contained"
            className="bg-red-500 hover:bg-red-700"
            onClick={handleCloseModal}
          >
            Close
          </Button> */}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ResultModal;
