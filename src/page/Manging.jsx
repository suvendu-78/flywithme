// import React, { useState } from "react";
// import { useLocation, Navigate, useNavigate } from "react-router-dom";
// import {
//   Plane,
//   CalendarDays,
//   Clock,
//   Users,
//   Armchair,
//   Ticket,
//   Mail,
//   User,
//   MapPin,
//   ArrowRight,
//   Search,
//   Pencil,
//   X,
//   Download,
//   CreditCard,
//   Utensils,
//   CheckCircle2,
//   Bell,
//   ChevronDown,
//   RotateCcw,
//   Luggage,
//   ShieldCheck,
// } from "lucide-react";

// const ManageBooking = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const booking = location.state?.booking;

//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [cancelled, setCancelled] = useState(false);

//   if (!booking) {
//     return <Navigate to="/booking" replace />;
//   }

//   const {
//     bookingId,
//     pnr,
//     status,
//     flight,
//     passengers = [],
//     totalSeatPrice = 0,
//     totalMealPrice = 0,
//     totalAmount = 0,
//     bookingDate,
//   } = booking;

//   const formatDate = (date) => {
//     if (!date) return "Date not available";

//     return new Date(date).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const formatTime = (date) => {
//     if (!date) return "";

//     return new Date(date).toLocaleTimeString("en-IN", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleCancel = () => {
//     setCancelled(true);
//     setShowCancelModal(false);
//   };

//   const bookingStatus = cancelled ? "Cancelled" : status || "Confirmed";

//   const statusIsCancelled = bookingStatus.toLowerCase().includes("cancel");

//   const statusIsPending = bookingStatus.toLowerCase().includes("pending");

//   return (
//     <div className="min-h-screen bg-[#edf5ff] text-[#101d48]">
//       {/* HERO */}
//       <section className="relative overflow-hidden bg-gradient-to-r from-[#e9f3ff] via-[#d6eaff] to-[#b8d9ff]">
//         <div className="absolute -right-10 top-0 opacity-20">
//           <Plane size={260} className="rotate-[-12deg] text-blue-600" />
//         </div>

//         <div className="relative mx-auto flex min-h-[165px] max-w-[1450px] items-center justify-between px-5 py-8 lg:px-10">
//           <div>
//             <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-700">
//               <span>FlyHere</span>
//               <span>/</span>
//               <span>My Trips</span>
//             </div>

//             <h1 className="text-3xl font-extrabold tracking-tight text-[#101d48] sm:text-4xl">
//               Manage Booking
//             </h1>

//             <p className="mt-2 text-sm text-slate-700 sm:text-base">
//               View, modify or cancel your flight bookings.
//             </p>
//           </div>

//           <div className="hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/40 px-5 py-4 shadow-sm backdrop-blur sm:flex">
//             <ShieldCheck size={32} className="text-blue-700" />
//             <div>
//               <p className="font-bold text-blue-950">Your trip, your way</p>
//               <p className="text-xs text-slate-600">
//                 Manage your travel details
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <main className="mx-auto max-w-[1450px] px-4 pb-12 pt-7 lg:px-8">
//         {/* BOOKING SEARCH REFERENCE */}
//         <section className="mb-8 rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_5px_20px_rgba(30,64,175,0.08)] sm:p-7">
//           <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
//             <div>
//               <h2 className="text-xl font-bold">Your Booking Reference</h2>
//               <p className="mt-1 text-sm text-slate-500">
//                 Your booking details are available below.
//               </p>
//             </div>

//             <span className="rounded-lg bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700">
//               BOOKING DETAILS
//             </span>
//           </div>

//           <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
//             <div>
//               <label className="mb-2 block text-sm font-semibold">
//                 Booking Reference (PNR)
//               </label>
//               <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
//                 <Ticket size={20} className="text-blue-700" />
//                 <span className="font-bold tracking-wide">
//                   {pnr || bookingId}
//                 </span>
//               </div>
//             </div>

//             <div>
//               <label className="mb-2 block text-sm font-semibold">
//                 Booking ID
//               </label>
//               <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
//                 <User size={20} className="text-blue-700" />
//                 <span className="truncate font-semibold">{bookingId}</span>
//               </div>
//             </div>

//             <div className="flex items-end">
//               <button
//                 onClick={handlePrint}
//                 className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-700 px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 md:w-auto"
//               >
//                 <Download size={18} />
//                 Download Itinerary
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* RESULT HEADING */}
//         <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
//           <div>
//             <h2 className="text-xl font-extrabold sm:text-2xl">
//               Booking Result (1)
//             </h2>
//             <p className="mt-1 text-sm text-slate-500">
//               Your flight and passenger information
//             </p>
//           </div>

//           <button
//             onClick={() => navigate("/booking")}
//             className="flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
//           >
//             <RotateCcw size={18} />
//             Book Another Flight
//           </button>
//         </div>

//         {/* MAIN BOOKING CARD */}
//         <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white p-4 shadow-[0_8px_30px_rgba(30,64,175,0.09)] sm:p-6">
//           <div className="grid gap-5 lg:grid-cols-[200px_1fr_195px]">
//             {/* BOOKING REFERENCE */}
//             <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[#eef5ff] to-[#e3eeff] px-4 py-7 text-center">
//               <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
//                 <Plane size={35} />
//               </div>

//               <p className="text-sm text-slate-600">Booking Reference</p>

//               <h2 className="mt-1 text-2xl font-extrabold tracking-wide">
//                 {pnr || bookingId}
//               </h2>

//               <span
//                 className={`mt-4 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
//                   statusIsCancelled
//                     ? "bg-red-100 text-red-700"
//                     : statusIsPending
//                       ? "bg-amber-100 text-amber-700"
//                       : "bg-green-100 text-green-700"
//                 }`}
//               >
//                 {statusIsCancelled ? (
//                   <X size={15} />
//                 ) : (
//                   <CheckCircle2 size={15} />
//                 )}
//                 {bookingStatus}
//               </span>
//             </div>

//             {/* FLIGHT INFORMATION */}
//             <div className="min-w-0">
//               <div className="flex flex-wrap items-center justify-between gap-5 border-b border-slate-200 pb-5">
//                 <div className="flex min-w-0 flex-1 items-center gap-3">
//                   <div className="min-w-0">
//                     <h3 className="text-lg font-extrabold">
//                       {flight.from.city} ({flight.from.code})
//                     </h3>
//                     <p className="mt-1 max-w-[190px] text-xs text-slate-500">
//                       {flight.from.airport}
//                     </p>
//                   </div>

//                   <ArrowRight className="shrink-0 text-slate-500" size={23} />

//                   <div className="min-w-0">
//                     <h3 className="text-lg font-extrabold">
//                       {flight.to.city} ({flight.to.code})
//                     </h3>
//                     <p className="mt-1 max-w-[190px] text-xs text-slate-500">
//                       {flight.to.airport}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
//                   <div className="flex items-center gap-2">
//                     <CalendarDays size={19} className="text-blue-700" />
//                     <span className="font-semibold">
//                       {flight.formattedDate || formatDate(flight.date)}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <Plane size={19} className="text-blue-700" />
//                     <span className="font-semibold">{flight.flightNumber}</span>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <Clock size={19} className="text-blue-700" />
//                     <span className="font-semibold">{flight.duration}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* PASSENGERS */}
//               <div className="grid gap-5 py-5 sm:grid-cols-[1.2fr_1fr]">
//                 <div>
//                   <h3 className="mb-4 flex items-center gap-2 font-bold">
//                     <Users size={21} className="text-blue-700" />
//                     Passengers ({passengers.length})
//                   </h3>

//                   <div className="flex flex-wrap gap-2">
//                     {passengers.map((passenger) => (
//                       <span
//                         key={passenger.id}
//                         className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium"
//                       >
//                         {passenger.name}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="border-l-0 border-slate-200 sm:border-l sm:pl-5">
//                   <h3 className="mb-4 flex items-center gap-2 font-bold">
//                     <Armchair size={21} className="text-blue-700" />
//                     Selected Seats
//                   </h3>

//                   <div className="flex flex-wrap gap-2">
//                     {passengers.map((passenger) => (
//                       <span
//                         key={passenger.id}
//                         className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-800"
//                       >
//                         {passenger.seat?.number || "Not selected"}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-200 pt-4 text-sm text-slate-500">
//                 <span>
//                   Distance:{" "}
//                   <b className="text-slate-800">
//                     {flight.distance?.toLocaleString("en-IN") || "—"} km
//                   </b>
//                 </span>

//                 <span>
//                   Configuration:{" "}
//                   <b className="text-slate-800">
//                     {booking.configuration || "Standard"}
//                   </b>
//                 </span>

//                 <span>
//                   Booking Date:{" "}
//                   <b className="text-slate-800">{formatDate(bookingDate)}</b>
//                 </span>
//               </div>
//             </div>

//             {/* ACTION BUTTONS */}
//             <div className="flex flex-col gap-2 border-t border-slate-200 pt-5 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
//               <button
//                 onClick={() => navigate("/booking", { state: { booking } })}
//                 disabled={statusIsCancelled}
//                 className="flex items-center justify-center gap-2 rounded-xl border border-blue-600 px-3 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 <Pencil size={17} />
//                 Modify Booking
//               </button>

//               <button
//                 onClick={() => navigate("/booking", { state: { booking } })}
//                 disabled={statusIsCancelled}
//                 className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-3 text-sm font-semibold transition hover:border-blue-500 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 <CalendarDays size={17} />
//                 Change Flight
//               </button>

//               <button
//                 onClick={() => setShowCancelModal(true)}
//                 disabled={statusIsCancelled}
//                 className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-3 text-sm font-semibold transition hover:border-red-400 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 <X size={18} />
//                 Cancel Booking
//               </button>

//               <button
//                 onClick={handlePrint}
//                 className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-3 text-sm font-semibold transition hover:bg-slate-50"
//               >
//                 <Download size={17} />
//                 Download Itinerary
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* PASSENGER DETAILS */}
//         <section className="mt-7 grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
//           <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
//             <div className="mb-5 flex items-center justify-between">
//               <div>
//                 <h2 className="text-xl font-extrabold">Passenger Details</h2>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Information for all travellers
//                 </p>
//               </div>

//               <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
//                 <Users size={23} />
//               </div>
//             </div>

//             <div className="space-y-4">
//               {passengers.map((passenger, index) => (
//                 <div
//                   key={passenger.id}
//                   className="rounded-2xl border border-slate-200 p-4 transition hover:border-blue-200"
//                 >
//                   <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
//                     <div className="flex items-center gap-3">
//                       <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-700">
//                         <User size={22} />
//                       </div>

//                       <div>
//                         <h3 className="font-bold">{passenger.name}</h3>
//                         <p className="text-xs text-slate-500">
//                           Passenger {index + 1} · {passenger.type}
//                         </p>
//                       </div>
//                     </div>

//                     <span className="rounded-lg bg-green-50 px-3 py-2 text-xs font-bold text-green-700">
//                       {passenger.seat?.number
//                         ? `Seat ${passenger.seat.number}`
//                         : "No Seat"}
//                     </span>
//                   </div>

//                   <div className="grid gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2">
//                     <div className="flex items-center gap-3">
//                       <Mail size={18} className="text-blue-700" />
//                       <div className="min-w-0">
//                         <p className="text-xs text-slate-500">Email</p>
//                         <p className="break-all text-sm font-semibold">
//                           {passenger.email || "Not provided"}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <Armchair size={18} className="text-blue-700" />
//                       <div>
//                         <p className="text-xs text-slate-500">Seat Category</p>
//                         <p className="text-sm font-semibold">
//                           {passenger.seat?.category || "Standard"}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <Utensils size={18} className="text-blue-700" />
//                       <div>
//                         <p className="text-xs text-slate-500">
//                           Meal Preference
//                         </p>
//                         <p className="text-sm font-semibold">
//                           {passenger.meal?.name || "No meal selected"}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <CreditCard size={18} className="text-blue-700" />
//                       <div>
//                         <p className="text-xs text-slate-500">Add-on Charges</p>
//                         <p className="text-sm font-semibold">
//                           ₹
//                           {(passenger.seat?.price || 0) +
//                             (passenger.meal?.price || 0)}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* PAYMENT SUMMARY */}
//           <aside className="h-fit rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
//             <div className="mb-5 flex items-center gap-3">
//               <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
//                 <CreditCard size={24} />
//               </div>

//               <div>
//                 <h2 className="text-xl font-extrabold">Price Summary</h2>
//                 <p className="text-xs text-slate-500">Booking charges</p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="flex justify-between text-sm">
//                 <span className="text-slate-600">Seat Charges</span>
//                 <span className="font-bold">₹{totalSeatPrice}</span>
//               </div>

//               <div className="flex justify-between text-sm">
//                 <span className="text-slate-600">Meal Charges</span>
//                 <span className="font-bold">₹{totalMealPrice}</span>
//               </div>

//               <div className="flex justify-between text-sm">
//                 <span className="text-slate-600">Passengers</span>
//                 <span className="font-bold">{passengers.length}</span>
//               </div>

//               <div className="border-t border-dashed border-slate-300 pt-5">
//                 <div className="flex items-center justify-between">
//                   <span className="font-bold">Total Amount</span>
//                   <span className="text-2xl font-extrabold text-blue-800">
//                     ₹{totalAmount}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* PROCEED TO PAYMENT */}
//             <button
//               onClick={() => setShowSuccessModal(true)}
//               disabled={statusIsCancelled}
//               className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 py-4 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <CreditCard size={20} />
//               Proceed to Payment
//             </button>

//             <p className="mt-3 text-center text-xs text-slate-500">
//               Total payable: ₹{totalAmount}
//             </p>
//           </aside>
//         </section>

//         {/* HELP SECTION */}
//         <section className="mt-7 flex flex-col items-start justify-between gap-4 rounded-3xl bg-gradient-to-r from-[#102d70] to-[#2166c5] p-6 text-white sm:flex-row sm:items-center sm:p-8">
//           <div>
//             <h2 className="text-xl font-extrabold">
//               Need help with your booking?
//             </h2>
//             <p className="mt-2 text-sm text-blue-100">
//               Our support team is here to help you with your journey.
//             </p>
//           </div>

//           <button
//             onClick={() => navigate("/")}
//             className="rounded-xl bg-white px-6 py-3 font-bold text-blue-800 transition hover:bg-blue-50"
//           >
//             Contact Support
//           </button>
//         </section>
//       </main>

//       {/* CANCEL CONFIRMATION MODAL */}
//       {showCancelModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 print:hidden">
//           <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
//             <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
//               <X size={29} />
//             </div>

//             <h2 className="text-2xl font-extrabold text-slate-900">
//               Cancel Booking?
//             </h2>

//             <p className="mt-3 text-sm leading-6 text-slate-600">
//               Are you sure you want to cancel this booking? This action will
//               change its status on this page.
//             </p>

//             <div className="mt-7 flex gap-3">
//               <button
//                 onClick={() => setShowCancelModal(false)}
//                 className="flex-1 rounded-xl border border-slate-300 py-3 font-semibold text-slate-700 hover:bg-slate-50"
//               >
//                 Keep Booking
//               </button>

//               <button
//                 onClick={handleCancel}
//                 className="flex-1 rounded-xl bg-red-600 py-3 font-bold text-white hover:bg-red-700"
//               >
//                 Yes, Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* BOOKING SUCCESS MODAL */}
//       {showSuccessModal && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm print:hidden">
//           <div className="relative w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl sm:p-8">
//             <button
//               onClick={() => setShowSuccessModal(false)}
//               aria-label="Close success message"
//               className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
//             >
//               <X size={21} />
//             </button>

//             <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
//               <CheckCircle2 size={58} className="text-green-600" />
//             </div>

//             <h2 className="text-3xl font-extrabold text-slate-900">
//               Booking Successful!
//             </h2>

//             <p className="mt-3 leading-6 text-slate-600">
//               Congratulations! Your booking has been successfully completed.
//               Thank you for choosing FlyHere.
//             </p>

//             <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5 text-left">
//               <p className="text-center text-sm font-medium text-slate-600">
//                 Your Booking Reference
//               </p>

//               <h3 className="mt-2 text-center text-2xl font-extrabold tracking-wider text-green-700">
//                 {pnr || bookingId}
//               </h3>

//               <div className="my-4 border-t border-dashed border-green-200" />

//               <div className="flex justify-between text-sm">
//                 <span className="text-slate-600">Passengers</span>
//                 <span className="font-bold text-slate-900">
//                   {passengers.length}
//                 </span>
//               </div>

//               <div className="mt-3 flex justify-between text-sm">
//                 <span className="text-slate-600">Total Amount</span>
//                 <span className="font-extrabold text-green-700">
//                   ₹{totalAmount}
//                 </span>
//               </div>
//             </div>

//             <button
//               onClick={() => setShowSuccessModal(false)}
//               className="mt-7 w-full rounded-xl bg-blue-700 py-4 font-bold text-white shadow-lg transition hover:bg-blue-800"
//             >
//               Continue
//             </button>

//             <p className="mt-4 text-xs text-slate-400">
//               Thank you for flying with FlyHere!
//             </p>
//           </div>
//         </div>
//       )}

//       {/* PRINT STYLES */}
//       <style>{`
//         @media print {
//           body {
//             background: white !important;
//           }

//           header,
//           footer,
//           button,
//           .print\\:hidden {
//             display: none !important;
//           }

//           main {
//             max-width: 100% !important;
//             padding: 0 !important;
//           }

//           section {
//             break-inside: avoid;
//             box-shadow: none !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ManageBooking;

import React, { useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import {
  Plane,
  CalendarDays,
  Clock,
  Users,
  Armchair,
  Ticket,
  Mail,
  User,
  MapPin,
  ArrowRight,
  Search,
  Pencil,
  X,
  Download,
  CreditCard,
  Utensils,
  CheckCircle2,
  Bell,
  ChevronDown,
  RotateCcw,
  Luggage,
  ShieldCheck,
} from "lucide-react";

const ManageBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  if (!booking) {
    return <Navigate to="/booking" replace />;
  }

  const {
    bookingId,
    pnr,
    status,
    flight,
    passengers = [],
    totalSeatPrice = 0,
    totalMealPrice = 0,
    totalAmount = 0,
    bookingDate,
  } = booking;

  const formatDate = (date) => {
    if (!date) return "Date not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCancel = () => {
    setCancelled(true);
    setShowCancelModal(false);
  };

  const bookingStatus = cancelled ? "Cancelled" : status || "Confirmed";

  const statusIsCancelled = bookingStatus.toLowerCase().includes("cancel");

  const statusIsPending = bookingStatus.toLowerCase().includes("pending");

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#edf5ff] text-[#101d48]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#e9f3ff] via-[#d6eaff] to-[#b8d9ff]">
        <div className="absolute -right-10 top-0 opacity-20">
          <Plane size={260} className="rotate-[-12deg] text-blue-600" />
        </div>

        <div className="relative mx-auto flex min-h-[165px] max-w-[1450px] items-center justify-between gap-4 px-3 py-7 sm:px-5 sm:py-8 lg:px-10">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm font-semibold text-blue-700">
              <span>FlyHere</span>
              <span>/</span>
              <span>My Trips</span>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-[#101d48] sm:text-3xl md:text-4xl">
              Manage Booking
            </h1>

            <p className="mt-2 text-sm text-slate-700 sm:text-base">
              View, modify or cancel your flight bookings.
            </p>
          </div>

          <div className="hidden shrink-0 items-center gap-3 rounded-2xl border border-white/70 bg-white/40 px-5 py-4 shadow-sm backdrop-blur sm:flex">
            <ShieldCheck size={32} className="text-blue-700" />
            <div>
              <p className="font-bold text-blue-950">Your trip, your way</p>
              <p className="text-xs text-slate-600">
                Manage your travel details
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1450px] px-3 pb-10 pt-5 sm:px-4 sm:pb-12 sm:pt-7 lg:px-8">
        {/* BOOKING SEARCH REFERENCE */}
        <section className="mb-6 rounded-2xl border border-blue-100 bg-white p-4 shadow-[0_5px_20px_rgba(30,64,175,0.08)] sm:mb-8 sm:p-6 md:p-7">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-lg font-bold sm:text-xl">
                Your Booking Reference
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your booking details are available below.
              </p>
            </div>

            <span className="shrink-0 rounded-lg bg-blue-50 px-3 py-2 text-[10px] font-bold text-blue-700 sm:px-4 sm:text-xs">
              BOOKING DETAILS
            </span>
          </div>

          <div className="grid min-w-0 gap-4 md:grid-cols-[1fr_1fr_auto]">
            <div className="min-w-0">
              <label className="mb-2 block text-sm font-semibold">
                Booking Reference (PNR)
              </label>
              <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 sm:px-4">
                <Ticket size={20} className="shrink-0 text-blue-700" />
                <span className="truncate font-bold tracking-wide">
                  {pnr || bookingId}
                </span>
              </div>
            </div>

            <div className="min-w-0">
              <label className="mb-2 block text-sm font-semibold">
                Booking ID
              </label>
              <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 sm:px-4">
                <User size={20} className="shrink-0 text-blue-700" />
                <span className="truncate font-semibold">{bookingId}</span>
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={handlePrint}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-700 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 sm:px-5 md:w-auto"
              >
                <Download size={18} className="shrink-0" />
                Download Itinerary
              </button>
            </div>
          </div>
        </section>

        {/* RESULT HEADING */}
        <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-extrabold sm:text-2xl">
              Booking Result (1)
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your flight and passenger information
            </p>
          </div>

          <button
            onClick={() => navigate("/booking")}
            className="flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            <RotateCcw size={18} />
            Book Another Flight
          </button>
        </div>

        {/* MAIN BOOKING CARD */}
        <section className="overflow-hidden rounded-2xl border border-blue-100 bg-white p-3 shadow-[0_8px_30px_rgba(30,64,175,0.09)] sm:rounded-3xl sm:p-5 md:p-6">
          <div className="grid min-w-0 gap-4 lg:grid-cols-[200px_minmax(0,1fr)_195px] lg:gap-5">
            {/* BOOKING REFERENCE */}
            <div className="flex min-w-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[#eef5ff] to-[#e3eeff] px-4 py-6 text-center sm:py-7">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Plane size={35} />
              </div>

              <p className="text-sm text-slate-600">Booking Reference</p>

              <h2 className="mt-1 max-w-full break-all text-xl font-extrabold tracking-wide sm:text-2xl">
                {pnr || bookingId}
              </h2>

              <span
                className={`mt-4 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
                  statusIsCancelled
                    ? "bg-red-100 text-red-700"
                    : statusIsPending
                      ? "bg-amber-100 text-amber-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {statusIsCancelled ? (
                  <X size={15} />
                ) : (
                  <CheckCircle2 size={15} />
                )}
                {bookingStatus}
              </span>
            </div>

            {/* FLIGHT INFORMATION */}
            <div className="min-w-0">
              <div className="flex min-w-0 flex-col gap-4 border-b border-slate-200 pb-5 xl:flex-row xl:flex-wrap xl:items-center xl:justify-between xl:gap-5">
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-base font-extrabold sm:text-lg">
                      {flight.from.city} ({flight.from.code})
                    </h3>
                    <p className="mt-1 break-words text-xs text-slate-500">
                      {flight.from.airport}
                    </p>
                  </div>

                  <ArrowRight className="shrink-0 text-slate-500" size={23} />

                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-base font-extrabold sm:text-lg">
                      {flight.to.city} ({flight.to.code})
                    </h3>
                    <p className="mt-1 break-words text-xs text-slate-500">
                      {flight.to.airport}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 text-sm min-[380px]:grid-cols-2 xl:flex xl:flex-wrap xl:items-center xl:gap-x-5">
                  <div className="flex min-w-0 items-center gap-2">
                    <CalendarDays
                      size={19}
                      className="shrink-0 text-blue-700"
                    />
                    <span className="break-words font-semibold">
                      {flight.formattedDate || formatDate(flight.date)}
                    </span>
                  </div>

                  <div className="flex min-w-0 items-center gap-2">
                    <Plane size={19} className="shrink-0 text-blue-700" />
                    <span className="break-words font-semibold">
                      {flight.flightNumber}
                    </span>
                  </div>

                  <div className="flex min-w-0 items-center gap-2">
                    <Clock size={19} className="shrink-0 text-blue-700" />
                    <span className="break-words font-semibold">
                      {flight.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* PASSENGERS */}
              <div className="grid min-w-0 gap-5 py-5 sm:grid-cols-[1.2fr_1fr]">
                <div className="min-w-0">
                  <h3 className="mb-4 flex items-center gap-2 font-bold">
                    <Users size={21} className="shrink-0 text-blue-700" />
                    Passengers ({passengers.length})
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {passengers.map((passenger) => (
                      <span
                        key={passenger.id}
                        className="max-w-full break-words rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-medium sm:px-4"
                      >
                        {passenger.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="min-w-0 border-t border-slate-200 pt-5 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                  <h3 className="mb-4 flex items-center gap-2 font-bold">
                    <Armchair size={21} className="shrink-0 text-blue-700" />
                    Selected Seats
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {passengers.map((passenger) => (
                      <span
                        key={passenger.id}
                        className="max-w-full break-words rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-bold text-blue-800 sm:px-4"
                      >
                        {passenger.seat?.number || "Not selected"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 pt-4 text-xs text-slate-500 sm:gap-x-6 sm:text-sm">
                <span>
                  Distance:{" "}
                  <b className="text-slate-800">
                    {flight.distance?.toLocaleString("en-IN") || "—"} km
                  </b>
                </span>

                <span>
                  Configuration:{" "}
                  <b className="text-slate-800">
                    {booking.configuration || "Standard"}
                  </b>
                </span>

                <span>
                  Booking Date:{" "}
                  <b className="text-slate-800">{formatDate(bookingDate)}</b>
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-1 gap-2 border-t border-slate-200 pt-4 sm:grid-cols-2 lg:flex lg:flex-col lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
              <button
                onClick={() => navigate("/booking", { state: { booking } })}
                disabled={statusIsCancelled}
                className="flex min-w-0 items-center justify-center gap-2 rounded-xl border border-blue-600 px-3 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Pencil size={17} className="shrink-0" />
                Modify Booking
              </button>

              <button
                onClick={() => navigate("/booking", { state: { booking } })}
                disabled={statusIsCancelled}
                className="flex min-w-0 items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-3 text-sm font-semibold transition hover:border-blue-500 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CalendarDays size={17} className="shrink-0" />
                Change Flight
              </button>

              <button
                onClick={() => setShowCancelModal(true)}
                disabled={statusIsCancelled}
                className="flex min-w-0 items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-3 text-sm font-semibold transition hover:border-red-400 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={18} className="shrink-0" />
                Cancel Booking
              </button>

              <button
                onClick={handlePrint}
                className="flex min-w-0 items-center justify-center gap-2 rounded-xl border border-slate-300 px-3 py-3 text-sm font-semibold transition hover:bg-slate-50"
              >
                <Download size={17} className="shrink-0" />
                Download Itinerary
              </button>
            </div>
          </div>
        </section>

        {/* PASSENGER DETAILS */}
        <section className="mt-6 grid min-w-0 gap-5 lg:mt-7 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)] lg:gap-6">
          <div className="min-w-0 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-7">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-lg font-extrabold sm:text-xl">
                  Passenger Details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Information for all travellers
                </p>
              </div>

              <div className="shrink-0 rounded-xl bg-blue-50 p-3 text-blue-700">
                <Users size={23} />
              </div>
            </div>

            <div className="space-y-4">
              {passengers.map((passenger, index) => (
                <div
                  key={passenger.id}
                  className="min-w-0 rounded-2xl border border-slate-200 p-3 transition hover:border-blue-200 sm:p-4"
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                        <User size={22} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="break-words font-bold">
                          {passenger.name}
                        </h3>
                        <p className="text-xs text-slate-500">
                          Passenger {index + 1} · {passenger.type}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-lg bg-green-50 px-3 py-2 text-xs font-bold text-green-700">
                      {passenger.seat?.number
                        ? `Seat ${passenger.seat.number}`
                        : "No Seat"}
                    </span>
                  </div>

                  <div className="grid min-w-0 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <Mail size={18} className="shrink-0 text-blue-700" />
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500">Email</p>
                        <p className="break-all text-sm font-semibold">
                          {passenger.email || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex min-w-0 items-center gap-3">
                      <Armchair size={18} className="shrink-0 text-blue-700" />
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500">Seat Category</p>
                        <p className="break-words text-sm font-semibold">
                          {passenger.seat?.category || "Standard"}
                        </p>
                      </div>
                    </div>

                    <div className="flex min-w-0 items-center gap-3">
                      <Utensils size={18} className="shrink-0 text-blue-700" />
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500">
                          Meal Preference
                        </p>
                        <p className="break-words text-sm font-semibold">
                          {passenger.meal?.name || "No meal selected"}
                        </p>
                      </div>
                    </div>

                    <div className="flex min-w-0 items-center gap-3">
                      <CreditCard
                        size={18}
                        className="shrink-0 text-blue-700"
                      />
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500">Add-on Charges</p>
                        <p className="text-sm font-semibold">
                          ₹
                          {(passenger.seat?.price || 0) +
                            (passenger.meal?.price || 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PAYMENT SUMMARY */}
          <aside className="h-fit min-w-0 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="shrink-0 rounded-xl bg-blue-50 p-3 text-blue-700">
                <CreditCard size={24} />
              </div>

              <div className="min-w-0">
                <h2 className="text-lg font-extrabold sm:text-xl">
                  Price Summary
                </h2>
                <p className="text-xs text-slate-500">Booking charges</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-600">Seat Charges</span>
                <span className="shrink-0 font-bold">₹{totalSeatPrice}</span>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-600">Meal Charges</span>
                <span className="shrink-0 font-bold">₹{totalMealPrice}</span>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-600">Passengers</span>
                <span className="shrink-0 font-bold">{passengers.length}</span>
              </div>

              <div className="border-t border-dashed border-slate-300 pt-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold">Total Amount</span>
                  <span className="text-xl font-extrabold text-blue-800 sm:text-2xl">
                    ₹{totalAmount}
                  </span>
                </div>
              </div>
            </div>

            {/* PROCEED TO PAYMENT */}
            <button
              onClick={() => setShowSuccessModal(true)}
              disabled={statusIsCancelled}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-3 py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
            >
              <CreditCard size={20} className="shrink-0" />
              Proceed to Payment
            </button>

            <p className="mt-3 text-center text-xs text-slate-500">
              Total payable: ₹{totalAmount}
            </p>
          </aside>
        </section>

        {/* HELP SECTION */}
        <section className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl bg-gradient-to-r from-[#102d70] to-[#2166c5] p-5 text-white sm:mt-7 sm:rounded-3xl sm:p-7 md:flex-row md:items-center md:p-8">
          <div className="min-w-0">
            <h2 className="text-lg font-extrabold sm:text-xl">
              Need help with your booking?
            </h2>
            <p className="mt-2 text-sm text-blue-100">
              Our support team is here to help you with your journey.
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-800 transition hover:bg-blue-50 sm:w-auto sm:text-base"
          >
            Contact Support
          </button>
        </section>
      </main>

      {/* CANCEL CONFIRMATION MODAL */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-3 print:hidden sm:p-4">
          <div className="my-auto w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <X size={29} />
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              Cancel Booking?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Are you sure you want to cancel this booking? This action will
              change its status on this page.
            </p>

            <div className="mt-7 flex flex-col gap-3 min-[380px]:flex-row">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 rounded-xl border border-slate-300 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Keep Booking
              </button>

              <button
                onClick={handleCancel}
                className="flex-1 rounded-xl bg-red-600 py-3 font-bold text-white hover:bg-red-700"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-sm print:hidden sm:p-4">
          <div className="relative my-auto w-full max-w-md rounded-2xl bg-white p-5 text-center shadow-2xl sm:rounded-3xl sm:p-8">
            <button
              onClick={() => setShowSuccessModal(false)}
              aria-label="Close success message"
              className="absolute right-3 top-3 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 sm:right-4 sm:top-4"
            >
              <X size={21} />
            </button>

            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 sm:h-24 sm:w-24">
              <CheckCircle2
                size={50}
                className="text-green-600 sm:h-[58px] sm:w-[58px]"
              />
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Booking Successful!
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Congratulations! Your booking has been successfully completed.
              Thank you for choosing FlyHere.
            </p>

            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-left sm:p-5">
              <p className="text-center text-sm font-medium text-slate-600">
                Your Booking Reference
              </p>

              <h3 className="mt-2 break-all text-center text-xl font-extrabold tracking-wider text-green-700 sm:text-2xl">
                {pnr || bookingId}
              </h3>

              <div className="my-4 border-t border-dashed border-green-200" />

              <div className="flex justify-between gap-3 text-sm">
                <span className="text-slate-600">Passengers</span>
                <span className="font-bold text-slate-900">
                  {passengers.length}
                </span>
              </div>

              <div className="mt-3 flex justify-between gap-3 text-sm">
                <span className="text-slate-600">Total Amount</span>
                <span className="font-extrabold text-green-700">
                  ₹{totalAmount}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-7 w-full rounded-xl bg-blue-700 py-4 font-bold text-white shadow-lg transition hover:bg-blue-800"
            >
              Continue
            </button>

            <p className="mt-4 text-xs text-slate-400">
              Thank you for flying with FlyHere!
            </p>
          </div>
        </div>
      )}

      {/* PRINT STYLES */}
      <style>{`
        @media print {
          body {
            background: white !important;
          }

          header,
          footer,
          button,
          .print\\:hidden {
            display: none !important;
          }

          main {
            max-width: 100% !important;
            padding: 0 !important;
          }

          section {
            break-inside: avoid;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ManageBooking;
