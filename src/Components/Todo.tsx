import React, { Fragment, useEffect, useMemo, useState } from "react";
import "./style.css";
import { Button, OutlinedInput, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Todo() {
  const [item, setTodoItems] = useState("");
  const [editIndex,setEditIndex]=useState<null>(null)
  const [searchText,setSearchText]=useState<string>('')
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
      if(editIndex!=null){
          const updatedItems=[...itemList]
          updatedItems[editIndex]=item
          setItemList(updatedItems)
          setTodoItems('')
          setEditIndex(null)
      }else{
      setItemList([...itemList, item]);
      setTodoItems('');
      }
    } else {
      alert('please write something in input field');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTodoItems(value);
  };

  const handleDelete=(position:any)=>{
    let updateList=itemList.filter((_:any,index:any)=>index!=position)
    setItemList(updateList)
  }
  const handleEdit=(position:any)=>{
    setTodoItems(itemList[position])
    setEditIndex(position)
  }
const filteredList = itemList.filter((value: any, index: any) => {
  return value.includes(searchText);
});

  const handleSearchItem=(event:any)=>{
    setSearchText(event.target.value)
  }

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
        </div>
        <div>
        <OutlinedInput value={searchText} placeholder="Search..." onChange={handleSearchItem} className="searchField" />
        </div>
        <div style={{ margin: '120px 0 50px 0' }}>
          {filteredList && filteredList.length>0 ? filteredList.map((value: any, index: number) => (
            <div className="itemLine" key={index}>
              <div>
                <li style={{ listStyleType: 'circle', color: "white", fontSize: '17px', wordBreak: 'break-word', marginRight: '15px',cursor:'pointer' }} >{value}</li>
              </div>
              <div className="iconBtnContainer">
                <Button variant="contained" color="error" className="iconBtn" style={{ minWidth: "25px", width: "25px", height: "30px" }}  onClick={()=>handleDelete(index)} >
                  <DeleteIcon className="icon" />
                </Button>
                <Button variant="contained" className="iconBtn" style={{ minWidth: "25px", width: "25px", height: "30px" }}  onClick={()=>handleEdit(index)} >
                  <EditIcon className="icon" />
                </Button>
              </div>
            </div>
          )):<div className="noDataFoundContainer"><Typography className="noDataFoundText">No Data Found</Typography></div>}
        </div>
      </div>
    </Fragment>
  );
}

export default Todo;
