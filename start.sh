#!/bin/bash

# Nis backend .NET në portën 5081 (HTTP)
cd Admin
dotnet run --urls "http://localhost:5081" &

# Kthehu në rrënjë dhe nis frontend React (Vite) në portën 3000
cd ..
npm run dev