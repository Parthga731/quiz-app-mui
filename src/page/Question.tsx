import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addAnswer, isAnswered } from "../slices/QuizAppSlice";
import FinalScreen from "./FinalScreen";

export const Question = () => {
  const { QuestionList, isQuiz } = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, language } = useParams();

  const [selectedIndex, setselectedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(false);
  const [correct, setCorrect] = useState(0);

  console.log(selectedIndex);

  const handleListItemClick = (event: any, val: any) => {
    dispatch(isAnswered(val.id));
    dispatch(addAnswer({ id: val.id, value: event.target.value }));
  };

  const multiSelectHandler = (event: any, val: any) => {
    dispatch(isAnswered(val.id));
    const newArray = [...val.answerValue];
    if (event.target.checked && !newArray.includes(event.target.value)) {
      newArray.push(event.target.value);
      dispatch(addAnswer({ id: val.id, value: newArray }));
      console.log(newArray);
    } else {
      const afterRemoveArray = newArray.filter(
        (val) => val !== event.target.value
      );
      dispatch(addAnswer({ id: val.id, value: afterRemoveArray }));
    }
  };

  const pageHandler = (val: any, index: number) => {
    setselectedIndex(index);
    navigate(`/${language}/${index + 1}`);
  };

  const ansArray: any = [];
  const finalScreen = () => {
    setShowModal(true);
    QuestionList.forEach((val: any) => {
      if (val.id !== 4 && val.answerValue.includes(val.answer)) {
        setCorrect((prev) => prev + 1);
      }
    });
    QuestionList[4].answerValue.map((elem: any) => {
      if (QuestionList[4].answer.includes(elem)) {
        ansArray.push(true);
      } else {
        ansArray.push(false);
      }
    });

    if (ansArray.length) {
      if (ansArray.every((val: Boolean) => val === true)) {
        if (QuestionList[4].answer.val === ansArray.val) {
          setResult(true);
        } else {
          setResult(false);
        }
      }
    }
    console.log(correct, ansArray, result);
  };

  return (
    <>
      {isQuiz && (
        <Box>
          {QuestionList.map((val: any, index: number) => {
            return (
              <Button
                style={{
                  margin: "0.8rem",
                  backgroundColor: val.isAnswer ? "red" : "grey",
                }}
                variant="contained"
                onClick={() => pageHandler(val, index)}
                key={index}>
                {val.questionNo}
              </Button>
            );
          })}
          <Box>
            <h3>Question No: {QuestionList[selectedIndex].questionNo}</h3>
            <h2>
              {QuestionList.length && QuestionList[selectedIndex].question}
            </h2>
          </Box>

          {QuestionList[selectedIndex].id !== 4 ? (
            <RadioGroup
              row
              aria-labelledby="answer"
              name="row-radio-buttons-group">
              <Box>
                {QuestionList[selectedIndex].options.map(
                  (item: any, index: any) => {
                    return (
                      <FormControlLabel
                        value={item}
                        control={
                          <Radio
                            checked={
                              QuestionList[selectedIndex].answerValue.includes(
                                item
                              )
                                ? true
                                : false
                            }
                          />
                        }
                        label={item}
                        onChange={(event) =>
                          handleListItemClick(
                            event,
                            QuestionList[selectedIndex]
                          )
                        }
                      />
                    );
                  }
                )}
              </Box>
            </RadioGroup>
          ) : (
            <Box>
              <FormGroup
                onChange={(e: any) =>
                  multiSelectHandler(e, QuestionList[selectedIndex])
                }>
                {QuestionList[selectedIndex].options.map(
                  (item: any, index: any) => {
                    console.log(QuestionList[selectedIndex].answerValue);
                    console.log(item);
                    return (
                      <FormControlLabel
                        value={item}
                        control={
                          <Checkbox
                            checked={
                              QuestionList[selectedIndex].answerValue.includes(
                                item
                              )
                                ? true
                                : false
                            }
                            name="multiplechoice"
                          />
                        }
                        label={item}
                      />
                    );
                  }
                )}
              </FormGroup>
            </Box>
          )}

          <Box>
            {QuestionList[selectedIndex].id === 4 && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ width: 185 }}
                  onClick={finalScreen}>
                  Submit
                </Button>
                <FinalScreen
                  showModal={showModal}
                  onClose={() => setShowModal(false)}
                  correct={result ? correct + 1 : correct}
                  setCorrect={setCorrect}
                />
              </>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
