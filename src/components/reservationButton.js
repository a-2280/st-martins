export default function ReservationButton({ data }) {
  return <a className="reservation-button button-primary m-hide" href={data?.reservation?.link}>{data?.reservation?.button}</a>;
}
