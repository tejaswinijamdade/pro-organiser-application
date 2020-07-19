import React, { useState, Fragment } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { v4 } from "uuid";
import styles from "./CreateBoardForm.module.css";
import firebase from "firebase/app";
import NavBar from "../../Layout/NavBar/NavBar";
import { toast } from "react-toastify";

const CreateBoardForm = () => {
  const [nameofBoard, setNameofBoard] = useState();
  const [teamMembers, setTeamMembers] = useState([]);
  const [typeOfBoard, setTypeOfBoard] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setData();
    toast("Board Created", { type: "success" });
  };

  const reset = () => {
    setNameofBoard(" ");
    setTeamMembers(" ");
    setTypeOfBoard(" ");
  };
  const setData = async () => {
    await firebase
      .database()
      .ref(`/boards/${v4()}/`)
      .set({ nameofBoard, teamMembers, typeOfBoard }, function (error) {
        if (error) {
          console.log(error);
        } else {
          reset();
          return "success";
        }
      });
  };

  return (
    <Fragment>
      <NavBar></NavBar>
      <div>
        <p className={styles.head}> Create Your Board</p>
        <Form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <FormGroup>
            <Label className={styles.label}>Name of Board</Label>
            <Input
              type="text"
              id="name"
              value={nameofBoard}
              placeholder="Enter Your Board Name "
              onChange={(e) => setNameofBoard(e.target.value)}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label className={styles.label}>
              Team Members{" "}
              <p
                style={{
                  fontSize: "12px",
                  paddingBottom: "0px",
                  marginBottom: "0px",
                }}
              >
                
              </p>
            </Label>
            <Input
              type="text"
              id="team"
              value={teamMembers}
              placeholder="Enter Your Team Members "
              onChange={(e) => setTeamMembers(e.target.value)}
              className={styles.members}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label className={styles.label}>Type of Board</Label>
            <Input
              type="text"
              id="type"
              value={typeOfBoard}
              placeholder="e.g. Design board, Testing board, etc."
              onChange={(e) => setTypeOfBoard(e.target.value)}
            ></Input>
          </FormGroup>
          <Button
            size="md"
            id="CreateBoard"
            type="submit"
            className={styles.createButton}
          >
            Create Board
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default CreateBoardForm;
