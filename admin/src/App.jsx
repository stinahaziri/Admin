export default function App() {
  return (
    <BrowserRouter basename="/Admin">
      <Routes>
        {/* Main Page */}
        <Route path="/" element={<Index />} />

        {/* Doctors */}
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/add-doctor" element={<AddDoctors />} />
        <Route path="/edit-doctor/:id" element={<EditDoctor />} />

        {/* Appointments */}
        <Route path="/appointments" element={<Appointment />} />
        <Route path="/add-appointment" element={<AddAppointment />} />
        <Route path="/editAppointment/:id" element={<EditAppointment />} />

        {/* Departments */}
        <Route path="/department" element={<Department />} />
        <Route path="/add-departament" element={<AddDepartament />} />
        <Route path="/edit-departament/:id" element={<EditDepartament />} />
      </Routes>
    </BrowserRouter>
  );
}
