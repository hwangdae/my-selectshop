import React from 'react'
import ReactPaginate from "react-paginate"
import Chevron from "@/assets/Chevron.svg";
import Chevrons from "@/assets/Chevrons.svg";
import { styleColor } from "@/styles/styleColor";

const PaginationContainer = () => {
  return (
    <ReactPaginate
        previousLabel={<Chevron transform={"rotate(180)"} fill={`${styleColor.GRAY[400]}`} />}
        nextLabel={<Chevron fill={`${styleColor.GRAY[400]}`} />}
        pageCount={3}
    />
  )
}

export default PaginationContainer