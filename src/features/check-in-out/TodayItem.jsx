import { Link } from "react-router-dom";
import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";

const FixedButton = styled(Button)`
  width: 9rem;
  display: inline-block;
`;

const GridAreaButtonWrapper = styled.div`
  @media (max-width: 500px) {
    grid-area: button;
    display: flex;
    justify-content: center;
  }

  & > * {
    width: 9rem;
    display: inline-block;
  }
`;

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  @media (max-width: 1200px) {
    gap: 0.4rem;
    font-size: 1.2rem;
  }

  @media (max-width: 1000px) {
    grid-template-columns: 9rem 3rem 12rem 1fr 9rem;
  }

  @media (max-width: 500px) {
    display: grid;
    grid-template-columns: 23% 6% 50% 15%;
    grid-template-areas:
      "tag flag guest nights"
      "button button button button";
    row-gap: 1rem;
  }

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, numNights, guests, status } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />

      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <GridAreaButtonWrapper>
          <FixedButton
            size="small"
            variation="primary"
            as={Link}
            to={`/checkin/${id}`}
          >
            Check in
          </FixedButton>
        </GridAreaButtonWrapper>
      )}

      {status === "checked-in" && (
        <GridAreaButtonWrapper>
          <CheckoutButton bookingId={id} />
        </GridAreaButtonWrapper>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
