import React from 'react'
import { useUserContext } from "../../../Contexts/Context";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";
import { Link, } from "react-router-dom";

function HayvonlarCard() {
    const { products, cardItemCategory } = useUserContext();
  return (
    <div>HayvonlarCard</div>
  )
}

export default HayvonlarCard