import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const StyledSpanBull1 = styled.span`
  @media (max-width: 750px) {
    display: none;
  }
`;

const StyledSpanBull2 = styled.span`
  @media (max-width: 750px) {
    display: none;
  }
`;

const StyledP = styled.p`
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

const StyledGuestName = styled.p`
  grid-area: guest;
`;

const StyledGuestEmail = styled.p`
  grid-area: email;
`;

const StyledGuestNationalId = styled.p`
  grid-area: nationalId;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 800px) {
    font-size: 1.2rem;
    padding: 1rem 2rem;
  }

  @media (max-width: 420px) {
    padding: 0.5rem 1rem;
    flex-direction: column;
    font-size: 1.4rem;
  }

  svg {
    height: 3.2rem;
    width: 3.2rem;

    @media (max-width: 580px) {
      display: none;
    }
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;

  @media (max-width: 800px) {
    padding: 3rem 1.5rem 1rem;
  }
`;

const StyledFlag = styled(Flag)`
  grid-area: flag;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  @media (max-width: 750px) {
    display: grid;
    grid-template-areas:
      "flag guest email"
      "nationalId nationalId nationalId";
    gap: 1rem 1.5rem;
    justify-items: center;
  }

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <StyledP>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </StyledP>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && (
            <StyledFlag src={countryFlag} alt={`Flag of ${country}`} />
          )}
          <StyledGuestName>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </StyledGuestName>
          <StyledSpanBull1>&bull;</StyledSpanBull1>
          <StyledGuestEmail>{email}</StyledGuestEmail>
          <StyledSpanBull2>&bull;</StyledSpanBull2>
          <StyledGuestNationalId>
            National ID {nationalID}
          </StyledGuestNationalId>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <Price isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
