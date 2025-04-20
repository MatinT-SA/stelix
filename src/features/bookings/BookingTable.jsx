import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";

import { useBookings } from "./useBookings";
import Pagination from "../../ui/Pagination";
import styled from "styled-components";

const ScrollWrapper = styled.div`
  width: 100%;
  overflow-x: auto;

  @media (min-width: 801px) {
    overflow-x: unset;
  }

  -webkit-overflow-scrolling: touch;
`;

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();

  if (isLoading) return <Spinner />;

  if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      {/* Scroll Wrapper for enabling horizontal scrolling on small screens */}
      <ScrollWrapper>
        <Table
          columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem"
          style={{ minWidth: "1700px" }}
        >
          {/* Set min-width to ensure the table doesn't shrink */}
          <Table.Header>
            <div>Cabin</div>
            <div>Guest</div>
            <div>Dates</div>
            <div>Status</div>
            <div>Amount</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={bookings}
            render={(booking) => (
              <BookingRow key={booking.id} booking={booking} />
            )}
          />

          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        </Table>
      </ScrollWrapper>
    </Menus>
  );
}

export default BookingTable;
