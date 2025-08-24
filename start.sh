#!/bin/bash

# Nis backend .NET duke specifikuar saktësisht projektin
cd Admin
dotnet run --project Admin.csproj --urls "http://localhost:5081" &

# Nis frontend
cd ..
npm run dev