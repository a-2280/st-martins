import RestaurantHours from "./restaurantHours";

export default function Header({ data }) {
  return (
    <div className="masthead flex space-between m-flex-col m-align-center">
      <div className="flex flex-col align-center m-flex-row m-gap-10 m-f14">
        <div>{data?.address?.street}</div>
        <div>{data?.address?.cityState}</div>
      </div>
      <a className="button-primary m-hide" href={data?.reservation?.link}>{data?.reservation?.button}</a>
      <RestaurantHours hours={data?.hours} />
    </div>
  );
}
