import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllQuestion = createAsyncThunk(
  "language",
  async (language: any) => {
    console.log(language);
    const response = await axios.get(`http://localhost:4000/${language}`);
    return response.data;
  }
);

const initialState = {
  isQuiz: false,
  QuestionList: [],
} as any;

const QuizAppSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    isAnswered: (state, action) => {
      state.QuestionList[action.payload].isAnswer = true;
    },
    addUserData: (State, action) => {},
    addAnswer: (state, action: any) => {
      console.log(action.payload);

      //   if (
      //     state.answers.filter((item: any) => item.id === action.payload.id)
      //       .length === 0
      //   ) {
      //     state.answers = [...state.answers, action.payload];
      //   } else {
      //     state.answers.splice(
      //       state.answers.map((item: any) => item.id).indexOf(action.payload.id),
      //       1,
      //       action.payload
      //     );
      //   }
      //   //   if (!Object.keys(state.answers).includes(action.payload.id)) {
      //   //     state.answers = [...state.answers, action.payload];
      //   //   }
      //   console.log(state.answers);

      /********** */

      if (action.payload.id !== 4) {
        state.QuestionList[action.payload.id].answerValue = [
          action.payload.value,
        ];
      } else {
        state.QuestionList[action.payload.id].answerValue =
          action.payload.value;
      }
      //   if (!Object.keys(state.answers).includes(action.payload.id)) {
      //     state.answers = [...state.answers, action.payload];
      //   }
      console.log(state.QuestionList[action.payload.id]);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllQuestion.fulfilled, (state, action) => {
      state.QuestionList = action.payload;
      state.isQuiz = true;
    });
  },
});

export const { addAnswer, isAnswered } = QuizAppSlice.actions;
export default QuizAppSlice.reducer;
