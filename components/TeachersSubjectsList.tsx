import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

export const TeachersSubjectsList: React.FC = () => {
  const theme = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const selectedTeacher = useAppSelector(
    (state) => state.initial.selectedTeacher
  );

  return <></>;
};
