import React, { Fragment, SyntheticEvent, useEffect, useMemo, useState, forwardRef } from "react";
import "./style.css";
import { Button, OutlinedInput, Typography, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Todo = React.memo(() => {
  const [item, setTodoItems] = useState("");
  const [openAddTaskSnackbar, setOpenAddTaskSnackbar] = useState(false);
  const [openDeleteTaskSnackbar, setOpenDeleteTaskSnackbar] = useState(false);
  const [openEditTaskSnackbar, setOpenEditTaskSnackbar] = useState(false);
  const [openInputFilled,setOpenInputFilled]=useState(false)
  const [editIndex, setEditIndex] = useState<null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [itemList, setItemList] = useState<any>(() => {
    const storedItems = localStorage.getItem("todoItems");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(itemList));
  }, [itemList]);

  const handleSubmit = () => {
    console.log('this is submit func')
    if (item.length > 0) {
      if (editIndex != null) {
        const updatedItems = [...itemList];
        updatedItems[editIndex] = item;
        setItemList(updatedItems);
        setTodoItems('');
        setEditIndex(null);
        setOpenEditTaskSnackbar(true);
      } else {
        setItemList([...itemList, item]);
        setTodoItems('');
        setOpenAddTaskSnackbar(true);
      }
    } else {
      setOpenInputFilled(true)
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTodoItems(value);
  };

  const handleDelete = (position: any) => {
    let updateList = itemList.filter((_: any, index: any) => index != position);
    setItemList(updateList);
    setOpenDeleteTaskSnackbar(true);
  };

  const handleEdit = (position: any) => {
    setTodoItems(itemList[position]);
    setEditIndex(position);
  };

  const filteredList = useMemo(() => {
    return itemList.filter((value: any) => {
      return value.includes(searchText);
    });
  }, [itemList, searchText]);

  const handleSearchItem = (event: any) => {
    setSearchText(event.target.value);
  };

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAddTaskSnackbar(false);
    setOpenDeleteTaskSnackbar(false);
    setOpenEditTaskSnackbar(false);
    setOpenInputFilled(false)
  };

  return (
    <Fragment>
      <div className="container">
        <h1 className="appName">Todo App</h1>
        <div className="inputParent">
          <OutlinedInput value={item} placeholder="Add Your Task" onChange={handleInputChange} className="inputField" />
          <Button
            variant="contained"
            color="success"
            className="styleAddBtn"
            onClick={handleSubmit}
          >
            Add
          </Button>
          <Snackbar open={openAddTaskSnackbar} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: '100%' }}
            >
              Task Added Successfully!
            </Alert>
          </Snackbar>
          <Snackbar open={openDeleteTaskSnackbar} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              color="error"
              variant="filled"
              sx={{ width: '100%' }}
            >
              Task deleted Successfully!
            </Alert>
          </Snackbar>
          <Snackbar open={openEditTaskSnackbar} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              color="info"
              variant="filled"
              sx={{ width: '100%' }}
            >
              Task Edited Successfully!
            </Alert>
          </Snackbar>
          <Snackbar open={openInputFilled} autoHideDuration={3000} onClose={handleClose}               anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Change position here
>
            <Alert
              onClose={handleClose}
              severity="warning"
              color="warning"
              variant="filled"
              sx={{ width: '100%' }}
              >
              Please fill the input field!
            </Alert>
          </Snackbar>
        </div>
        <div>
          <OutlinedInput value={searchText} placeholder="Search..." onChange={handleSearchItem} className="searchField" />
        </div>
        <div style={{ margin: '120px 0 50px 0' }}>
          {filteredList && filteredList.length > 0 ? filteredList.map((value: any, index: number) => (
            <div className="itemLine" key={index}>
              <div>
                <li style={{ listStyleType: 'circle', color: "white", fontSize: '17px', wordBreak: 'break-word', marginRight: '15px', cursor: 'pointer' }} >{value}</li>
              </div>
              <div className="iconBtnContainer">
                <Button variant="contained" color="error" className="iconBtn" style={{ minWidth: "25px", width: "25px", height: "30px" }} onClick={() => handleDelete(index)} >
                  <DeleteIcon className="icon" />
                </Button>
                <Button variant="contained" className="iconBtn" style={{ minWidth: "25px", width: "25px", height: "30px" }} onClick={() => handleEdit(index)} >
                  <EditIcon className="icon" />
                </Button>
              </div>
            </div>
          )) : <div className="noDataFoundContainer"><Typography className="noDataFoundText">No Data Found</Typography></div>}
        </div>
      </div>
    </Fragment>
  );
});

export default Todo;
