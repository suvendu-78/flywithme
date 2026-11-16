import React, { useState } from "react";
import {
  Plane,
  Search,
  CircleHelp,
  Bell,
  UserCircle,
  ChevronDown,
  ChevronRight,
  Ticket,
  CreditCard,
  CalendarDays,
  Luggage,
  Headphones,
  Mail,
  Phone,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  Clock,
  MapPin,
} from "lucide-react";

const helpTopics = [
  {
    title: "Booking & Reservations",
    description: "Book flights and manage your reservations.",
    icon: Ticket,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Payments & Refunds",
    description: "Payment methods, refunds and transactions.",
    icon: CreditCard,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Flight Changes",
    description: "Modify your flight or cancel a booking.",
    icon: CalendarDays,
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Baggage Information",
    description: "Learn about baggage allowance and rules.",
    icon: Luggage,
    color: "bg-orange-100 text-orange-700",
  },
];

const faqs = [
  {
    category: "Booking",
    question: "How can I book a flight on FlyHere?",
    answer:
      "Select your departure city, destination, travel date and number of passengers. Choose your preferred flight, enter passenger details, select seats and continue to payment.",
  },
  {
    category: "Booking",
    question: "Where can I find my booking reference (PNR)?",
    answer:
      "Your booking reference is displayed on the booking confirmation page. You can use it to identify your booking when contacting customer support.",
  },
  {
    category: "Booking",
    question: "How can I manage my existing booking?",
    answer:
      "Open the Manage Booking section and enter your booking reference and the required passenger details to retrieve your reservation.",
  },
  {
    category: "Changes",
    question: "Can I change my flight date?",
    answer:
      "Flight changes depend on the airline's fare rules and availability. Open Manage Booking and check the available change options.",
  },
  {
    category: "Changes",
    question: "How can I cancel my flight?",
    answer:
      "Visit Manage Booking, find your reservation and check the cancellation options. Applicable cancellation charges depend on the fare conditions.",
  },
  {
    category: "Payments",
    question: "What payment methods are supported?",
    answer:
      "Available payment methods are shown during checkout. Choose one of the payment options displayed on the payment page.",
  },
  {
    category: "Payments",
    question: "How long does a refund take?",
    answer:
      "Refund processing time depends on the airline, payment provider and applicable cancellation policy. Contact support with your booking reference for assistance.",
  },
  {
    category: "Baggage",
    question: "How much baggage can I carry?",
    answer:
      "Baggage allowance varies by airline, route and ticket type. Check the baggage information on your booking or airline confirmation.",
  },
];

const Help = () => {
  const [search, setSearch] = useState("");
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Booking", "Changes", "Payments", "Baggage"];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#edf5ff] text-[#101d48]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#d8eaff] via-[#c5e1ff] to-[#8ed8f5]">
        <div className="absolute -right-10 top-[-50px] opacity-10">
          <Plane size={330} className="-rotate-12 text-blue-800" />
        </div>

        <div className="relative mx-auto flex min-h-[280px] max-w-[1450px] flex-col justify-center px-5 py-12 lg:px-10">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-blue-700">
            <span>FlyHere</span>
            <ChevronRight size={15} />
            <span>Help & Support</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-[#101d48] sm:text-5xl">
            How can we help you?
          </h1>

          <p className="mt-3 max-w-xl text-base text-slate-700 sm:text-lg">
            Find answers, manage your trips and get the support you need for a
            smooth journey.
          </p>

          <div className="mt-7 flex max-w-2xl items-center rounded-2xl border border-white bg-white p-2 shadow-xl">
            <Search className="ml-3 shrink-0 text-blue-700" size={23} />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveCategory("All");
                setActiveFaq(-1);
              }}
              placeholder="Search for booking, cancellation, refund..."
              className="w-full bg-transparent px-4 py-3 text-sm outline-none sm:text-base"
            />

            <button
              onClick={() => setActiveFaq(0)}
              className="rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1250px] px-5 py-12">
        {/* TOPICS */}
        <section>
          <div className="mb-7">
            <h2 className="text-2xl font-extrabold">Explore Help Topics</h2>
            <p className="mt-2 text-sm text-slate-500">
              Select a category to find the information you need.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {helpTopics.map((topic) => {
              const Icon = topic.icon;

              return (
                <button
                  key={topic.title}
                  onClick={() => {
                    const categoryMap = {
                      "Booking & Reservations": "Booking",
                      "Payments & Refunds": "Payments",
                      "Flight Changes": "Changes",
                      "Baggage Information": "Baggage",
                    };

                    setActiveCategory(categoryMap[topic.title]);
                    setSearch("");
                    setActiveFaq(-1);
                  }}
                  className="rounded-2xl border border-blue-100 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                >
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${topic.color}`}
                  >
                    <Icon size={27} />
                  </div>

                  <h3 className="font-bold">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {topic.description}
                  </p>

                  <span className="mt-5 flex items-center gap-2 text-sm font-bold text-blue-700">
                    Explore topic <ArrowRight size={16} />
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="mt-14 grid items-start gap-8 lg:grid-cols-[1fr_320px]">
          <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-7">
              <h2 className="text-2xl font-extrabold">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Quick answers to the questions travellers ask most.
              </p>
            </div>

            {/* CATEGORY FILTER */}
            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveFaq(-1);
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeCategory === category
                      ? "bg-blue-700 text-white"
                      : "bg-blue-50 text-slate-700 hover:bg-blue-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-xl border border-slate-200"
                  >
                    <button
                      onClick={() =>
                        setActiveFaq(activeFaq === index ? -1 : index)
                      }
                      className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-blue-50"
                    >
                      <span className="font-bold text-slate-800">
                        {faq.question}
                      </span>

                      <ChevronDown
                        size={20}
                        className={`shrink-0 text-blue-700 transition-transform ${
                          activeFaq === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {activeFaq === index && (
                      <div className="border-t border-slate-100 bg-blue-50/50 px-5 py-4 text-sm leading-7 text-slate-600">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="rounded-xl bg-slate-50 p-8 text-center">
                  <CircleHelp size={35} className="mx-auto text-slate-400" />
                  <p className="mt-3 font-bold">No results found</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Try another search or choose a different category.
                  </p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setActiveCategory("All");
                    }}
                    className="mt-4 font-bold text-blue-700"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* QUICK SUPPORT */}
          <aside className="space-y-5">
            <div className="rounded-3xl bg-gradient-to-br from-[#102d70] to-[#2166c5] p-7 text-white shadow-lg">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <Headphones size={30} />
              </div>

              <h3 className="text-2xl font-extrabold">Still need help?</h3>

              <p className="mt-3 text-sm leading-6 text-blue-100">
                Can't find the answer? Our support team can help you with your
                travel questions.
              </p>

              <a
                href="mailto:support@flyhere.com"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white py-3 font-bold text-blue-800 transition hover:bg-blue-50"
              >
                Contact Support <ArrowRight size={17} />
              </a>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
              <h3 className="mb-5 text-lg font-extrabold">
                Other ways to reach us
              </h3>

              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                    <Mail size={21} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">Email Support</p>
                    <a
                      href="mailto:support@flyhere.com"
                      className="break-all text-sm font-bold hover:text-blue-700"
                    >
                      support@flyhere.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                    <Phone size={21} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Phone Support</p>
                    <p className="text-sm font-bold">Add your support number</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                    <Clock size={21} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Support Hours</p>
                    <p className="text-sm font-bold">Add your working hours</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* BOTTOM BANNER */}
        <section className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-[#d8eaff] to-[#a9d5ff] p-7 sm:p-10">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <h2 className="text-2xl font-extrabold">
                Ready for your next journey?
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Discover destinations and book your next flight with FlyHere.
              </p>
            </div>

            <a
              href="/booking"
              className="flex items-center gap-3 rounded-xl bg-blue-700 px-7 py-4 font-bold text-white shadow-lg transition hover:bg-blue-800"
            >
              Book a Flight <Plane size={19} />
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-blue-100 bg-white px-5 py-7">
        <div className="mx-auto flex max-w-[1250px] flex-col items-center justify-between gap-3 text-center text-sm text-slate-500 sm:flex-row">
          <span className="font-extrabold text-blue-700">
            <Plane size={18} className="mr-1 inline" />
            FlyHere
          </span>
          <p>© 2026 FlyHere. All rights reserved.</p>
          <p>Your journey starts here.</p>
        </div>
      </footer>
    </div>
  );
};

export default Help;
