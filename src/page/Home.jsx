import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  ArrowLeftRight,
  ArrowRight,
  Search,
  Plane,
  Armchair,
  Utensils,
  ShieldCheck,
  Rocket,
  PlayCircle,
  Users,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState("One Way");
  const [from, setFrom] = useState("Bhubaneswar (BBI)");
  const [to, setTo] = useState("Bengaluru (BLR)");
  const [departure, setDeparture] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [error, setError] = useState("");

  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const benefits = [
    {
      icon: Rocket,
      title: "Best Fare",
      description: "Get competitive prices on every booking.",
      color: "bg-sky-100 text-sky-600",
    },
    {
      icon: Armchair,
      title: "Choose Your Seat",
      description: "Pick your preferred seat with ease.",
      color: "bg-red-50 text-red-600",
    },
    {
      icon: Utensils,
      title: "Add Meals",
      description: "Select from a variety of meal options.",
      color: "bg-sky-100 text-sky-600",
    },
    {
      icon: ShieldCheck,
      title: "Safe & Reliable",
      description: "A trusted and secure travel experience.",
      color: "bg-red-50 text-red-600",
    },
  ];

  const routes = [
    {
      from: "Bhubaneswar",
      to: "Bengaluru",
      price: "₹3,499",
      image: "/images/bengaluru.jpg",
    },
    {
      from: "Bhubaneswar",
      to: "Mumbai",
      price: "₹4,199",
      image: "/images/mumbai.jpg",
    },
    {
      from: "Bhubaneswar",
      to: "Hyderabad",
      price: "₹3,899",
      image: "/images/hyderabad.jpg",
    },
    {
      from: "Bhubaneswar",
      to: "Delhi",
      price: "₹4,299",
      image: "/images/delhi.jpg",
    },
  ];

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setError("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");

    if (!from || !to || !departure) {
      setError("Please select departure, destination and travel date.");
      return;
    }

    if (from === to) {
      setError("Departure and destination cannot be the same.");
      return;
    }

    const searchData = {
      tripType,
      from,
      to,
      departure,
      passengers,
    };

    const params = new URLSearchParams({
      tripType,
      from,
      to,
      departure,
      passengers: String(passengers),
    });

    navigate(`/Booking?${params.toString()}`, {
      state: {
        searchData,
      },
    });
  };

  const scrollToSearch = () => {
    document.getElementById("flight-search")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <main className="w-full overflow-hidden bg-white">
      {/* HERO SECTION */}

      <section className="relative flex min-h-[570px] items-start bg-sky-200 sm:min-h-[520px] lg:min-h-[560px]">
        <img
          src="/flight.jpeg"
          alt="FlyMe aircraft flying in the sky"
          className="absolute inset-0 hidden h-full w-full object-cover object-[68%_center] sm:block sm:object-[65%_center] lg:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-white/20 sm:from-white/90 sm:via-white/55 sm:to-transparent lg:from-white/85 lg:via-white/35 lg:to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 pb-12 pt-12 sm:px-8 sm:pt-14 lg:px-10 lg:pt-16">
          <div className="max-w-[510px]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
              <Plane size={17} className="text-red-600" />
              <span className="text-xs font-bold tracking-wide text-blue-950 sm:text-sm">
                YOUR JOURNEY STARTS HERE
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-blue-950 sm:text-5xl lg:text-[58px]">
              Fly Anywhere
              <br />
              with <span className="text-red-600">FlyMe</span>
            </h1>

            <p className="mt-4 max-w-[440px] text-sm leading-6 text-slate-700 sm:text-base sm:leading-7 lg:text-lg">
              Book flights, choose your seats, add meals and enjoy a seamless
              travel experience.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2.5 shadow-sm backdrop-blur-sm">
                <CalendarDays className="text-red-600" size={20} />
                <span className="text-xs font-semibold text-blue-950 sm:text-sm">
                  Easy Booking
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2.5 shadow-sm backdrop-blur-sm">
                <Armchair className="text-red-600" size={20} />
                <span className="text-xs font-semibold text-blue-950 sm:text-sm">
                  Seat Selection
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2.5 shadow-sm backdrop-blur-sm">
                <Utensils className="text-red-600" size={20} />
                <span className="text-xs font-semibold text-blue-950 sm:text-sm">
                  Meal Options
                </span>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
              <button
                type="button"
                onClick={scrollToSearch}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-red-700 sm:px-7 sm:text-base"
              >
                Book a Flight
                <ArrowRight size={19} />
              </button>

              <button
                type="button"
                onClick={scrollToSearch}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/90 px-5 py-3 text-sm font-bold text-blue-950 transition hover:bg-sky-50 sm:px-6 sm:text-base"
              >
                <PlayCircle size={20} className="text-red-600" />
                How it Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FLIGHT SEARCH SECTION */}

      <section
        id="flight-search"
        className="relative z-20 mx-auto -mt-9 w-full max-w-[1320px] scroll-mt-24 px-4 sm:-mt-12 sm:px-6 lg:px-8"
      >
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:rounded-[24px] sm:p-6 lg:p-7">
          <div className="mb-5 flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 p-1 shadow-sm sm:max-w-[550px]">
            {["One Way", "Round Trip", "Multi City"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setTripType(type);
                  setError("");
                }}
                className={`flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-xs font-semibold transition sm:gap-2 sm:px-3 sm:text-sm ${
                  tripType === type
                    ? "bg-red-600 text-white shadow-md"
                    : "text-blue-950 hover:bg-sky-50"
                }`}
              >
                {type === "One Way" && <Plane size={16} />}
                {type === "Round Trip" && <ArrowLeftRight size={16} />}
                {type === "Multi City" && <MapPin size={16} />}
                {type}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-[1.2fr_44px_1.2fr_1fr_0.9fr_auto]">
              {/* FROM */}

              <div className="flex min-w-0 items-center rounded-xl border border-gray-200 px-3 py-3 transition focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100 sm:px-4">
                <MapPin size={22} className="mr-3 shrink-0 text-blue-950" />

                <div className="min-w-0 flex-1">
                  <label className="mb-1 block text-xs text-gray-500">
                    From
                  </label>

                  <select
                    value={from}
                    onChange={(e) => {
                      setFrom(e.target.value);
                      setError("");
                    }}
                    className="w-full min-w-0 bg-transparent text-sm font-bold text-blue-950 outline-none"
                  >
                    <option>Bhubaneswar (BBI)</option>
                    <option>Bengaluru (BLR)</option>
                    <option>Mumbai (BOM)</option>
                    <option>Delhi (DEL)</option>
                    <option>Hyderabad (HYD)</option>
                    <option>Kolkata (CCU)</option>
                  </select>
                </div>
              </div>

              {/* SWAP BUTTON */}

              <button
                type="button"
                onClick={handleSwap}
                aria-label="Swap locations"
                className="hidden h-11 w-11 items-center justify-center self-center rounded-full border border-gray-200 text-blue-950 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 lg:flex"
              >
                <ArrowLeftRight size={21} />
              </button>

              {/* TO */}

              <div className="flex min-w-0 items-center rounded-xl border border-gray-200 px-3 py-3 transition focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100 sm:px-4">
                <MapPin size={22} className="mr-3 shrink-0 text-blue-950" />

                <div className="min-w-0 flex-1">
                  <label className="mb-1 block text-xs text-gray-500">To</label>

                  <select
                    value={to}
                    onChange={(e) => {
                      setTo(e.target.value);
                      setError("");
                    }}
                    className="w-full min-w-0 bg-transparent text-sm font-bold text-blue-950 outline-none"
                  >
                    <option>Bengaluru (BLR)</option>
                    <option>Bhubaneswar (BBI)</option>
                    <option>Mumbai (BOM)</option>
                    <option>Delhi (DEL)</option>
                    <option>Hyderabad (HYD)</option>
                    <option>Kolkata (CCU)</option>
                  </select>
                </div>
              </div>

              {/* DEPARTURE */}

              <div className="flex min-w-0 items-center rounded-xl border border-gray-200 px-3 py-3 transition focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100 sm:px-4">
                <CalendarDays
                  size={22}
                  className="mr-3 shrink-0 text-blue-950"
                />

                <div className="min-w-0 flex-1">
                  <label className="mb-1 block text-xs text-gray-500">
                    Departure
                  </label>

                  <input
                    type="date"
                    value={departure}
                    min={minDate}
                    onChange={(e) => {
                      setDeparture(e.target.value);
                      setError("");
                    }}
                    required
                    className="w-full min-w-0 bg-transparent text-sm font-semibold text-blue-950 outline-none"
                  />
                </div>
              </div>

              {/* PASSENGERS */}

              <div className="flex min-w-0 items-center rounded-xl border border-gray-200 px-3 py-3 sm:px-4">
                <Users size={22} className="mr-3 shrink-0 text-blue-950" />

                <div className="min-w-0 flex-1">
                  <label className="mb-1 block text-xs text-gray-500">
                    Passengers
                  </label>

                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full min-w-0 bg-transparent text-sm font-bold text-blue-950 outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Passenger" : "Passengers"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SEARCH BUTTON */}

              <button
                type="submit"
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-bold text-white shadow-md transition hover:bg-red-700 sm:col-span-2 lg:col-span-1"
              >
                Search Flights
                <Search size={19} />
              </button>
            </div>

            {error && (
              <p className="mt-3 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
                {error}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* WHY CHOOSE FLYME */}

      <section className="mx-auto max-w-[1320px] px-5 pb-10 pt-14 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20">
        <div className="mb-7">
          <div className="mb-2 h-1 w-10 bg-red-600" />

          <h2 className="text-2xl font-extrabold text-blue-950 sm:text-3xl">
            Why Choose <span className="text-red-600">FlyMe?</span>
          </h2>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Everything you need for a comfortable journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-xl p-2 transition hover:bg-slate-50"
              >
                <div
                  className={`flex h-[65px] w-[65px] shrink-0 items-center justify-center rounded-2xl sm:h-[76px] sm:w-[76px] ${item.color}`}
                >
                  <Icon size={31} strokeWidth={2.2} />
                </div>

                <div>
                  <h3 className="font-bold text-blue-950">{item.title}</h3>

                  <p className="mt-1 max-w-[190px] text-sm leading-5 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* POPULAR ROUTES */}

      <section className="mx-auto max-w-[1320px] px-5 pb-14 pt-5 sm:px-8 sm:pb-16 lg:px-10">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <div className="mb-2 h-1 w-10 bg-red-600" />

            <h2 className="text-2xl font-extrabold text-blue-950 sm:text-3xl">
              Popular Routes
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Explore popular destinations from Bhubaneswar.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToSearch}
            className="flex shrink-0 items-center gap-1 text-xs font-bold text-red-600 transition hover:text-red-800 sm:gap-2 sm:text-base"
          >
            View All
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {routes.map((route) => (
            <div
              key={route.to}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-[170px] overflow-hidden sm:h-[155px] lg:h-[145px]">
                <img
                  src={route.image}
                  alt={`${route.from} to ${route.to}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-4">
                <h3 className="font-bold text-blue-950">
                  {route.from} → {route.to}
                </h3>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-slate-500">Starting from</p>

                  <p className="font-bold text-red-600">{route.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
