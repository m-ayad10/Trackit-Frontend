import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import "./style.css";
import { useContext, useState } from "react";
import { Box, Modal } from "@mui/material";
import { HiX } from "react-icons/hi";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import OTPInput from "react-otp-input";
import { UserContext } from "../../Context Api/UserContext";
import axios from "axios";
import { IncomeContext } from "../../Context Api/IncomeContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import EmojiPickerComponent from "../EmojiPicker/Emojipicker";

export default function AllIncome() {
  const { income, setIncome } = useContext(IncomeContext);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    bgcolor: "#1a1717",
    boxShadow: 24,
    p: 2,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useContext(UserContext);
  const [emoji, setEmoji] = useState(null);

  const [source, setSource] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const handleDelete=async(id)=>{
    if (!id) {
      return;
    }
    try {
      const payload = {
        incomeId:id,
        user,
      };
      const response = await axios.patch(`${SERVER_URL}/income`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { succuss, data } = response.data;
      if (succuss) {
        setIncome(data);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data.message ||
        "Something went wrong. Please try again.";
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!source || !emoji || !amount || !selectedDate || !user) {
      return;
    }
    try {
      const payload = {
        source,
        emoji,
        amount,
        date: selectedDate.toISOString().split("T")[0],
        user,
      };

      const response = await axios.post(`${SERVER_URL}/income`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { succuss, data } = response.data;
      if (succuss) {
        setAmount("");
        setEmoji("");
        setSource("");
        handleClose();
        setIncome(data);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data.message ||
        "Something went wrong. Please try again.";
    }
  };
  return (
    <>
      <div className="all-income-container">
        <div className="d-flex justify-content-between">
          <h4>Income Overview</h4>
          <button
            className="btn btn-secondary shadow-none"
            onClick={handleOpen}
          >
            + Add Income
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form action="" onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between items-center">
                  <h5 className="fw-normal">Add Income</h5>
                  <HiX className="fs-5 cursor-p" onClick={handleClose} />
                </div>
                <EmojiPickerComponent setEmoji={setEmoji} emoji={emoji} />
                <div className="mt-1">
                  <label htmlFor="" className="fw-light">
                    Income Source
                  </label>
                  <br />
                  <input
                    type="text"
                    className="modal-input"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="Freelance, Salary, etc"
                  />
                </div>
                <div className="mt-1">
                  <label htmlFor="" className="fw-light">
                    Amount
                  </label>
                  <br />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="modal-input"
                  />
                </div>
                <div className="mt-1">
                  <label htmlFor="" className="fw-light">
                    Date
                  </label>
                  <br />
                  <DatePicker
                    className="modal-input w-100"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                  />
                </div>
                <div className="mt-2 text-end">
                  <button className="btn btn-success shadow-none">
                    Submit
                  </button>
                </div>
              </form>
            </Box>
          </Modal>
        </div>
        {/* <div>
          <input type="text" />
          <select name="" id="">
            <option value="latest">Latest</option>
            <option value="low-to-high">Low to High</option>
            <option value="oldest">Oldest</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div> */}
        {income?.incomes?.length > -1 ? (
          <>
            <div className="all-income-grid_container">
              {income?.incomes?.map((income) => {
                return (
                  <>
                    <div className="all-income-grid_box">
                      <div className="m-0 d-flex ">
                        <img
                          src={income?.icon}
                          className="me-2"
                          style={{ width: "3rem" }}
                          alt=""
                        />
                        <div>
                          <h6>{income?.source}</h6>
                          <p>{income?.date.substring(0, 10)}</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <RiDeleteBin6Line onClick={()=>handleDelete(income?._id)} className="text-danger cursor-p" />
                        <div className="transaction-income ">
                          <p>+{income?.amount}</p>
                          <HiMiniArrowTrendingUp />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
             
            </div>
          </>
        ) : (
          <>
            <div className=" text-center">
              <p className="text-muted p-5 m-2">No income Found</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
