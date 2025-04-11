import { HiOutlineBriefcase } from "react-icons/hi2";
import Stat from "./Stat";

function Stats({ bookings, confirmedStays }) {
  const numBookings = bookings.length;

  return (
    <>
      <Stat
        color="blue"
        title="Bookings"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
    </>
  );
}

export default Stats;
