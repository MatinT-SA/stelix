import React from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import styled from "styled-components";

const StyledTableOperations = styled(TableOperations)`
  display: flex;
  gap: 1rem; /* Adjust gap as needed */
  align-items: center;

  @media (max-width: 650px) {
    flex-direction: column;
    align-items: stretch; /* Optional: makes children take full width */
    gap: 1rem; /* Adjust gap for the column layout */
  }
`;

function CabinTableOperations() {
  return (
    <StyledTableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name A-Z" },
          { value: "name-desc", label: "Sort by name Z-A" },
          { value: "regularPrice-asc", label: "Sort by price (low first)" },
          { value: "regularPrice-desc", label: "Sort by price (high first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
        ]}
      />
    </StyledTableOperations>
  );
}

export default CabinTableOperations;
