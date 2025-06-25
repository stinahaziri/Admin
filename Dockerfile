# Faza e ndërtimit me .NET 9 SDK (preview)
FROM mcr.microsoft.com/dotnet/sdk:9.0-preview AS build
WORKDIR /src

# Kopjo fajllat e projektit dhe restore dependencies
COPY . .
RUN dotnet restore Admin.csproj

# Build dhe publish
RUN dotnet publish Admin.csproj -c Release -o /app/publish

# Faza e runtime-it (më i lehtë)
FROM mcr.microsoft.com/dotnet/aspnet:9.0-preview AS final
WORKDIR /app

# Kopjo output-in nga build
COPY --from=build /app/publish .

# Porti që Railway pret si default (mund të saktësosh me ENV nëse e ke të fiksuar)
EXPOSE 8080

# Start aplikacionin
ENTRYPOINT ["dotnet", "Admin.dll"]
