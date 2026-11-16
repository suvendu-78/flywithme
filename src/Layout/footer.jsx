import React from "react";
import {
  Plane,
  Globe,
  Camera,
  MessageCircle,
  PlayCircle,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

const Foot = () => {
  return (
    <footer className="bg-[#0b1d49] text-white">
      {/* NEWSLETTER */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1350px] flex-col items-center justify-between gap-6 px-5 py-12 md:flex-row lg:px-10">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Get travel updates from FlyHere
            </h2>
            <p className="mt-2 text-sm text-blue-100">
              Subscribe for travel inspiration, special offers and updates.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing!");
            }}
            className="flex w-full max-w-md rounded-xl bg-white p-1.5"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="min-w-0 flex-1 px-4 py-3 text-sm text-slate-900 outline-none"
            />

            <button
              type="submit"
              className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
            >
              Subscribe <ArrowRight size={17} />
            </button>
          </form>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="mx-auto grid max-w-[1350px] gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:px-10">
        {/* BRAND */}
        <div className="lg:col-span-2">
          <a
            href="/"
            className="flex items-center gap-2 text-3xl font-extrabold"
          >
            <Plane size={34} className="text-sky-400" fill="currentColor" />
            <span>
              Fly<span className="text-sky-400">Here</span>
            </span>
          </a>

          <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100">
            Your journey starts here. Discover destinations, compare flights and
            enjoy a smoother travel experience with FlyHere.
          </p>

          {/* SOCIAL ICONS */}
          <div className="mt-6 flex items-center gap-3">
            {[
              { Icon: Globe, href: "#", label: "Facebook" },
              { Icon: Camera, href: "#", label: "Instagram" },
              { Icon: MessageCircle, href: "#", label: "Twitter" },
              { Icon: PlayCircle, href: "#", label: "YouTube" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-sky-400 hover:bg-sky-400 hover:text-[#0b1d49]"
              >
                <Icon size={19} />
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="mb-6 text-lg font-bold">Quick Links</h3>

          <ul className="space-y-4 text-sm text-blue-100">
            <li>
              <a href="/" className="transition hover:text-sky-400">
                Home
              </a>
            </li>
            <li>
              <a href="/booking" className="transition hover:text-sky-400">
                Book Flights
              </a>
            </li>
            <li>
              <a
                href="/manage-booking"
                className="transition hover:text-sky-400"
              >
                Manage Booking
              </a>
            </li>
            <li>
              <a href="/check-in" className="transition hover:text-sky-400">
                Online Check-in
              </a>
            </li>
            <li>
              <a
                href="/flight-status"
                className="transition hover:text-sky-400"
              >
                Flight Status
              </a>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="mb-6 text-lg font-bold">Support</h3>

          <ul className="space-y-4 text-sm text-blue-100">
            <li>
              <a href="/help" className="transition hover:text-sky-400">
                Help Centre
              </a>
            </li>
            <li>
              <a href="/faq" className="transition hover:text-sky-400">
                FAQs
              </a>
            </li>
            <li>
              <a href="/contact" className="transition hover:text-sky-400">
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/cancellation-policy"
                className="transition hover:text-sky-400"
              >
                Cancellation Policy
              </a>
            </li>
            <li>
              <a
                href="/refund-policy"
                className="transition hover:text-sky-400"
              >
                Refund Policy
              </a>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="mb-6 text-lg font-bold">Get in Touch</h3>

          <div className="space-y-5 text-sm text-blue-100">
            <div className="flex items-start gap-3">
              <Mail size={19} className="mt-0.5 shrink-0 text-sky-400" />
              <a
                href="mailto:support@flyhere.com"
                className="break-all hover:text-sky-400"
              >
                support@flyhere.com
              </a>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={19} className="mt-0.5 shrink-0 text-sky-400" />
              <span>Add your support number</span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={19} className="mt-0.5 shrink-0 text-sky-400" />
              <span>India</span>
            </div>
          </div>
        </div>
      </div>

      {/* TRUST SECTION */}
      <div className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-[1350px] gap-6 px-5 py-7 sm:grid-cols-3 lg:px-10">
          <div className="flex items-center gap-3">
            <ShieldCheck size={28} className="shrink-0 text-sky-400" />
            <div>
              <p className="font-bold">Secure Booking</p>
              <p className="mt-1 text-xs text-blue-200">
                Your information matters to us.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard size={28} className="shrink-0 text-sky-400" />
            <div>
              <p className="font-bold">Safe Payments</p>
              <p className="mt-1 text-xs text-blue-200">
                Secure payment experience.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={28} className="shrink-0 text-sky-400" />
            <div>
              <p className="font-bold">Travel Assistance</p>
              <p className="mt-1 text-xs text-blue-200">We're here to help.</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="mx-auto flex max-w-[1350px] flex-col items-center justify-between gap-4 px-5 py-6 text-center sm:flex-row sm:text-left lg:px-10">
        <p className="text-sm text-blue-200">
          © 2026 FlyHere. All rights reserved.
        </p>

        <div className="flex flex-wrap justify-center gap-5 text-xs text-blue-200">
          <a href="/privacy-policy" className="hover:text-sky-400">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-sky-400">
            Terms & Conditions
          </a>
          <a href="/cookie-policy" className="hover:text-sky-400">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Foot;
