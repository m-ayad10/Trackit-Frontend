import { HiMiniArrowTrendingDown } from "react-icons/hi2";
import { ExpenseContext } from "../../Context Api/ExpenseContext";
import { useContext, useState } from "react";
import { UserContext } from "../../Context Api/UserContext";
import axios from "axios";
import EmojiPickerComponent from "../Emoji Picker/Emojipicker";
import { Box, Modal } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiX } from "react-icons/hi";
import DatePicker from "react-datepicker";
import Income from "../../Pages/Income";
export default function AllExpense() {
  const { expense, setExpense } = useContext(ExpenseContext);
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

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const handleDelete=async(id)=>{
    if (!id) {
      return;
    }
    try {
      const payload = {
        expenseId:id,
        user,
      };
      const response = await axios.patch(`${SERVER_URL}/expense`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { succuss, data } = response.data;
      if (succuss) {
        setExpense(data);
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
    if (!category || !emoji || !amount || !selectedDate || !user) {
      return;
    }
    try {
      const payload = {
        category,
        emoji,
        amount,
        date: selectedDate.toISOString().split("T")[0],
        user,
      };

      const response = await axios.post(`${SERVER_URL}/expense`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { succuss, data } = response.data;
      if (succuss) {
        setAmount("");
        setEmoji("");
        setCategory("");
        handleClose();
        setExpense(data);
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
          <h4>Expense Overview</h4>
          <button
            className="btn btn-secondary shadow-none"
            onClick={handleOpen}
          >
            + Add Expense
          </button>
        </div>
        {expense?.expenses?.length > -1 ? (
          <>
            <div className="all-income-grid_container">
              {expense?.expenses?.map((expense) => {
                return (
                  <>
                    <div className="all-income-grid_box">
                      <div className="m-0 d-flex ">
                        <img
                          src={expense?.icon}
                          className="me-2"
                          style={{ width: "3rem" }}
                          alt=""
                        />
                        <div>
                          <h6>{expense?.category}</h6>
                          <p>{expense?.date.substring(0, 10)}</p>
                        </div>
                      </div>

                      <div className="d-flex align-items-center">
                        <RiDeleteBin6Line onClick={()=>handleDelete(expense?._id)} className="text-danger cursor-p" />
                        <div className="transaction-expense ms-2">
                          <p>-{expense?.amount}</p>
                          <HiMiniArrowTrendingDown />
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
              <p className="text-muted p-5 m-2">No expense Found</p>
            </div>
          </>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form action="" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between items-center">
              <h5 className="fw-normal">Add Expense</h5>
              <HiX className="fs-5 cursor-p" onClick={handleClose} />
            </div>
            <EmojiPickerComponent setEmoji={setEmoji} emoji={emoji} />
            <div className="mt-1">
              <label htmlFor="" className="fw-light">
                Expense category
              </label>
              <br />
              <input
                type="text"
                className="modal-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Shopping, Food, etc"
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
              <button className="btn btn-success shadow-none">Submit</button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
