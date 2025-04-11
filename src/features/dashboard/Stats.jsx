import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = confirmedStays.length;

  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        color="blue"
        title="Bookings"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        color="green"
        title="Sales"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        color="indigo"
        title="Check ins"
        value={checkins}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        color="yellow"
        title="Occupancy rate"
        value={Math.round(occupation * 100) + "%"}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
