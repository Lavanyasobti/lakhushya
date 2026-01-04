import { useState } from "react";

export default function VolunteerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#FBF7F2]">

      {/* ===== NAVBAR ===== */}
      <div className="bg-white px-10 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-sm font-semibold">💚 Lakhushiya</h1>

        <div className="flex items-center gap-6 text-sm">
          <span className="cursor-pointer">Home</span>
          <span className="cursor-pointer">Dashboard</span>
          <span className="text-gray-500 hidden sm:inline">
            Welcome, Volunteer
          </span>
          <button className="border px-4 py-1 rounded-lg hover:bg-gray-100">
            Logout
          </button>
        </div>
      </div>

      {/* ===== HEADER ===== */}
      <div className="px-10 py-8">
        <h2 className="text-2xl font-bold text-green-900">
          Volunteer Dashboard
        </h2>
        <p className="text-gray-600">
          Manage your volunteer activities and see your impact
        </p>
      </div>

      {/* ===== TABS ===== */}
      <div className="px-10">
        <div className="
  bg-[#F2EEE6] rounded-xl p-1 text-sm w-full
  flex md:grid
  md:grid-cols-6
  overflow-x-auto md:overflow-visible
  no-scrollbar
">

          {[
            "overview",
            "manage pickups",
            "events",
            "analytics",
            "certificates",
            "feedback",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg capitalize transition text-center whitespace-nowrap w-full $
{
                activeTab === tab
                  ? "bg-white text-green-700 font-semibold shadow"
                  : "text-gray-600 hover:bg-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ================= OVERVIEW ================= */}
      {activeTab === "overview" && (
        <div className="px-10 py-8">

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Stat title="Total Pickups" value="68" icon="🚚" />
            <Stat title="Events Joined" value="15" icon="🎉" />
            <Stat title="Volunteer Points" value="1450" icon="⭐" />
            <Stat title="Active Tasks" value="2" icon="📋" />
          </div>

          {/* PICKUPS & EVENTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

            {/* Upcoming Pickups */}
            <Box title="Upcoming Pickups">
              <Pickup
                name="Priya Sharma"
                date="2024-01-21 · 2:00 PM"
                location="Sector 22, Noida"
                status="Confirmed"
                color="green"
              />
              <Pickup
                name="Rajesh Kumar"
                date="2024-01-22 · 4:30 PM"
                location="Connaught Place, Delhi"
                status="Pending"
                color="yellow"
              />
            </Box>

            {/* Available Events */}
            <Box title="Available Events">
              <Event
                title="Community Food Drive"
                date="2024-02-15 · 10:00 AM"
                location="Central Park, Delhi"
                action="Register"
              />
              <Event
                title="Winter Clothing Distribution"
                date="2024-02-20 · 2:00 PM"
                location="City Center, Gurgaon"
                action="Registered"
                disabled
              />
            </Box>

          </div>
        </div>
      )}

      {/* ================= MANAGE PICKUPS ================= */}
      {activeTab === "manage pickups" && (
        <div className="px-10 py-8">
          <Box title="Assigned Pickups">
            <PickupManage
              donor="Priya Sharma"
              category="Food"
              date="2024-01-21 · 2:00 PM"
              location="Sector 22, Noida"
              status="Confirmed"
            />
            <PickupManage
              donor="Rajesh Kumar"
              category="Clothes"
              date="2024-01-22 · 4:30 PM"
              location="Connaught Place, Delhi"
              status="Pending"
              actions
            />
          </Box>
        </div>
      )}

      {/* ================= EVENTS ================= */}
      {activeTab === "events" && (
        <div className="px-10 py-8">
          <Box title="Community Events">
            <EventDetails
              title="Community Food Drive"
              date="2024-02-15"
              location="Central Park, Delhi"
              volunteers="25/50"
            />
            <EventDetails
              title="Winter Clothing Distribution"
              date="2024-02-20"
              location="City Center, Gurgaon"
              volunteers="18/30"
              registered
            />
          </Box>
        </div>
      )}

      {/* ================= ANALYTICS ================= */}
      {activeTab === "analytics" && (
        <div className="px-10 py-8 space-y-6">
          <Box title="Monthly Activity">
            <p className="text-sm text-gray-600">
              You completed <b>18 pickups</b> and earned <b>450 points</b> this month.
            </p>
          </Box>

          <Box title="Recent Activities">
            <ListItem text="Food donation pickup" points="+25 points" />
            <ListItem text="Community Clean Drive" points="+40 points" />
            <ListItem text="Books collection" points="+20 points" />
          </Box>
        </div>
      )}

      {/* ================= CERTIFICATES ================= */}
      {activeTab === "certificates" && (
        <div className="px-10 py-8">
          <Box title="Download Certificates">
            <Certificate title="Food donation pickup" />
            <Certificate title="Community Clean Drive" />
            <Certificate title="Books collection" />
          </Box>
        </div>
      )}

      {/* ================= FEEDBACK ================= */}
      {activeTab === "feedback" && (
        <div className="px-10 py-8">
          <Box title="Provide Feedback">
            <FeedbackItem title="Food donation pickup" />
            <FeedbackItem title="Community Clean Drive" />
            <FeedbackItem title="Books collection" />
          </Box>
        </div>
      )}
    </div>
  );
}

/* ========= REUSABLE COMPONENTS ========= */

const Stat = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-xl flex justify-between items-center">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold text-green-600">{value}</h3>
    </div>
    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
      {icon}
    </div>
  </div>
);

const Box = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-4">
    <h3 className="font-semibold text-gray-800">{title}</h3>
    {children}
  </div>
);

const Pickup = ({ name, date, location, status, color }) => (
  <div className="bg-[#F9F7F3] p-4 rounded-lg flex justify-between items-center">
    <div>
      <p className="font-medium text-sm">{name}</p>
      <p className="text-xs text-gray-500">{date}</p>
      <p className="text-xs text-gray-500">{location}</p>
    </div>
    <span className={`text-xs bg-${color}-100 text-${color}-700 px-3 py-1 rounded-full`}>
      {status}
    </span>
  </div>
);

const Event = ({ title, date, location, action, disabled }) => (
  <div className="bg-[#F9F7F3] p-4 rounded-lg flex justify-between items-center">
    <div>
      <p className="font-medium text-sm">{title}</p>
      <p className="text-xs text-gray-500">{date}</p>
      <p className="text-xs text-gray-500">{location}</p>
    </div>
    <button
      disabled={disabled}
      className={`text-xs px-4 py-1.5 rounded-lg ${
        disabled
          ? "bg-gray-300 text-gray-500"
          : "bg-green-500 text-white hover:bg-green-600"
      }`}
    >
      {action}
    </button>
  </div>
);

const PickupManage = ({ donor, category, date, location, status, actions }) => (
  <div className="bg-[#F9F7F3] p-5 rounded-lg flex justify-between items-center">
    <div>
      <p className="font-medium text-sm">Pickup from {donor}</p>
      <p className="text-xs text-gray-500">Category: {category}</p>
      <p className="text-xs text-gray-500">{date}</p>
      <p className="text-xs text-gray-500">{location}</p>
    </div>
    {actions ? (
      <div className="flex gap-2">
        <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs">Accept</button>
        <button className="border px-3 py-1 rounded-lg text-xs">Decline</button>
      </div>
    ) : (
      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
        {status}
      </span>
    )}
  </div>
);

const EventDetails = ({ title, date, location, volunteers, registered }) => (
  <div className="bg-[#F9F7F3] p-5 rounded-lg flex justify-between items-center">
    <div>
      <p className="font-medium text-sm">{title}</p>
      <p className="text-xs text-gray-500">📅 {date}</p>
      <p className="text-xs text-gray-500">📍 {location}</p>
      <p className="text-xs text-gray-500">Volunteers: {volunteers}</p>
    </div>
    <div className="flex gap-2">
      <button className="border px-3 py-1 rounded-lg text-xs">Details</button>
      <button className={`px-3 py-1 rounded-lg text-xs ${
        registered ? "bg-gray-300 text-gray-500" : "bg-green-500 text-white"
      }`}>
        {registered ? "Registered" : "Register"}
      </button>
    </div>
  </div>
);

const Certificate = ({ title }) => (
  <div className="flex justify-between items-center bg-[#F9F7F3] p-4 rounded-lg">
    <p className="text-sm">{title}</p>
    <button className="text-xs bg-green-500 text-white px-4 py-1.5 rounded-lg">
      Download PDF
    </button>
  </div>
);

const FeedbackItem = ({ title }) => (
  <div className="flex justify-between items-center bg-[#F9F7F3] p-4 rounded-lg">
    <p className="text-sm">{title}</p>
    <button className="text-xs border px-4 py-1.5 rounded-lg">
      Rate Experience
    </button>
  </div>
);

const ListItem = ({ text, points }) => (
  <div className="flex justify-between items-center bg-[#F9F7F3] p-4 rounded-lg">
    <p className="text-sm">{text}</p>
    <span className="text-xs text-green-600">{points}</span>
  </div>
);
