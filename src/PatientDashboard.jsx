import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, User, Calendar, FileText, FileSearch, 
  MessageSquare, Settings, LogOut, Clock, Download, UploadCloud, 
  HeartPulse, CheckCircle, Menu, X
} from 'lucide-react';

const navItems = [
  { id: 'overview',       icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  { id: 'profile',        icon: <User size={20} />,            label: 'My Profile' },
  { id: 'book',           icon: <Calendar size={20} />,        label: 'Book Appointment' },
  { id: 'appointments',   icon: <Clock size={20} />,           label: 'My Appointments' },
  { id: 'prescriptions',  icon: <FileText size={20} />,        label: 'Prescriptions' },
  { id: 'reports',        icon: <FileSearch size={20} />,      label: 'Medical Reports' },
  { id: 'messages',       icon: <MessageSquare size={20} />,   label: 'Messages' },
  { id: 'settings',       icon: <Settings size={20} />,        label: 'Settings' },
];

export default function PatientDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNav = (id) => {
    setActiveTab(id);
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':      return <OverviewTab setActiveTab={handleNav} />;
      case 'profile':       return <ProfileTab />;
      case 'book':          return <BookAppointmentTab setActiveTab={handleNav} />;
      case 'appointments':  return <AppointmentsTab />;
      case 'prescriptions': return <PrescriptionsTab />;
      case 'reports':       return <ReportsTab />;
      case 'messages':      return <MessagesTab />;
      case 'settings':      return <SettingsTab />;
      default:              return <OverviewTab />;
    }
  };

  const SidebarContent = () => (
    <>
      <div className="sidebar-header">
        <HeartPulse color="#2563EB" size={26} />
        <span>Patient Portal</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`sidebar-link ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => handleNav(item.id)}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="sidebar-link text-danger" onClick={onLogout}>
          <LogOut size={20} /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="dashboard-layout">

      {/* ── Mobile overlay sidebar ── */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              className="sidebar-backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside
              className="dashboard-sidebar sidebar-mobile"
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <button className="sidebar-close-btn" onClick={() => setIsSidebarOpen(false)}>
                <X size={22} />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Desktop sidebar (always visible ≥1024px) ── */}
      <aside className="dashboard-sidebar sidebar-desktop">
        <SidebarContent />
      </aside>

      {/* ── Main ── */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          {/* Hamburger – only visible on mobile/tablet */}
          <button className="sidebar-hamburger" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>

          <h2 className="dashboard-title">
            {navItems.find(i => i.id === activeTab)?.label}
          </h2>

          <div className="user-profile-badge">
            <div className="avatar">JD</div>
            <span className="avatar-name">John Doe</span>
          </div>
        </header>

        <div className="dashboard-content-area">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

/* ─────────────────── TAB COMPONENTS ─────────────────── */

function OverviewTab({ setActiveTab }) {
  return (
    <div className="dashboard-overview">
      <div className="welcome-banner">
        <div>
          <h3>Welcome back, John!</h3>
          <p>Your heart health is our priority. Have a great day.</p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=200"
          alt="Health Concept"
          className="welcome-img"
        />
      </div>

      <div className="dashboard-widgets">
        <div className="widget-card highlight">
          <div className="widget-header">
            <h4>Next Appointment</h4>
            <Calendar size={20} />
          </div>
          <div className="widget-body">
            <p className="large-text">July 15, 2026</p>
            <p><strong>10:00 AM</strong> – Dr. Smith</p>
            <p className="text-muted">Follow-up checkup</p>
            <button className="btn-secondary mt-3" onClick={() => setActiveTab('appointments')}>
              View Details
            </button>
          </div>
        </div>

        <div className="widget-card">
          <div className="widget-header"><h4>Quick Actions</h4></div>
          <div className="widget-body flex-col">
            <button className="btn-primary w-100 mb-2" onClick={() => setActiveTab('book')}>
              Book Appointment
            </button>
            <button className="btn-secondary w-100 mb-2" onClick={() => setActiveTab('reports')}>
              Upload Report
            </button>
            <button className="btn-secondary w-100" onClick={() => setActiveTab('messages')}>
              Message Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="dashboard-form-container">
      <form onSubmit={e => { e.preventDefault(); alert('Profile updated!'); }}>
        <div className="form-row">
          <div className="form-group half">
            <label>First Name</label>
            <input type="text" defaultValue="John" className="form-control" />
          </div>
          <div className="form-group half">
            <label>Last Name</label>
            <input type="text" defaultValue="Doe" className="form-control" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group half">
            <label>Age</label>
            <input type="number" defaultValue="45" className="form-control" />
          </div>
          <div className="form-group half">
            <label>Phone Number</label>
            <input type="tel" defaultValue="+1 (555) 000-1234" className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" defaultValue="patient@example.com" className="form-control" />
        </div>
        <div className="form-group">
          <label>Home Address</label>
          <input type="text" defaultValue="123 Heart Lane, Wellness City, NY" className="form-control" />
        </div>
        <button type="submit" className="btn-primary mt-3">Save Changes</button>
      </form>
    </div>
  );
}

function BookAppointmentTab({ setActiveTab }) {
  return (
    <div className="dashboard-form-container">
      <form onSubmit={e => {
        e.preventDefault();
        alert('Appointment requested! We will notify you once confirmed.');
        setActiveTab('appointments');
      }}>
        <div className="form-group">
          <label>Reason for Visit</label>
          <select className="form-control" required>
            <option value="">Select a reason</option>
            <option>General Consultation</option>
            <option>Follow-up</option>
            <option>ECG / Test</option>
          </select>
        </div>
        <div className="form-row">
          <div className="form-group half">
            <label>Preferred Date</label>
            <input type="date" required className="form-control" />
          </div>
          <div className="form-group half">
            <label>Preferred Time</label>
            <input type="time" required className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <label>Additional Notes</label>
          <textarea className="form-control" rows="4" placeholder="Any specific symptoms?"></textarea>
        </div>
        <button type="submit" className="btn-primary mt-3">Confirm Appointment</button>
      </form>
    </div>
  );
}

function AppointmentsTab() {
  return (
    <div className="appointments-list">
      <h3 className="section-label">Upcoming Appointments</h3>
      <div className="list-card active-appointment">
        <div className="list-card-info">
          <h4>July 15, 2026 at 10:00 AM</h4>
          <p>Dr. Smith – Follow-up Checkup</p>
        </div>
        <button className="btn-danger-outline" onClick={() => alert('Appointment cancelled.')}>Cancel</button>
      </div>

      <h3 className="section-label mt-5">Previous Appointments</h3>
      {[
        { date: 'May 10, 2026 at 2:30 PM', type: 'General Consultation' },
        { date: 'Jan 05, 2026 at 11:00 AM', type: 'ECG Test' },
      ].map((a, i) => (
        <div className="list-card" key={i}>
          <div className="list-card-info text-muted">
            <h4>{a.date}</h4>
            <p>Dr. Smith – {a.type}</p>
          </div>
          <span className="badge badge-success"><CheckCircle size={14} /> Completed</span>
        </div>
      ))}
    </div>
  );
}

function PrescriptionsTab() {
  return (
    <div className="prescriptions-list">
      {[
        { name: 'Atorvastatin (10mg)', note: 'Take 1 tablet daily after dinner. Prescribed: May 10, 2026' },
        { name: 'Metoprolol (50mg)',   note: 'Take 1 tablet every morning. Prescribed: Jan 05, 2026' },
      ].map((p, i) => (
        <div className="list-card" key={i}>
          <div className="list-card-info">
            <h4>{p.name}</h4>
            <p>{p.note}</p>
          </div>
          <button className="btn-secondary-small flex-center" onClick={() => alert('Downloading PDF…')}>
            <Download size={15} /> Download PDF
          </button>
        </div>
      ))}
    </div>
  );
}

function ReportsTab() {
  return (
    <div className="reports-section">
      <div className="upload-box" onClick={() => alert('File picker opened!')}>
        <UploadCloud size={40} color="#2563EB" />
        <p>Click to upload Medical Reports (PDF, JPG)</p>
      </div>

      <h3 className="section-label mt-5">Uploaded Reports</h3>
      {[
        { name: 'Blood_Test_Results_May2026.pdf', date: 'May 12, 2026' },
        { name: 'ECG_Scan_Jan2026.pdf',           date: 'Jan 06, 2026' },
      ].map((r, i) => (
        <div className="list-card" key={i}>
          <div className="list-card-info">
            <h4>{r.name}</h4>
            <p>Uploaded on {r.date}</p>
          </div>
          <button className="btn-secondary-small" onClick={() => alert('Opening report…')}>View</button>
        </div>
      ))}
    </div>
  );
}

function MessagesTab() {
  return (
    <div className="dashboard-form-container full-height">
      <div className="messages-history">
        {[
          { from: 'received', sender: "Dr. Smith's Office", text: "Your latest test results look great! Keep up the good work.", date: 'May 15, 2026' },
          { from: 'sent',     sender: 'You',                text: 'Thank you, doctor! Should I continue the same dosage?', date: 'May 15, 2026' },
          { from: 'received', sender: "Dr. Smith's Office", text: 'Yes, continue as prescribed. See you in July.',         date: 'May 16, 2026' },
        ].map((m, i) => (
          <div key={i} className={`message ${m.from}`}>
            <p><strong>{m.sender}:</strong> {m.text}</p>
            <span className="timestamp">{m.date}</span>
          </div>
        ))}
      </div>
      <form onSubmit={e => { e.preventDefault(); alert('Message sent!'); e.target.reset(); }} className="message-form mt-4">
        <div className="form-group mb-0">
          <textarea className="form-control" rows="3" required placeholder="Type your message here…" />
        </div>
        <button type="submit" className="btn-primary mt-2">Send Message</button>
      </form>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="dashboard-form-container">
      <h3 className="section-label">Change Password</h3>
      <form onSubmit={e => { e.preventDefault(); alert('Password updated!'); e.target.reset(); }}>
        <div className="form-group">
          <label>Current Password</label>
          <input type="password" required className="form-control" />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input type="password" required className="form-control" />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input type="password" required className="form-control" />
        </div>
        <button type="submit" className="btn-primary mt-3">Update Password</button>
      </form>
    </div>
  );
}
