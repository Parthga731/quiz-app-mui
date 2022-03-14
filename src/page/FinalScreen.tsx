import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { PieChart } from "react-minimal-pie-chart";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItem: "center",
};

const FinalScreen = ({ showModal, onClose, correct, setCorrect }: any) => {
  const { QuestionList } = useAppSelector((state) => state.quiz);
  const correctPercentage = (correct / 5) * 100;
  const incorrectPercentage = 100 - correctPercentage;

  return (
    <>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} style={{ height: 700 }}>
          <h3>Answer</h3>
          {QuestionList.map((item: any) => {
            if (item.id !== 4) {
              if (item.answerValue.includes(item.answer)) {
                return (
                  <p>
                    {item.questionNo}:- {item.answerValue}
                  </p>
                );
              }
            } else {
              console.log(
                item.answer.filter((it: any, index: any) => {
                  console.log(it, "7", item.answerValue[index]);
                  return it === item.answerValue[index];
                })
              );
              if (
                item.answer.every(
                  (it: any, index: any) => it === item.answerValue[index]
                )
              ) {
                return (
                  <p>
                    {item.questionNo}:- {item.answerValue}
                  </p>
                );
              }
            }
          })}
          <PieChart
            animate={true}
            style={{ height: "100px" }}
            data={[
              {
                title: "Correct",
                value: correctPercentage,
                color: "#38bb38",
              },
              {
                title: "Incorrect",
                value: incorrectPercentage,
                color: "#e24646",
              },
            ]}
          />
          <p style={{ color: "green" }}>Correct Answer :{correct}</p>
          <p style={{ color: "red" }}>
            InCorrect Answer : {QuestionList.length - correct}
          </p>
          <p style={{ color: "green" }}>
            Correct Answer Percentage : {correctPercentage}%
          </p>
          <p style={{ color: "red" }}>
            InCorrect Answer Percentage : {incorrectPercentage}%
          </p>
        </Box>
      </Modal>
    </>
  );
};

export default FinalScreen;
