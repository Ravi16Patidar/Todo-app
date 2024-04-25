import React, { Fragment, useState } from "react";
import "./style.css";
import {
  Button,
  OutlinedInput,
  Typography,
  Snackbar,
  Alert,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Confetti from "react-confetti";

const Todo = React.memo(() => {
  const [item, setTodoItems] = useState("");
  const [openAddTaskSnackbar, setOpenAddTaskSnackbar] = useState(false);
  const [openDeleteTaskSnackbar, setOpenDeleteTaskSnackbar] = useState(false);
  const [openEditTaskSnackbar, setOpenEditTaskSnackbar] = useState(false);
  const [openInputFilled, setOpenInputFilled] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [itemList, setItemList] = useState(() => {
    const storedItems = localStorage.getItem("todoItems");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [openModal, setOpenModal] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false); 

  const handleSubmit = () => {
    if (item.length > 0) {
      if (editIndex != null) {
        const updatedItems = [...itemList];
        updatedItems[editIndex] = item;
        setItemList(updatedItems);
        setTodoItems("");
        setEditIndex(null);
        setOpenEditTaskSnackbar(true);
      } else {
        setItemList([...itemList, item]);
        setTodoItems("");
        setOpenAddTaskSnackbar(true);
      }
    } else {
      setOpenInputFilled(true);
    }
  };

  const handleInputChange = (event:any) => {
    const { value } = event.target;
    setTodoItems(value);
  };

  const handleDelete = (position:any) => {
    setSelectedItemIndex(position);
    setOpenModal(true);
  };

  const deleteSelectedItem = () => {
    let updatedList = itemList.filter((_:any, index:number) => index !== selectedItemIndex);
    setItemList(updatedList);
    setOpenModal(false);
    setOpenDeleteTaskSnackbar(true);
    setShowCelebration(true)
    setTimeout(() => {
      setShowCelebration(false); 
    }, 5000); 
  };

  const handleEdit = (position:any) => {
    setTodoItems(itemList[position]);
    setEditIndex(position);
  };

  const filteredList = itemList.filter((value:any) => {
    return value.includes(searchText);
  });

  const handleSearchItem = (event:any) => {
    setSearchText(event.target.value);
  };

  const handleCloseSnackbar = () => {
    setOpenAddTaskSnackbar(false);
    setOpenDeleteTaskSnackbar(false);
    setOpenEditTaskSnackbar(false);
    setOpenInputFilled(false);
  };

  return (
    <Fragment>
       {showCelebration && <Confetti />}
      <div className="container">
        <h1 className="appName">Todo App</h1>
        <div className="inputParent">
          <OutlinedInput
            value={item}
            placeholder="Add Your Task"
            onChange={handleInputChange}
            className="inputField"
            onKeyDown={(event) =>
              event.key === "Enter" ? handleSubmit() : null
            }
          />
          <Button
            variant="contained"
            color="success"
            className="styleAddBtn"
            onClick={handleSubmit}
          >
            Add
          </Button>
          <Snackbar
            open={openAddTaskSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Task Added Successfully!
            </Alert>
          </Snackbar>
          <Snackbar
            open={openDeleteTaskSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              color="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Task deleted Successfully!
            </Alert>
          </Snackbar>
          <Snackbar
            open={openEditTaskSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              color="info"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Task Edited Successfully!
            </Alert>
          </Snackbar>
          <Snackbar
            open={openInputFilled}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="warning"
              color="warning"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Please fill the input field!
            </Alert>
          </Snackbar>
        </div>
        <div>
          <OutlinedInput
            value={searchText}
            placeholder="Search..."
            onChange={handleSearchItem}
            className="searchField"
          />
        </div>
        <div style={{ margin: "120px 0 50px 0" }}>
          {filteredList && filteredList.length > 0 ? (
            filteredList.map((value:any, index:number) => (
              <div className="itemLine" key={index}>
                <div>
                  <li
                    style={{
                      listStyleType: "circle",
                      color: "white",
                      fontSize: "17px",
                      wordBreak: "break-word",
                      marginRight: "15px",
                      cursor: "pointer",
                    }}
                  >
                    {value}
                  </li>
                </div>
                
                <div className="iconBtnContainer">
                  <Button
                    variant="contained"
                    color="error"
                    className="iconBtn"
                    style={{ minWidth: "25px", width: "25px", height: "30px" }}
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteIcon className="icon" />
                  </Button>
                  <Button
                    variant="contained"
                    className="iconBtn"
                    style={{ minWidth: "25px", width: "25px", height: "30px" }}
                    onClick={() => handleEdit(index)}
                  >
                    <EditIcon className="icon" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="noDataFoundContainer">
              <Typography className="noDataFoundText">No Data Found</Typography>
            </div>
          )}
        </div>
        
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          textAlign: 'center',
          boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
          borderRadius:'10px'
        }}>
          <p id="modal-description">Are you sure you want to delete this item?</p>
          <div style={{ marginTop: '35px', }}>
            <Button variant="contained" color="error" onClick={deleteSelectedItem} style={{ marginRight: '40px' ,width:'120px',height:'40px'}}>
              Delete
            </Button>
            <Button variant="contained" onClick={() => setOpenModal(false)} style={{width:'120px',height:'40px'}}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
});

export default Todo;
