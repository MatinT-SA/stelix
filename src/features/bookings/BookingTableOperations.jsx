import styled from "styled-components";
import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

const StyledTableOperations = styled(TableOperations)`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 650px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

function BookingTableOperations() {
  return (
    <StyledTableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </StyledTableOperations>
  );
}

export default BookingTableOperations;
