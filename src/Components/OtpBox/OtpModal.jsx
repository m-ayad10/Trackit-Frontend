import { Box, Modal } from "@mui/material";
import { OtpKit } from "react-otp-kit";
import "react-otp-kit/dist/index.css";
export default function OtpModal({ open, setOpen, otp, setOtp }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    bgcolor: "#1a1717",
    boxShadow: 24,
    p: 1,
  };
  const handleClose = () => setOpen(false);
  const handleChange = (newOtp) => {
    setOtp(newOtp);
    if (newOtp.length === 4) {
      console.log(newOtp);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-center pt-3">
            <h5 className="fw-normal">Enter verification code</h5>
          </div>
          <div className="text-dark">
            <OtpKit
              value={otp}
              numOfInputs={4}
              className="otp-input"
              onChange={handleChange}
              submitOtpButton={{
                show: true,
                className: "otp-submit",
              }}
              type="number"
            />
          </div>
        </Box>
      </Modal>
    </>
  );
}
