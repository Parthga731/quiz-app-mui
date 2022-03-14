import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAllQuestion } from "../slices/QuizAppSlice";

const Home = () => {
  const [username, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const navigate = useNavigate();
  const { QuestionList } = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  const handlerSubmit = (e: any) => {
    e.preventDefault();
    console.log(username, gender, language);
    dispatch(getAllQuestion(language));
    navigate(`./${language}/1`);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          m: 10,
        }}>
        <form onSubmit={handlerSubmit}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
              width: "500px",
            }}>
            <TextField
              name="name"
              label="Name"
              placeholder="Enter Name"
              sx={{ m: 2 }}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              variant="standard"
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={gender}
                onChange={(e) => setGender(e.target.value)}>
                <FormControlLabel
                  value="female"
                  name="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  name="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  name="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <FormControl style={{ width: "300px", margin: "20px" }}>
              <InputLabel id="demo-simple-select-label">Language</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={language}
                label="Age"
                name="language"
                onChange={(e) => setLanguage(e.target.value)}
                style={{ width: "300px" }}
                variant="standard">
                <MenuItem value="select">Select</MenuItem>
                <MenuItem value="hindi">Hindi</MenuItem>
                <MenuItem value="english">English</MenuItem>
              </Select>
              <Button type="submit" sx={{ m: 3 }}>
                Submit
              </Button>
            </FormControl>
          </Paper>
        </form>
      </Box>
    </>
  );
};

export default Home;
