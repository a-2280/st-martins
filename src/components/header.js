export default function Header() {
  return (
    <div className="masthead flex space-between">
      <div className="flex flex-col align-center">
        <div>4223 Bryan Street</div>
        <div>Dallas, TX</div>
      </div>
      <div>make a Reservation</div>
      <div className="flex flex-col align-center gap-5">
        <div className="flex flex-col align-center">
          <div>Sun-Thu: 5-10pm</div>
          <div>Fri & Sat: 5-11pm</div>
        </div>
        <div className="capitalize f12 op-4">Closed Now</div>
      </div>
    </div>
  );
}
