import RestaurantHours from "./restaurantHours";

export default function Header() {
  return (
    <div className="masthead flex space-between m-flex-col m-align-center">
      <div className="flex flex-col align-center m-flex-row m-gap-10 m-f14">
        <div>4223 Bryan Street</div>
        <div>Dallas, TX</div>
      </div>
      <div className="m-hide">make a Reservation</div>
      <RestaurantHours />
    </div>
  );
}
