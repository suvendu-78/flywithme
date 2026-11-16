import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  Plane,
  CalendarDays,
  Clock,
  Users,
  ArrowRight,
  ArrowLeftRight,
  Crown,
  Armchair,
  Check,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Utensils,
  CreditCard,
  Pencil,
  Plus,
  Trash2,
  UserCircle,
  MapPin,
} from "lucide-react";

const airports = [
  {
    code: "BLR",
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    lat: 13.1986,
    lon: 77.7066,
  },
  {
    code: "DEL",
    city: "Delhi",
    airport: "Indira Gandhi International Airport",
    lat: 28.5562,
    lon: 77.1,
  },
  {
    code: "BOM",
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    lat: 19.0896,
    lon: 72.8656,
  },
  {
    code: "MAA",
    city: "Chennai",
    airport: "Chennai International Airport",
    lat: 12.9941,
    lon: 80.1709,
  },
  {
    code: "HYD",
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    lat: 17.2403,
    lon: 78.4294,
  },
  {
    code: "CCU",
    city: "Kolkata",
    airport: "Netaji Subhas Chandra Bose International Airport",
    lat: 22.6547,
    lon: 88.4467,
  },
  {
    code: "BBI",
    city: "Bhubaneswar",
    airport: "Biju Patnaik International Airport",
    lat: 20.2444,
    lon: 85.8178,
  },
  {
    code: "PNQ",
    city: "Pune",
    airport: "Pune International Airport",
    lat: 18.5822,
    lon: 73.9197,
  },
  {
    code: "GOI",
    city: "Goa",
    airport: "Manohar International Airport",
    lat: 15.3808,
    lon: 73.8314,
  },
  {
    code: "COK",
    city: "Kochi",
    airport: "Cochin International Airport",
    lat: 10.152,
    lon: 76.4019,
  },
];

const occupiedSeats = ["4D", "7A", "7E"];
const freeSeats = ["5D", "6A", "6E", "9E"];

const meals = [
  { id: 1, name: "Vegetarian Meal", price: 150 },
  { id: 2, name: "Non-Vegetarian Meal", price: 200 },
  { id: 3, name: "Vegan Meal", price: 180 },
  { id: 4, name: "No Meal", price: 0 },
];

const getFlightStorageKey = (from, to, date) =>
  `flyme_booked_seats_${from}_${to}_${date}`;

const getSavedSeats = (from, to, date) => {
  try {
    const key = getFlightStorageKey(from, to, date);
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const calculateDistance = (from, to) => {
  const rad = (value) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = rad(to.lat - from.lat);
  const dLon = rad(to.lon - from.lon);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(from.lat)) * Math.cos(rad(to.lat)) * Math.sin(dLon / 2) ** 2;

  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const calculateDuration = (distance) => {
  const minutes = Math.round((distance / 750) * 60 + 30);
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

const getSeatPrice = (row, seat) => {
  if (freeSeats.includes(seat)) return 0;
  if (row === 1) return 250;
  if (row === 2) return 350;
  return 0;
};

const getSeatCategory = (row, seat) => {
  if (freeSeats.includes(seat)) return "Free";
  if (row === 1) return "Premium";
  if (row === 2) return "Extra Legroom";
  return "Standard";
};

const getAirportFromValue = (value, fallback) => {
  if (value && typeof value === "object" && value.code) {
    return airports.find((a) => a.code === value.code) || fallback;
  }

  if (typeof value === "string") {
    const match = value.match(/\(([A-Z]{3})\)/);
    const code = match?.[1] || value;

    return (
      airports.find(
        (a) => a.code === code || a.city.toLowerCase() === value.toLowerCase(),
      ) || fallback
    );
  }

  return fallback;
};

const createPassengers = (count) =>
  Array.from(
    { length: Math.min(Math.max(Number(count) || 1, 1), 9) },
    (_, index) => ({
      id: index + 1,
      name: `Passenger ${index + 1}`,
      email: "",
      type: "Adult",
      seat: null,
      meal: null,
    }),
  );

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const incomingSearch =
    location.state?.searchData || location.state?.search || {};

  const searchFrom = incomingSearch.from || searchParams.get("from");
  const searchTo = incomingSearch.to || searchParams.get("to");

  const searchDate =
    incomingSearch.departure ||
    incomingSearch.date ||
    searchParams.get("departure");

  const searchPassengerCount =
    incomingSearch.passengers || searchParams.get("passengers") || 1;

  const initialFrom = getAirportFromValue(
    searchFrom,
    airports.find((a) => a.code === "BBI"),
  );

  const initialTo = getAirportFromValue(
    searchTo,
    airports.find((a) => a.code === "BLR"),
  );

  const initialDate = searchDate || new Date().toISOString().split("T")[0];

  const passengerNameRef = useRef(null);
  const passengerEmailRef = useRef(null);
  const passengerTypeRef = useRef(null);

  const fromRef = useRef(null);
  const toRef = useRef(null);
  const dateRef = useRef(null);
  const passengerCountRef = useRef(null);

  const [passengers, setPassengers] = useState(() =>
    createPassengers(searchPassengerCount),
  );

  const [activePassenger, setActivePassenger] = useState(1);
  const [configuration, setConfiguration] = useState("3-2");
  const [showMeals, setShowMeals] = useState(false);
  const [showPassengerForm, setShowPassengerForm] = useState(false);
  const [showFlightEditor, setShowFlightEditor] = useState(false);
  const [notice, setNotice] = useState("");

  const [flight, setFlight] = useState(() => {
    const distance = calculateDistance(initialFrom, initialTo);

    return {
      from: initialFrom,
      to: initialTo,
      date: initialDate,
      distance,
      duration: calculateDuration(distance),
      flightNumber: "FH 682",
    };
  });

  const [bookedSeats, setBookedSeats] = useState(() =>
    getSavedSeats(initialFrom.code, initialTo.code, initialDate),
  );

  useEffect(() => {
    const refreshSeats = () => {
      setBookedSeats(
        getSavedSeats(flight.from.code, flight.to.code, flight.date),
      );
    };

    refreshSeats();

    const handleStorageChange = (event) => {
      const currentKey = getFlightStorageKey(
        flight.from.code,
        flight.to.code,
        flight.date,
      );

      if (!event.key || event.key === currentKey) {
        refreshSeats();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    window.addEventListener("focus", refreshSeats);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", refreshSeats);
    };
  }, [flight.from.code, flight.to.code, flight.date]);

  const seatGroups =
    configuration === "3-2"
      ? [
          ["A", "B", "C"],
          ["D", "E"],
        ]
      : [
          ["A", "B"],
          ["C", "D", "E"],
          ["F", "G"],
        ];

  const activePassengerData = passengers.find((p) => p.id === activePassenger);

  const totalSeatPrice = useMemo(
    () => passengers.reduce((total, p) => total + (p.seat?.price || 0), 0),
    [passengers],
  );

  const totalMealPrice = useMemo(
    () => passengers.reduce((total, p) => total + (p.meal?.price || 0), 0),
    [passengers],
  );

  const totalAmount = totalSeatPrice + totalMealPrice;

  const formattedDate = new Date(`${flight.date}T00:00:00`).toLocaleDateString(
    "en-GB",
  );

  const showNotice = (message) => {
    setNotice(message);
    window.clearTimeout(showNotice.timer);
    showNotice.timer = window.setTimeout(() => setNotice(""), 3000);
  };

  const addPassenger = (e) => {
    e.preventDefault();

    const name = passengerNameRef.current?.value.trim();
    const email = passengerEmailRef.current?.value.trim();
    const type = passengerTypeRef.current?.value;

    if (!name || !email) {
      showNotice("Please enter passenger name and email.");
      return;
    }

    if (passengers.length >= 9) {
      showNotice("Maximum 9 passengers are allowed.");
      return;
    }

    const newPassenger = {
      id: Date.now(),
      name,
      email,
      type,
      seat: null,
      meal: null,
    };

    setPassengers((prev) => [...prev, newPassenger]);
    setActivePassenger(newPassenger.id);

    passengerNameRef.current.value = "";
    passengerEmailRef.current.value = "";
    passengerTypeRef.current.value = "Adult";

    setShowPassengerForm(false);
    showNotice("Passenger added successfully.");
  };

  const removePassenger = (id) => {
    if (passengers.length <= 1) {
      showNotice("At least one passenger is required.");
      return;
    }

    const updated = passengers.filter((p) => p.id !== id);

    setPassengers(updated);

    if (activePassenger === id) {
      setActivePassenger(updated[0].id);
    }

    showNotice("Passenger removed successfully.");
  };

  const updateFlight = (e) => {
    e.preventDefault();

    const from = airports.find((a) => a.code === fromRef.current?.value);

    const to = airports.find((a) => a.code === toRef.current?.value);

    const date = dateRef.current?.value;

    const passengerCount = Math.min(
      9,
      Math.max(
        1,
        Number(passengerCountRef.current?.value || passengers.length),
      ),
    );

    if (!from || !to) {
      showNotice("Please select both airports.");
      return;
    }

    if (from.code === to.code) {
      showNotice("Departure and destination cannot be the same.");
      return;
    }

    if (!date) {
      showNotice("Please select departure date.");
      return;
    }

    const distance = calculateDistance(from, to);
    const updatedPassengers = passengers.slice(0, passengerCount);

    while (updatedPassengers.length < passengerCount) {
      updatedPassengers.push({
        id: Date.now() + updatedPassengers.length,
        name: `Passenger ${updatedPassengers.length + 1}`,
        email: "",
        type: "Adult",
        seat: null,
        meal: null,
      });
    }

    setFlight((prev) => ({
      ...prev,
      from,
      to,
      date,
      distance,
      duration: calculateDuration(distance),
      flightNumber: "FH 682",
    }));

    setPassengers(
      updatedPassengers.map((p) => ({
        ...p,
        seat: null,
        meal: null,
      })),
    );

    setActivePassenger(updatedPassengers[0].id);
    setShowFlightEditor(false);

    showNotice("Flight updated. Please select seats again.");
  };

  const assignSeat = (seat, row) => {
    const latestBookedSeats = getSavedSeats(
      flight.from.code,
      flight.to.code,
      flight.date,
    );

    if (occupiedSeats.includes(seat) || latestBookedSeats.includes(seat)) {
      setBookedSeats(latestBookedSeats);
      showNotice("This seat is already booked.");
      return;
    }

    const alreadyAssigned = passengers.some(
      (p) => p.seat?.number === seat && p.id !== activePassenger,
    );

    if (alreadyAssigned) {
      showNotice("This seat is already assigned to another passenger.");
      return;
    }

    const currentPassenger = passengers.find((p) => p.id === activePassenger);

    if (!currentPassenger) return;

    if (currentPassenger.seat?.number === seat) {
      setPassengers((prev) =>
        prev.map((p) => (p.id === activePassenger ? { ...p, seat: null } : p)),
      );

      showNotice("Seat released successfully.");
      return;
    }

    const price = getSeatPrice(row, seat);
    const category = getSeatCategory(row, seat);

    setPassengers((prev) =>
      prev.map((p) =>
        p.id === activePassenger
          ? {
              ...p,
              seat: {
                number: seat,
                price,
                category,
              },
            }
          : p,
      ),
    );

    showNotice(`${seat} assigned to ${currentPassenger.name}.`);
  };

  const selectMeal = (meal) => {
    setPassengers((prev) =>
      prev.map((p) => (p.id === activePassenger ? { ...p, meal } : p)),
    );
  };

  const getSeatStatus = (seat) => {
    if (occupiedSeats.includes(seat) || bookedSeats.includes(seat)) {
      return "occupied";
    }

    const assignedPassenger = passengers.find(
      (p) => p.seat?.number === seat && p.id !== activePassenger,
    );

    if (assignedPassenger) return "assigned";

    if (activePassengerData?.seat?.number === seat) {
      return "selected";
    }

    if (freeSeats.includes(seat)) return "free";

    return "available";
  };

  const renderSeat = (row, letter) => {
    const seat = `${row}${letter}`;
    const status = getSeatStatus(seat);

    const styles = {
      available: "bg-sky-100 border-sky-400 hover:bg-sky-200",
      occupied:
        "bg-slate-300 border-slate-400 text-slate-500 cursor-not-allowed",
      assigned:
        "bg-indigo-100 border-indigo-400 text-indigo-700 cursor-not-allowed",
      selected: "bg-blue-700 border-blue-800 text-white shadow-lg",
      free: "bg-green-100 border-green-400 hover:bg-green-200",
    };

    const assignedPassenger = passengers.find((p) => p.seat?.number === seat);

    return (
      <button
        key={seat}
        type="button"
        disabled={status === "occupied" || status === "assigned"}
        onClick={() => assignSeat(seat, row)}
        title={
          status === "occupied"
            ? `${seat} - Already booked`
            : status === "assigned"
              ? `${seat} assigned to ${assignedPassenger?.name}`
              : `${seat} - ${getSeatCategory(row, seat)} - ₹${getSeatPrice(row, seat)}`
        }
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 text-[10px] font-bold transition sm:h-12 sm:w-14 sm:rounded-xl sm:text-xs ${styles[status]}`}
      >
        {status === "selected" ? (
          <Check size={21} />
        ) : status === "occupied" ? (
          <X size={21} />
        ) : status === "assigned" ? (
          <UserCircle size={18} />
        ) : getSeatPrice(row, seat) > 0 ? (
          `₹${getSeatPrice(row, seat)}`
        ) : null}
      </button>
    );
  };

  const handleContinue = () => {
    const latestBookedSeats = getSavedSeats(
      flight.from.code,
      flight.to.code,
      flight.date,
    );

    const newlyUnavailable = passengers.filter(
      (p) =>
        p.seat &&
        (latestBookedSeats.includes(p.seat.number) ||
          occupiedSeats.includes(p.seat.number)),
    );

    if (newlyUnavailable.length) {
      setBookedSeats(latestBookedSeats);
      showNotice(
        "One of your selected seats is no longer available. Please select another seat.",
      );
      return;
    }

    const missing = passengers.filter((p) => !p.seat);

    if (missing.length) {
      showNotice(
        `Please select seats for ${missing.map((p) => p.name).join(", ")}`,
      );
      return;
    }

    const assignedSeats = passengers.map((p) => p.seat.number);

    if (new Set(assignedSeats).size !== assignedSeats.length) {
      showNotice("Duplicate seats detected. Please check your selection.");
      return;
    }

    const bookingData = {
      bookingId: `FH-${Date.now()}`,
      pnr: `FH${Math.floor(100000 + Math.random() * 900000)}`,
      status: "Pending Payment",
      flight: {
        from: flight.from,
        to: flight.to,
        date: flight.date,
        formattedDate,
        distance: flight.distance,
        duration: flight.duration,
        flightNumber: flight.flightNumber,
      },
      passengers: passengers.map((passenger) => ({
        ...passenger,
        seat: passenger.seat ? { ...passenger.seat } : null,
        meal: passenger.meal ? { ...passenger.meal } : null,
      })),
      configuration,
      totalSeatPrice,
      totalMealPrice,
      totalAmount,
      bookingDate: new Date().toISOString(),
    };

    navigate("/ManageBooking", {
      state: {
        booking: bookingData,
      },
    });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#edf5ff] text-[#101d48]">
      {notice && (
        <div className="fixed right-4 top-5 z-[100] max-w-[calc(100%-2rem)] rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl">
          {notice}
        </div>
      )}

      <main className="mx-auto w-full max-w-[1500px] px-2 py-4 sm:px-5 sm:py-6 lg:px-8">
        <section className="mb-5 grid grid-cols-1 gap-4 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm sm:grid-cols-2 sm:gap-5 sm:p-5 lg:grid-cols-[1.4fr_auto_1.4fr_0.8fr_0.8fr_0.7fr_auto] lg:items-center">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="shrink-0 rounded-xl bg-blue-50 p-3 sm:p-4">
              <Plane size={30} className="text-blue-800 sm:size-9" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold sm:text-lg">
                {flight.from.city} ({flight.from.code})
              </h2>
              <p className="truncate text-xs text-slate-600 sm:text-sm">
                {flight.from.airport}
              </p>
            </div>
          </div>

          <div className="hidden justify-center lg:flex">
            <ArrowRight className="text-slate-500" />
          </div>

          <div className="flex min-w-0 items-center gap-3 lg:block">
            <div className="lg:hidden">
              <ArrowRight className="text-slate-500" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold sm:text-lg">
                {flight.to.city} ({flight.to.code})
              </h2>
              <p className="truncate text-xs text-slate-600 sm:text-sm">
                {flight.to.airport}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="shrink-0 text-blue-900" />
            <span className="text-sm font-semibold sm:text-base">
              {formattedDate}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Plane className="shrink-0 text-blue-900" />
            <span className="text-sm font-semibold sm:text-base">
              {flight.flightNumber}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="shrink-0 text-blue-900" />
            <span className="text-sm font-semibold sm:text-base">
              {flight.duration}
            </span>
          </div>

          <button
            onClick={() => setShowFlightEditor(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-blue-800 px-4 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-800 hover:text-white sm:col-span-2 lg:col-span-1"
          >
            <Pencil size={17} />
            Change Flight
          </button>

          <div className="border-t pt-3 text-xs text-slate-500 sm:col-span-2 sm:text-sm lg:col-span-full">
            Flight Distance: {flight.distance.toLocaleString("en-IN")} km
          </div>
        </section>

        <section className="mb-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 py-2 sm:mb-7 sm:gap-3">
          {[
            "Flight Details",
            "Passenger Details",
            "Seat Selection",
            "Payment",
          ].map((step, index) => (
            <React.Fragment key={step}>
              <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold sm:h-9 sm:w-9 ${
                    index <= 2
                      ? "bg-blue-700 text-white"
                      : "border-2 border-slate-400 text-slate-500"
                  }`}
                >
                  {index < 2 ? <Check size={19} /> : index + 1}
                </div>
                <span
                  className={`hidden text-xs font-semibold sm:block sm:text-sm md:text-base ${
                    index === 2 ? "text-blue-900" : "text-slate-600"
                  }`}
                >
                  {step}
                </span>
              </div>
              {index !== 3 && (
                <div className="mx-1 hidden h-px w-8 bg-blue-300 lg:block xl:w-20" />
              )}
            </React.Fragment>
          ))}
        </section>

        <div className="grid min-w-0 grid-cols-1 items-start gap-4 sm:gap-5 xl:grid-cols-[minmax(0,1.8fr)_minmax(340px,1fr)]">
          <section className="min-w-0 rounded-2xl border border-blue-100 bg-white p-3 shadow-md sm:rounded-3xl sm:p-5 lg:p-7">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Choose your seats
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
              Select a seat for each passenger. Already booked seats are
              unavailable.
            </p>

            <div className="mt-5 grid min-w-0 grid-cols-1 gap-5 lg:mt-7 lg:grid-cols-[minmax(220px,0.85fr)_minmax(0,1.5fr)] lg:gap-6">
              <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:flex-col lg:space-y-5 lg:gap-0">
                <div className="min-w-0 rounded-2xl border border-slate-200 p-3 sm:p-5">
                  <h3 className="mb-4 text-lg font-bold sm:text-xl">
                    Seat Categories
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 border-t pt-4">
                      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                        <div className="shrink-0 rounded-lg bg-pink-100 p-2 text-pink-600 sm:p-3">
                          <Crown size={23} />
                        </div>
                        <div>
                          <p className="text-sm font-bold sm:text-base">
                            Premium
                          </p>
                          <p className="text-xs text-slate-500">
                            Front rows, extra comfort
                          </p>
                        </div>
                      </div>
                      <b className="shrink-0">₹250</b>
                    </div>

                    <div className="flex items-center justify-between gap-2 border-t pt-4">
                      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                        <div className="shrink-0 rounded-lg bg-amber-100 p-2 text-amber-600 sm:p-3">
                          <Armchair size={23} />
                        </div>
                        <div>
                          <p className="text-sm font-bold sm:text-base">
                            Extra Legroom
                          </p>
                          <p className="text-xs text-slate-500">
                            More space to stretch
                          </p>
                        </div>
                      </div>
                      <b className="shrink-0">₹350</b>
                    </div>

                    <div className="flex items-center justify-between gap-2 border-t pt-4">
                      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                        <div className="shrink-0 rounded-lg bg-sky-100 p-2 text-sky-700 sm:p-3">
                          <Armchair size={23} />
                        </div>
                        <div>
                          <p className="text-sm font-bold sm:text-base">
                            Standard
                          </p>
                          <p className="text-xs text-slate-500">
                            Comfortable and affordable
                          </p>
                        </div>
                      </div>
                      <b className="shrink-0">₹0</b>
                    </div>
                  </div>
                </div>

                <div className="min-w-0 rounded-2xl border border-slate-200 p-3 sm:p-5">
                  <h3 className="mb-4 text-lg font-bold sm:text-xl">
                    Seat Legend
                  </h3>

                  {[
                    [
                      "bg-sky-100 border-sky-400",
                      "Available",
                      "You can select this seat",
                    ],
                    [
                      "bg-slate-300 border-slate-400",
                      "Occupied",
                      "Already booked",
                    ],
                    [
                      "bg-indigo-100 border-indigo-400",
                      "Assigned",
                      "Selected by another passenger",
                    ],
                    [
                      "bg-blue-700 border-blue-800",
                      "Selected",
                      "Assigned to active passenger",
                    ],
                    [
                      "bg-green-100 border-green-400",
                      "Free Seat",
                      "₹0 additional cost",
                    ],
                  ].map(([color, title, description]) => (
                    <div
                      key={title}
                      className="mb-4 flex items-center gap-3 last:mb-0 sm:gap-4"
                    >
                      <div
                        className={`flex h-9 w-10 shrink-0 items-center justify-center rounded-lg border sm:w-12 ${color}`}
                      >
                        {title === "Selected" && (
                          <Check className="text-white" size={20} />
                        )}
                        {title === "Occupied" && (
                          <X className="text-slate-500" size={20} />
                        )}
                        {title === "Assigned" && (
                          <UserCircle className="text-indigo-700" size={20} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold sm:text-base">
                          {title}
                        </p>
                        <p className="text-xs leading-5 text-slate-500">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="min-w-0 overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-white p-2 sm:p-4">
                <div className="mb-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    className="rounded-full border bg-white p-2 shadow-sm"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <select
                    value={configuration}
                    onChange={(e) => setConfiguration(e.target.value)}
                    className="max-w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-bold outline-none focus:border-blue-500 sm:px-4 sm:text-sm"
                  >
                    <option value="3-2">3 – 2 Configuration</option>
                    <option value="2-3-2">2 – 3 – 2 Configuration</option>
                  </select>

                  <button
                    type="button"
                    className="rounded-full border bg-white p-2 shadow-sm"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="w-full overflow-x-auto overscroll-x-contain pb-3">
                  <div className="mx-auto w-max min-w-[330px] rounded-t-[45%] border-x-[6px] border-t-[7px] border-slate-200 bg-white px-2 pb-5 pt-7 shadow-inner sm:min-w-[390px] sm:border-x-[9px] sm:border-t-[9px] sm:px-4">
                    <div className="mb-4 flex items-center justify-center gap-2 sm:gap-3">
                      <span className="w-5 shrink-0" />

                      {seatGroups.map((group, index) => (
                        <React.Fragment key={index}>
                          <div className="flex justify-center gap-2 sm:gap-3">
                            {group.map((letter) => (
                              <span
                                key={letter}
                                className="w-9 text-center text-xs font-bold sm:w-14 sm:text-sm"
                              >
                                {letter}
                              </span>
                            ))}
                          </div>
                          {index !== seatGroups.length - 1 && (
                            <div className="w-4 shrink-0 sm:w-8" />
                          )}
                        </React.Fragment>
                      ))}

                      <span className="w-5 shrink-0" />
                    </div>

                    <div className="space-y-2">
                      {Array.from({ length: 9 }, (_, index) => {
                        const row = index + 1;

                        return (
                          <div
                            key={row}
                            className="flex items-center justify-center gap-2 sm:gap-3"
                          >
                            <span className="w-4 shrink-0 text-center text-xs font-semibold sm:w-5 sm:text-sm">
                              {row}
                            </span>

                            {seatGroups.map((group, groupIndex) => (
                              <React.Fragment key={groupIndex}>
                                <div className="flex gap-1.5 sm:gap-3">
                                  {group.map((letter) =>
                                    renderSeat(row, letter),
                                  )}
                                </div>
                                {groupIndex !== seatGroups.length - 1 && (
                                  <div className="w-4 shrink-0 sm:w-8" />
                                )}
                              </React.Fragment>
                            ))}

                            <span className="w-4 shrink-0 text-center text-xs font-semibold sm:w-5 sm:text-sm">
                              {row}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-center text-xs leading-5 text-slate-500">
                  Select an available seat to assign it to the active passenger.
                </p>
              </div>
            </div>
          </section>

          <aside className="min-w-0 rounded-2xl border border-blue-100 bg-white p-3 shadow-md sm:rounded-3xl sm:p-5 lg:p-6">
            <div className="mb-5">
              <div className="mb-4 flex items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-lg font-bold sm:gap-3 sm:text-xl">
                  <Users size={24} />
                  Passengers ({passengers.length})
                </h3>

                <button
                  onClick={() => setShowPassengerForm(!showPassengerForm)}
                  disabled={passengers.length >= 9}
                  className="flex shrink-0 items-center gap-1 rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
                >
                  <Plus size={17} />
                  Add
                </button>
              </div>

              {showPassengerForm && (
                <form
                  onSubmit={addPassenger}
                  className="mb-4 space-y-3 rounded-xl border border-blue-200 bg-blue-50 p-3 sm:p-4"
                >
                  <input
                    ref={passengerNameRef}
                    type="text"
                    placeholder="Passenger full name"
                    required
                    className="w-full min-w-0 rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none focus:border-blue-500"
                  />
                  <input
                    ref={passengerEmailRef}
                    type="email"
                    placeholder="Passenger email"
                    required
                    className="w-full min-w-0 rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none focus:border-blue-500"
                  />

                  <select
                    ref={passengerTypeRef}
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none"
                  >
                    <option value="Adult">Adult</option>
                    <option value="Child">Child</option>
                    <option value="Infant">Infant</option>
                  </select>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="submit"
                      className="flex-1 rounded-lg bg-blue-700 p-3 text-sm font-bold text-white"
                    >
                      Save Passenger
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPassengerForm(false)}
                      className="rounded-lg border bg-white px-4 py-3 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {passengers.map((p) => (
                  <div
                    key={p.id}
                    className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-xl border p-2.5 transition sm:p-3 ${
                      activePassenger === p.id
                        ? "border-blue-300 bg-blue-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <button
                      onClick={() => setActivePassenger(p.id)}
                      className="flex min-w-0 flex-1 items-center gap-2 text-left sm:gap-3"
                    >
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${activePassenger === p.id ? "border-blue-600" : "border-slate-400"}`}
                      >
                        {activePassenger === p.id && (
                          <div className="h-2 w-2 rounded-full bg-blue-600" />
                        )}
                      </div>
                      <UserCircle size={23} className="shrink-0" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold sm:text-base">
                          {p.name}
                        </p>
                        <p className="text-xs text-slate-600">{p.type}</p>
                      </div>
                    </button>

                    <span className="shrink-0 rounded-lg border border-blue-300 bg-white px-2 py-2 text-xs font-bold text-blue-800 sm:px-3">
                      {p.seat?.number || "No seat"}
                    </span>

                    <button
                      onClick={() => removePassenger(p.id)}
                      title="Remove passenger"
                      className="shrink-0 rounded-lg p-2 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <hr className="my-5" />

            <div>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold sm:gap-3 sm:text-xl">
                <Armchair size={24} />
                Selected Seat & Add-ons
              </h3>

              <div className="rounded-xl border border-slate-200 p-2 sm:p-3">
                {passengers.map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 py-3 last:border-0"
                  >
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <div className="shrink-0 rounded-lg bg-slate-100 p-2">
                        <Armchair size={22} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold sm:text-base">
                          {p.name}
                        </p>
                        <p className="text-xs text-slate-600">
                          {p.seat
                            ? `Seat ${p.seat.number} • ${p.seat.category}`
                            : "Not selected"}
                        </p>
                      </div>
                    </div>
                    <b className="text-sm sm:text-base">
                      {p.seat ? `₹${p.seat.price}` : "—"}
                    </b>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <button
                onClick={() => setShowMeals(!showMeals)}
                className="flex w-full items-center justify-between gap-2 p-3 text-left transition hover:bg-slate-50 sm:p-4"
              >
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <div className="shrink-0 rounded-lg bg-blue-50 p-2 text-blue-700">
                    <Utensils size={22} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold sm:text-base">
                      Meal Options (Optional)
                    </p>
                    <p className="text-xs text-slate-600">
                      Add meals for your journey
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`shrink-0 transition-transform ${showMeals ? "rotate-90" : ""}`}
                />
              </button>

              {showMeals && (
                <div className="border-t p-3 sm:p-4">
                  <p className="mb-3 text-sm font-semibold">
                    Select meal for {activePassengerData?.name}
                  </p>

                  <div className="space-y-2">
                    {meals.map((meal) => (
                      <button
                        key={meal.id}
                        onClick={() => selectMeal(meal)}
                        className={`flex w-full items-center justify-between gap-2 rounded-lg border p-3 text-left text-sm ${
                          activePassengerData?.meal?.id === meal.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200"
                        }`}
                      >
                        <span>{meal.name}</span>
                        <span className="shrink-0 font-bold">
                          {meal.price === 0 ? "Free" : `₹${meal.price}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <hr className="my-5" />

            <div>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold sm:gap-3 sm:text-xl">
                <CreditCard size={23} />
                Price Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-2">
                  <span>Seat Charges</span>
                  <span className="font-semibold">₹{totalSeatPrice}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span>Meal Charges</span>
                  <span className="font-semibold">₹{totalMealPrice}</span>
                </div>
                <div className="flex justify-between gap-2 border-t pt-4 text-lg font-extrabold sm:text-xl">
                  <span>Total Amount</span>
                  <span className="text-blue-800">₹{totalAmount}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-800 px-3 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-blue-900 sm:gap-3 sm:text-base"
            >
              Continue to Payment
              <ArrowRight size={21} />
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-slate-500">
              Your seat selection will be confirmed after successful payment.
            </p>
          </aside>
        </div>
      </main>

      {showFlightEditor && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-2 sm:items-center sm:p-4">
          <div className="my-2 w-full max-w-xl rounded-2xl bg-white p-4 shadow-2xl sm:my-auto sm:rounded-3xl sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
              <div className="min-w-0">
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  Change Your Flight
                </h2>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Update your travel details
                </p>
              </div>

              <button
                onClick={() => setShowFlightEditor(false)}
                className="shrink-0 rounded-full bg-slate-100 p-2 hover:bg-slate-200"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={updateFlight} className="space-y-4 sm:space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
                  Departure Airport
                </label>
                <div className="relative">
                  <MapPin
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700"
                  />
                  <select
                    ref={fromRef}
                    defaultValue={flight.from.code}
                    required
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-9 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:py-4 sm:text-base"
                  >
                    {airports.map((airport) => (
                      <option key={airport.code} value={airport.code}>
                        {airport.city} ({airport.code}) - {airport.airport}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <div className="rounded-full bg-blue-50 p-3 text-blue-700">
                  <ArrowLeftRight size={23} />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
                  Destination Airport
                </label>
                <div className="relative">
                  <MapPin
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700"
                  />
                  <select
                    ref={toRef}
                    defaultValue={flight.to.code}
                    required
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-9 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:py-4 sm:text-base"
                  >
                    {airports.map((airport) => (
                      <option key={airport.code} value={airport.code}>
                        {airport.city} ({airport.code}) - {airport.airport}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
                  Departure Date
                </label>
                <div className="relative">
                  <CalendarDays
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700"
                  />
                  <input
                    ref={dateRef}
                    type="date"
                    defaultValue={flight.date}
                    min={new Date().toISOString().split("T")[0]}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:py-4 sm:text-base"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800 sm:text-base">
                  Number of Passengers
                </label>
                <div className="relative">
                  <Users
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700"
                  />
                  <select
                    ref={passengerCountRef}
                    defaultValue={passengers.length}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-3.5 pl-11 pr-9 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:py-4 sm:text-base"
                  >
                    {Array.from({ length: 9 }, (_, index) => index + 1).map(
                      (count) => (
                        <option key={count} value={count}>
                          {count} {count === 1 ? "Passenger" : "Passengers"}
                        </option>
                      ),
                    )}
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-blue-50 p-3 sm:p-4">
                <h3 className="mb-3 font-bold text-blue-900">
                  Current Flight Information
                </h3>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-slate-600">Current Route</span>
                    <span className="text-right font-bold">
                      {flight.from.code} → {flight.to.code}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-slate-600">Distance</span>
                    <span className="font-bold">
                      {flight.distance.toLocaleString("en-IN")} km
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-slate-600">Duration</span>
                    <span className="font-bold">{flight.duration}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800 sm:text-sm">
                Changing your flight will clear previously selected seats and
                meals. You will need to select them again.
              </div>

              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:gap-3">
                <button
                  type="button"
                  onClick={() => setShowFlightEditor(false)}
                  className="flex-1 rounded-xl border border-slate-300 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-800 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-blue-900 sm:text-base"
                >
                  Update Flight
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
